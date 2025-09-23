import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, Mail, Eye, Archive, MessageSquare, Home, FileText, Users, LogOut, PanelLeft, X } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';
import FormDetails from '@/components/FormDetails';
import { cn } from '@/lib/utils';
import logo from '@/assets/images/logo-turnbold.png';

type FormStatus = 'new' | 'read' | 'responded' | 'archived';
type Form = Database['public']['Views']['all_forms']['Row'] & { status: FormStatus };

const fetchForms = async (): Promise<Form[]> => {
  const { data, error } = await supabase.from('all_forms').select('*');
  if (error) throw error;
  // Simulating more varied data for demo purposes
  const demoData = (data as Form[]).map((item, index) => ({
    ...item,
    status: (['new', 'read', 'responded', 'archived'][index % 4]) as FormStatus,
  }));
  return demoData.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
};

const DemoSidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) => {
  const { t } = useTranslation();
  const menuItems = [
    { name: t('navigation.home'), icon: <Home className="w-5 h-5" /> },
    { name: t('navigation.customerService'), icon: <Users className="w-5 h-5" /> },
    { name: t('navigation.forms'), icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <>
      <div className={cn('fixed inset-0 bg-black/60 z-30 md:hidden', isOpen ? 'block' : 'hidden')} onClick={() => setIsOpen(false)} />
      <aside className={cn('fixed top-0 left-0 h-full w-64 bg-turnbold-dark text-white flex flex-col p-4 z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center justify-between py-4 mb-8">
          <img src={logo} alt="TurnBold" className="h-12 w-auto" />
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></Button>
        </div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item, index) => (
              <li key={item.name}>
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${index === 1 ? 'bg-turnbold-green text-white' : 'hover:bg-gray-700'}`}>
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto"><Button variant="ghost" className="w-full justify-start space-x-3 hover:bg-red-700"><LogOut className="w-5 h-5" /><span>{t('navigation.signOut')}</span></Button></div>
      </aside>
    </>
  );
};

const DemoCustomerService = () => {
  const { t } = useTranslation();
  const { data: forms = [], isLoading } = useQuery<Form[]>({ queryKey: ['demo_forms'], queryFn: fetchForms });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const filteredForms = forms.filter(form => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      (form.name && form.name.toLowerCase().includes(searchLower)) ||
      (form.email && form.email.toLowerCase().includes(searchLower)) ||
      (form.company && form.company.toLowerCase().includes(searchLower));
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

  const getStatusBadge = (status: string | null) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'destructive', read: 'secondary', responded: 'default', archived: 'outline'
    };
    return <Badge variant={variants[status || 'new'] || 'default'}>{t(`common.${status || 'new'}`)}</Badge>;
  };

  const getOriginLabel = (formType: string | null) => t(`customerService.formOrigins.${formType || 'unknown'}`, formType || 'Unknown');

  const handleFormClick = (form: Form) => {
    setSelectedForm(form);
    setIsDetailsOpen(true);
    toast.info("Ação de demonstração", { description: "Em um ambiente real, o status mudaria para 'Lido'." });
  };

  const handleReplyClick = (form: Form) => {
    setSelectedForm(form);
    const subject = form.subject || t('customerService.respondToForm');
    setReplySubject(`Re: ${subject}`);
    setReplyMessage(`${t('customerService.emailTemplate.greeting', { name: form.name })}\n\n${t('customerService.emailTemplate.thankYou')}\n\n\n\n${t('customerService.emailTemplate.signature')}`);
    setIsReplyOpen(true);
  };

  const handleSendReply = () => {
    toast.success(t('customerService.responseEmailSent'));
    setIsReplyOpen(false);
  };

  const handleArchive = () => {
    toast.info("Ação de demonstração", { description: "Em um ambiente real, o formulário seria arquivado." });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <DemoSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}><PanelLeft className="h-6 w-6" /></Button>
          <img src={logo} alt="TurnBold" className="h-8 w-auto" />
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-turnbold-dark">{t('customerService.title')} (Demo)</h1>
              <p className="text-gray-600 mt-2">{t('customerService.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card><CardContent className="p-4"><div className="text-2xl font-bold">{stats.total}</div><p className="text-sm text-gray-600">{t('customerService.allForms')}</p></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-2xl font-bold text-red-600">{stats.new}</div><p className="text-sm text-gray-600">{t('common.new')}</p></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-2xl font-bold text-blue-600">{stats.read}</div><p className="text-sm text-gray-600">{t('common.read')}</p></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-2xl font-bold text-green-600">{stats.responded}</div><p className="text-sm text-gray-600">{t('common.responded')}</p></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-2xl font-bold text-gray-600">{stats.archived}</div><p className="text-sm text-gray-600">{t('common.archived')}</p></CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Filter className="w-5 h-5" />{t('common.filter')}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input placeholder={t('customerService.searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" /></div>
                  <Select value={originFilter} onValueChange={setOriginFilter}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder={t('customerService.filterByOrigin')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('common.all')}</SelectItem><SelectItem value="lead">{getOriginLabel('lead')}</SelectItem><SelectItem value="contact">{getOriginLabel('contact')}</SelectItem><SelectItem value="briefing">{getOriginLabel('briefing')}</SelectItem></SelectContent></Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder={t('customerService.filterByStatus')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('common.all')}</SelectItem><SelectItem value="new">{t('common.new')}</SelectItem><SelectItem value="read">{t('common.read')}</SelectItem><SelectItem value="responded">{t('common.responded')}</SelectItem><SelectItem value="archived">{t('common.archived')}</SelectItem></SelectContent></Select>
                </div>
              </CardContent>
            </Card>
            <div className="hidden md:block">
              <Card>
                <CardHeader><CardTitle>{t('customerService.allForms')} ({filteredForms.length})</CardTitle></CardHeader>
                <CardContent>
                  {isLoading ? <p>Loading...</p> : (
                    <Table>
                      <TableHeader><TableRow><TableHead>{t('common.status')}</TableHead><TableHead>{t('common.origin')}</TableHead><TableHead>{t('common.name')}</TableHead><TableHead>{t('common.email')}</TableHead><TableHead>{t('common.date')}</TableHead><TableHead className="text-right">{t('common.actions', 'Actions')}</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {filteredForms.map((form) => (
                          <TableRow key={form.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleFormClick(form)}>
                            <TableCell>{getStatusBadge(form.status)}</TableCell>
                            <TableCell>{getOriginLabel(form.form_type)}</TableCell>
                            <TableCell className="font-medium">{form.name}</TableCell>
                            <TableCell>{form.email}</TableCell>
                            <TableCell>{form.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                            <TableCell className="text-right"><div className="flex gap-2 justify-end"><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleFormClick(form); }}><Eye className="w-4 h-4" /></Button><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleReplyClick(form); }}><Mail className="w-4 h-4" /></Button><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleArchive(); }}><Archive className="w-4 h-4" /></Button></div></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="md:hidden space-y-4">
              {filteredForms.map((form) => (
                <Card key={form.id} onClick={() => handleFormClick(form)}>
                  <CardHeader><div className="flex justify-between items-start"><div><CardTitle className="text-base">{form.name}</CardTitle><p className="text-xs text-gray-500">{form.email}</p></div>{getStatusBadge(form.status)}</div></CardHeader>
                  <CardContent><p className="text-sm"><strong>{t('common.origin')}:</strong> {getOriginLabel(form.form_type)}</p><p className="text-sm"><strong>{t('common.date')}:</strong> {form.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}</p></CardContent>
                  <CardFooter className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleReplyClick(form); }}><Mail className="w-4 h-4 mr-2" />{t('common.reply')}</Button><Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleArchive(); }}><Archive className="w-4 h-4" /></Button></CardFooter>
                </Card>
              ))}
            </div>
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>{t('customerService.formDetails')}</DialogTitle></DialogHeader><FormDetails form={selectedForm} /></DialogContent></Dialog>
            <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>{t('customerService.respondToForm')}</DialogTitle></DialogHeader><div className="space-y-4"><div><label>{t('customerService.emailSubject')}</label><Input value={replySubject} onChange={(e) => setReplySubject(e.target.value)} /></div><div><label>{t('customerService.emailMessage')}</label><Textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} rows={8} /></div><div className="flex gap-2"><Button onClick={handleSendReply}>{t('customerService.sendReply')}</Button><Button variant="outline" onClick={() => setIsReplyOpen(false)}>{t('common.cancel')}</Button></div></div></DialogContent></Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DemoCustomerService;