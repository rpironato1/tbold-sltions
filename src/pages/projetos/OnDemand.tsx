import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Shield, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Send,
  Lightbulb,
  Target,
  Rocket,
  Loader2,
  Truck,
  DollarSign,
  Star
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';
import { toast } from 'sonner';

const OnDemand = () => {
  const { t } = useTypedTranslation('projects');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    budget: '',
    timeline: '',
    description: '',
    features: '',
    integrations: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('briefings')
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error sending briefing:', error);
      toast.error(`Error sending briefing: ${error.message}`);
    } else {
      toast.success('Briefing sent successfully! Our team will contact you within 4 business hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        budget: '',
        timeline: '',
        description: '',
        features: '',
        integrations: ''
      });
    }
  };

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.0.title'),
      description: t('ondemand.features.0.description')
    },
    {
      icon: <DollarSign className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.1.title'),
      description: t('ondemand.features.1.description')
    },
    {
      icon: <Target className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.2.title'),
      description: t('ondemand.features.2.description')
    },
    {
      icon: <Code2 className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.3.title'),
      description: t('ondemand.features.3.description')
    },
    {
      icon: <Shield className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.4.title'),
      description: t('ondemand.features.4.description')
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-turnbold-green" />,
      title: t('ondemand.features.5.title'),
      description: t('ondemand.features.5.description')
    }
  ];

  const benefits = [
    { metric: t('ondemand.benefits.metrics.0.metric'), description: t('ondemand.benefits.metrics.0.description') },
    { metric: t('ondemand.benefits.metrics.1.metric'), description: t('ondemand.benefits.metrics.1.description') },
    { metric: t('ondemand.benefits.metrics.2.metric'), description: t('ondemand.benefits.metrics.2.description') },
    { metric: t('ondemand.benefits.metrics.3.metric'), description: t('ondemand.benefits.metrics.3.description') }
  ];

  const testimonials = [
    {
      name: t('ondemand.testimonials.items.0.name'),
      role: t('ondemand.testimonials.items.0.role'),
      comment: t('ondemand.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('ondemand.testimonials.items.1.name'),
      role: t('ondemand.testimonials.items.1.role'),
      comment: t('ondemand.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="projects"
        type="website"
        title={t('ondemand.title')}
        description={t('ondemand.subtitle')}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-turnbold-dark to-gray-900 text-white relative overflow-hidden pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-max relative z-10">
          <div className="flex items-center mb-6">
            <Link to="/projects" className="flex items-center text-turnbold-green hover:text-white transition-colors mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('navigation.backToProjects')}
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-turnbold-green text-white mb-4">{t('ondemand.badge')}</Badge>
            <h1 className="text-5xl font-bold mb-6 text-white">{t('ondemand.title')}</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('ondemand.subtitle')}
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-turnbold-green mr-2" />
                {t('common.setup24h')}
              </div>
              <div className="flex items-center">
                <Shield size={16} className="text-turnbold-green mr-2" />
                {t('common.secureData')}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="text-turnbold-green mr-2" />
                {t('common.dedicatedSupport')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('ondemand.hero.title')}</h2>
            <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
              {t('ondemand.hero.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-turnbold-border card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-turnbold-text">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Briefing Form Section */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max">
          <Card className="border-turnbold-border max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Solicite um Orçamento</CardTitle>
              <CardDescription>Preencha o briefing abaixo para iniciarmos a conversa sobre seu projeto.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nome Completo *" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required disabled={isSubmitting} />
                  <Input type="email" placeholder="E-mail *" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required disabled={isSubmitting} />
                  <Input type="tel" placeholder="Telefone *" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required disabled={isSubmitting} />
                  <Input placeholder="Empresa" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select onValueChange={(v) => handleInputChange('project_type', v)} disabled={isSubmitting}><SelectTrigger><SelectValue placeholder="Tipo de Projeto" /></SelectTrigger><SelectContent><SelectItem value="web">Site/App Web</SelectItem><SelectItem value="mobile">App Mobile</SelectItem><SelectItem value="ia">Solução com IA</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent></Select>
                  <Select onValueChange={(v) => handleInputChange('budget', v)} disabled={isSubmitting}><SelectTrigger><SelectValue placeholder="Orçamento Estimado" /></SelectTrigger><SelectContent><SelectItem value="<5k">Abaixo de R$5.000</SelectItem><SelectItem value="5k-15k">R$5.000 - R$15.000</SelectItem><SelectItem value="15k-30k">R$15.000 - R$30.000</SelectItem><SelectItem value=">30k">Acima de R$30.000</SelectItem></SelectContent></Select>
                  <Select onValueChange={(v) => handleInputChange('timeline', v)} disabled={isSubmitting}><SelectTrigger><SelectValue placeholder="Prazo Desejado" /></SelectTrigger><SelectContent><SelectItem value="1-3m">1-3 meses</SelectItem><SelectItem value="3-6m">3-6 meses</SelectItem><SelectItem value="6m+">Mais de 6 meses</SelectItem></SelectContent></Select>
                </div>
                <Textarea placeholder="Descrição detalhada do projeto *" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} required disabled={isSubmitting} rows={5} />
                <Textarea placeholder="Principais funcionalidades desejadas" value={formData.features} onChange={(e) => handleInputChange('features', e.target.value)} disabled={isSubmitting} />
                <Textarea placeholder="Sistemas ou APIs para integração" value={formData.integrations} onChange={(e) => handleInputChange('integrations', e.target.value)} disabled={isSubmitting} />
                <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Enviar Briefing</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OnDemand;