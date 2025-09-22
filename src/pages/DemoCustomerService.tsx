import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, Mail, Eye, Archive, MessageSquare, Home, FileText, Users, LogOut } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

// Type definitions
type ContactRow = Database['public']['Tables']['contacts']['Row'];
type LeadRow = Database['public']['Tables']['leads']['Row'];
type BriefingRow = Database['public']['Tables']['briefings']['Row'];

type FormStatus = 'new' | 'read' | 'responded' | 'archived';

// Discriminated union for forms
type ContactForm = ContactRow & { form_type: 'contact'; status: FormStatus; };
type LeadForm = LeadRow & { form_type: 'lead'; status: FormStatus; };
type BriefingForm = BriefingRow & { form_type: 'briefing'; status: FormStatus; };

type Form = ContactForm | LeadForm | BriefingForm;

const fetchForms = async () => {
  const { data: contacts, error: contactsError } = await supabase.from('contacts').select('*');
  if (contactsError) throw contactsError;

  const { data: leads, error: leadsError } = await supabase.from('leads').select('*');
  if (leadsError) throw leadsError;

  const { data: briefings, error: briefingsError } = await supabase.from('briefings').select('*');
  if (briefingsError) throw briefingsError;

  const allForms: Form[] = [
    ...contacts.map(c => ({ ...c, form_type: 'contact' as const, status: 'new' as const })),
    ...leads.map(l => ({ ...l, form_type: 'lead' as const, status: 'new' as const })),
    ...briefings.map(b => ({ ...b, form_type: 'briefing' as const, status: 'new' as const })),
  ];

  return allForms.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

const DemoCustomerService = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: forms = [], isLoading } = useQuery<Form[]>({ queryKey: ['forms'], queryFn: fetchForms });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const channel = supabase
      .channel('public:contacts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        queryClient.invalidateQueries({ queryKey: ['forms'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        queryClient.invalidateQueries({ queryKey: ['forms'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'briefings' }, () => {
        queryClient.invalidateQueries({ queryKey: ['forms'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const filteredForms = forms.filter(form => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      form.name.toLowerCase().includes(searchLower) ||
      form.email.toLowerCase().includes(searchLower) ||
      ('company' in form && form.company && form.company.toLowerCase().includes(searchLower));
    
    const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
    const matchesOrigin = originFilter === 'all' || form.form_type === originFilter;
    
    return matchesSearch && matchesStatus && matchesOrigin;
  });

  const stats = {
    total: forms.length,
    new: forms.filter(f => f.status === 'new').length,
    read: forms.filter(f => f.status === 'read').length,
    responded: forms.filter(f => f.status === 'responded').length,
    archived: forms.filter(f => f.status === 'archived').length,
  };

  const getStatusBadge = (status: string = 'new') => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'destructive',
      read: 'secondary',
      responded: 'default',
      archived: 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{t(`common.${status}`)}</Badge>;
  };

  const getOriginLabel = (formType: string) => t(`customerService.formOrigins.${formType}`, formType);

  const handleFormClick = (form: Form) => {
    setSelectedForm(form);
    setIsDetailsOpen(true);
  };

  const handleReplyClick = (form: Form) => {
    setSelectedForm(form);
    const subject = 'subject' in form ? form.subject : t('customerService.respondToForm');
    setReplySubject(`Re: ${subject}`);
    setReplyMessage(`${t('customerService.emailTemplate.greeting', { name: form.name })}\n\n${t('customerService.emailTemplate.thankYou')}\n\n\n\n${t('customerService.emailTemplate.signature')}`);
    setIsReplyOpen(true);
  };

  const handleSendReply = () => {
    if (!selectedForm) return;
    toast.success(t('customerService.responseEmailSent'));
    setIsReplyOpen(false);
  };

  const renderFormDetails = () => {
    if (!selectedForm) return null;
    return <div>{JSON.stringify(selectedForm, null, 2)}</div>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Demo Sidebar */}
      <aside className="w-64 bg-turnbold-dark text-white flex flex-col p-4">
        <div className="flex items-center justify-center py-4 mb-8">
          <img 
            src="/logo-turnbold.png" 
            alt="TurnBold"
            className="h-12 w-auto"
          />
        </div>
        <nav className="flex-grow">
          <ul>
            <li>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <Home className="w-5 h-5" />
                <span className="font-medium">{t('navigation.home')}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-turnbold-green text-white transition-colors duration-200">
                <Users className="w-5 h-5" />
                <span className="font-medium">{t('navigation.customerService')}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{t('navigation.forms')}</span>
              </div>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start space-x-3 hover:bg-red-700">
            <LogOut className="w-5 h-5" />
            <span>{t('navigation.signOut')}</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-turnbold-dark">{t('customerService.title')}</h1>
            <p className="text-gray-600 mt-2">{t('customerService.subtitle')}</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card><CardContent className="p-4"><div className="text-2xl font-bold">{stats.total}</div><p className="text-sm text-gray-600">{t('customerService.allForms')}</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold text-red-600">{stats.new}</div><p className="text-sm text-gray-600">{t('common.new')}</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold text-blue-600">{stats.read}</div><p className="text-sm text-gray-600">{t('common.read')}</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold text-green-600">{stats.responded}</div><p className="text-sm text-gray-600">{t('common.responded')}</p></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-2xl font-bold text-gray-600">{stats.archived}</div><p className="text-sm text-gray-600">{t('common.archived')}</p></CardContent></Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                {t('common.filter')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t('customerService.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={originFilter} onValueChange={setOriginFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t('customerService.filterByOrigin')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all')}</SelectItem>
                    <SelectItem value="lead">{t('customerService.formOrigins.lead')}</SelectItem>
                    <SelectItem value="contact">{t('customerService.formOrigins.contact')}</SelectItem>
                    <SelectItem value="briefing">{t('customerService.formOrigins.briefing')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t('customerService.filterByStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all')}</SelectItem>
                    <SelectItem value="new">{t('common.new')}</SelectItem>
                    <SelectItem value="read">{t('common.read')}</SelectItem>
                    <SelectItem value="responded">{t('common.responded')}</SelectItem>
                    <SelectItem value="archived">{t('common.archived')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Forms Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t('customerService.allForms')} ({filteredForms.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? <p>Loading...</p> : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.origin')}</TableHead>
                        <TableHead>{t('common.name')}</TableHead>
                        <TableHead>{t('common.email')}</TableHead>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead className="text-right">{t('common.actions', 'Actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredForms.map((form) => (
                        <TableRow key={form.id} className="cursor-pointer hover:bg-gray-50">
                          <TableCell>{getStatusBadge(form.status)}</TableCell>
                          <TableCell>{getOriginLabel(form.form_type)}</TableCell>
                          <TableCell 
                            className="font-medium"
                            onClick={() => handleFormClick(form)}
                          >
                            {form.name}
                          </TableCell>
                          <TableCell onClick={() => handleFormClick(form)}>
                            {form.email}
                          </TableCell>
                          <TableCell onClick={() => handleFormClick(form)}>
                            {new Date(form.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFormClick(form);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReplyClick(form);
                                }}
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                              >
                                <Archive className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Details Modal */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t('customerService.formDetails')}
                </DialogTitle>
              </DialogHeader>
              {renderFormDetails()}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => selectedForm && handleReplyClick(selectedForm)}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {t('common.reply')}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  {t('common.archive', 'Archive')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Reply Modal */}
          <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {t('customerService.respondToForm')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('customerService.emailSubject')}
                  </label>
                  <Input
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    placeholder={t('customerService.emailSubject')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('customerService.emailMessage')}
                  </label>
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={t('customerService.emailMessage')}
                    rows={8}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSendReply} className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('customerService.sendReply')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsReplyOpen(false)}
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default DemoCustomerService;