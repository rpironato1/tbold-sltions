import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Mail, Eye, Archive, MessageSquare } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  getFilteredForms, 
  getCustomerServiceStats, 
  updateFormStatus, 
  addFormResponse,
  FormData 
} from '@/lib/formStorage';

const DashboardCustomerService = () => {
  const { t } = useTranslation();
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    new: number;
    read: number;
    responded: number;
    archived: number;
    byOrigin: Record<string, number>;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const loadData = useCallback(() => {
    const filteredForms = getFilteredForms(searchTerm, statusFilter, originFilter);
    const statistics = getCustomerServiceStats();
    setForms(filteredForms);
    setStats(statistics);
  }, [searchTerm, statusFilter, originFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const getStatusBadge = (status: string = 'new') => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'destructive',
      read: 'secondary',
      responded: 'default',
      archived: 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'default'}>
        {t(`common.${status}`)}
      </Badge>
    );
  };

  const getOriginLabel = (formType: string) => {
    return t(`customerService.formOrigins.${formType}`, formType);
  };

  const handleStatusUpdate = (formId: string, newStatus: 'read' | 'responded' | 'archived') => {
    updateFormStatus(formId, newStatus);
    loadData();
    toast.success(t('customerService.statusUpdated'));
  };

  const handleFormClick = (form: FormData) => {
    setSelectedForm(form);
    setIsDetailsOpen(true);
    
    // Mark as read if it's new
    if (form.status === 'new') {
      handleStatusUpdate(form.id, 'read');
    }
  };

  const handleReplyClick = (form: FormData) => {
    setSelectedForm(form);
    setReplySubject(`Re: ${form.subject || t('customerService.respondToForm')}`);
    setReplyMessage(t('customerService.emailTemplate.greeting', { name: form.name }) + '\n\n' +
                   t('customerService.emailTemplate.thankYou') + '\n\n\n\n' +
                   t('customerService.emailTemplate.signature'));
    setIsReplyOpen(true);
  };

  const handleSendReply = () => {
    if (!selectedForm || !replySubject.trim() || !replyMessage.trim()) {
      toast.error(t('common.error'));
      return;
    }

    addFormResponse(selectedForm.id, replySubject, replyMessage, selectedForm.email as string);
    setIsReplyOpen(false);
    setReplySubject('');
    setReplyMessage('');
    loadData();
    toast.success(t('customerService.responseEmailSent'));
  };

  const renderFormDetails = () => {
    if (!selectedForm) return null;

    const excludeFields = ['id', 'formType', 'timestamp', 'submittedToSupabase', 'status', 'responses'];
    
    return (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b">
          <div>
            <p className="text-sm font-semibold text-gray-600">{t('common.origin')}</p>
            <p className="text-md">{getOriginLabel(selectedForm.formType)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">{t('common.date')}</p>
            <p className="text-md">{new Date(selectedForm.timestamp).toLocaleString()}</p>
          </div>
        </div>

        {Object.entries(selectedForm)
          .filter(([key]) => !excludeFields.includes(key))
          .map(([key, value]) => (
            <div key={key} className="py-2 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                {t(`common.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
              </p>
              <p className="text-md text-gray-900 whitespace-pre-wrap">
                {typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? String(value) : t('common.notProvided', 'Not provided')}
              </p>
            </div>
          ))}

        {selectedForm.responses && selectedForm.responses.length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">{t('customerService.responseHistory', 'Response History')}</h4>
            {selectedForm.responses.map((response) => (
              <div key={response.id} className="bg-gray-50 p-3 rounded-lg mb-2">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm">{response.subject}</p>
                  <p className="text-xs text-gray-500">{new Date(response.timestamp).toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{response.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-turnbold-dark">{t('customerService.title')}</h1>
        <p className="text-gray-600 mt-2">{t('customerService.subtitle')}</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-turnbold-dark">{stats.total}</div>
              <p className="text-sm text-gray-600">{t('customerService.allForms')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.new}</div>
              <p className="text-sm text-gray-600">{t('common.new')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.read}</div>
              <p className="text-sm text-gray-600">{t('common.read')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
              <p className="text-sm text-gray-600">{t('common.responded')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
              <p className="text-sm text-gray-600">{t('common.archived')}</p>
            </CardContent>
          </Card>
        </div>
      )}

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
          <CardTitle>{t('customerService.allForms')} ({forms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {forms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {t('customerService.noFormsFound')}
            </div>
          ) : (
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
                  {forms.map((form) => (
                    <TableRow key={form.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell>{getOriginLabel(form.formType)}</TableCell>
                      <TableCell 
                        className="font-medium"
                        onClick={() => handleFormClick(form)}
                      >
                        {form.name as string}
                      </TableCell>
                      <TableCell onClick={() => handleFormClick(form)}>
                        {form.email as string}
                      </TableCell>
                      <TableCell onClick={() => handleFormClick(form)}>
                        {new Date(form.timestamp).toLocaleDateString()}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(form.id, 'archived');
                            }}
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
              onClick={() => selectedForm && handleStatusUpdate(selectedForm.id, 'archived')}
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
  );
};

export default DashboardCustomerService;