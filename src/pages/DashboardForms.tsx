import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2 } from '@/components/icons';

// Tipos expandidos para incluir todos os campos
type Contact = { id: string; created_at: string; name: string; email: string; phone: string; company: string | null; subject: string; message: string; interest: string | null; };
type Lead = { id: string; created_at: string; name: string; email: string; phone: string; message: string | null; };
type Briefing = { id: string; created_at: string; name: string; email: string; phone: string; company: string | null; project_type: string | null; budget: string | null; timeline: string | null; description: string; features: string | null; integrations: string | null; };

// Tipo genérico para o modal
type FormData = Contact | Lead | Briefing;

const DashboardForms = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      // Buscando todos os campos com select('*')
      const { data: contactsData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      const { data: briefingsData } = await supabase.from('briefings').select('*').order('created_at', { ascending: false });

      setContacts(contactsData || []);
      setLeads(leadsData || []);
      setBriefings(briefingsData || []);
      setLoading(false);
    };

    fetchForms();
  }, []);

  const handleRowClick = (item: FormData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const renderDetail = (key: string, value: string | number | boolean | null | undefined) => {
    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div key={key} className="py-2 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-600">{formattedKey}</p>
        <p className="text-md text-gray-900 whitespace-pre-wrap">{value || 'Não preenchido'}</p>
      </div>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin" /> Carregando dados...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-turnbold-dark mb-8">Dados dos Formulários</h1>
      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
          <TabsTrigger value="briefings">Briefings ({briefings.length})</TabsTrigger>
        </TabsList>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader><CardTitle>Contact Form</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assunto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map(c => (
                    <TableRow key={c.id} onClick={() => handleRowClick(c)} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.subject}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Leads */}
        <TabsContent value="leads">
          <Card>
            <CardHeader><CardTitle>Formulário de Leads (Página Inicial)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map(l => (
                    <TableRow key={l.id} onClick={() => handleRowClick(l)} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>{new Date(l.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{l.name}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>{l.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Briefings */}
        <TabsContent value="briefings">
          <Card>
            <CardHeader><CardTitle>Formulário de Briefing (On-Demand)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo de Projeto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {briefings.map(b => (
                    <TableRow key={b.id} onClick={() => handleRowClick(b)} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>{new Date(b.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{b.name}</TableCell>
                      <TableCell>{b.project_type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalhes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Formulário</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto">
            {selectedItem && Object.entries(selectedItem).map(([key, value]) => renderDetail(key, value))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardForms;
