import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from '@/components/icons';
import FormDetails from '@/components/FormDetails';
import type { Database } from '@/integrations/supabase/types';
import { useTranslation } from 'react-i18next';

type Form = Database['public']['Views']['all_forms']['Row'];

const fetchAllForms = async (): Promise<Form[]> => {
  const { data, error } = await supabase.from('all_forms').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

const DashboardForms = () => {
  const { t } = useTranslation();
  const { data: allForms = [], isLoading } = useQuery<Form[]>({ queryKey: ['all_forms'], queryFn: fetchAllForms });
  const [selectedItem, setSelectedItem] = useState<Form | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (item: Form) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const renderTable = (forms: Form[], type: string) => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>{type === 'briefing' ? 'Tipo de Projeto' : 'Assunto'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map(form => (
            <TableRow key={form.id} onClick={() => handleRowClick(form)} className="cursor-pointer hover:bg-gray-50">
              <TableCell>{form.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>{form.name}</TableCell>
              <TableCell>{form.email}</TableCell>
              <TableCell>{type === 'briefing' ? form.project_type : form.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderCards = (forms: Form[], type: string) => (
    <div className="md:hidden space-y-4">
      {forms.map(form => (
        <Card key={form.id} onClick={() => handleRowClick(form)}>
          <CardHeader>
            <CardTitle className="text-base">{form.name}</CardTitle>
            <p className="text-xs text-gray-500">{form.email}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm"><strong>{type === 'briefing' ? 'Projeto' : 'Assunto'}:</strong> {type === 'briefing' ? form.project_type : form.subject}</p>
            <p className="text-sm"><strong>Data:</strong> {form.created_at ? new Date(form.created_at).toLocaleDateString() : 'N/A'}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin" /> Carregando dados...</div>;
  }

  const contacts = allForms.filter(f => f.form_type === 'contact');
  const leads = allForms.filter(f => f.form_type === 'lead');
  const briefings = allForms.filter(f => f.form_type === 'briefing');

  return (
    <div>
      <h1 className="text-3xl font-bold text-turnbold-dark mb-8">Dados dos Formulários</h1>
      <Tabs defaultValue="contacts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Contatos ({contacts.length})</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="briefings">Briefings ({briefings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card>
            <CardHeader><CardTitle>Formulário de Contato</CardTitle></CardHeader>
            <CardContent>{renderTable(contacts, 'contact')}{renderCards(contacts, 'contact')}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader><CardTitle>Formulário de Leads (Página Inicial)</CardTitle></CardHeader>
            <CardContent>{renderTable(leads, 'lead')}{renderCards(leads, 'lead')}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="briefings">
          <Card>
            <CardHeader><CardTitle>Formulário de Briefing (On-Demand)</CardTitle></CardHeader>
            <CardContent>{renderTable(briefings, 'briefing')}{renderCards(briefings, 'briefing')}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('customerService.formDetails')}</DialogTitle>
            <DialogDescription>{t('customerService.formDetailsDescription')}</DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto">
            <FormDetails form={selectedItem} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardForms;