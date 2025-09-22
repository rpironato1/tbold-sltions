import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Form = any; // Using 'any' for flexibility with different form types

const FormDetails = ({ form }: { form: Form | null }) => {
  if (!form) {
    return <p>Selecione um formulário para ver os detalhes.</p>;
  }

  const getOriginLabel = (formType: string | null) => {
    const labels: Record<string, string> = {
      lead: 'Página Inicial (Lead)',
      contact: 'Página de Contato',
      briefing: 'Projeto On-Demand'
    };
    return labels[formType || ''] || 'Desconhecido';
  };

  const renderDetail = (label: string, value: any) => {
    if (!value) return null;
    return (
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-md text-gray-900 whitespace-pre-wrap">{value}</p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{form.name}</CardTitle>
            <p className="text-sm text-gray-600">{form.email}</p>
          </div>
          <Badge>{getOriginLabel(form.form_type)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderDetail('Telefone', form.phone)}
        {renderDetail('Empresa', form.company)}
        {renderDetail('Assunto', form.subject)}
        {renderDetail('Interesse', form.interest)}
        {renderDetail('Tipo de Projeto', form.project_type)}
        {renderDetail('Orçamento', form.budget)}
        {renderDetail('Prazo', form.timeline)}
        {renderDetail('Descrição', form.description)}
        {renderDetail('Mensagem', form.message)}
        {renderDetail('Funcionalidades Desejadas', form.features)}
        {renderDetail('Integrações Necessárias', form.integrations)}
        {renderDetail('Data de Envio', new Date(form.created_at).toLocaleString())}
      </CardContent>
    </Card>
  );
};

export default FormDetails;