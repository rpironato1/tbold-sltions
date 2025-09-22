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
import { storeFormData, markFormAsSubmitted, validateFormData, convertToSupabaseFormat } from '@/lib/formStorage';

const OnDemand = () => {
  const { t } = useTypedTranslation('projects');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
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

    // Validate form data
    const briefingData = {
      formType: 'briefing' as const,
      ...formData
    };

    if (!validateFormData(briefingData)) {
      alert('Please fill in all required fields correctly.');
      setIsSubmitting(false);
      return;
    }

    // Store in localStorage first
    let formId: string;
    try {
      formId = storeFormData(briefingData);
      console.log('Briefing data stored in localStorage with ID:', formId);
    } catch (error) {
      console.error('Error storing briefing data locally:', error);
      alert(`Error saving form data locally: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
      return;
    }

    // Convert to Supabase format and submit
    const supabaseData = convertToSupabaseFormat(briefingData);
    const { error } = await supabase
      .from('briefings')
      .insert([supabaseData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error sending briefing:', error);
      alert(`Error sending briefing: ${error.message}\n\nYour data has been saved locally and will be synchronized when the connection is restored.`);
    } else {
      // Mark as submitted in localStorage
      markFormAsSubmitted(formId);
      alert('Briefing sent successfully! Our team will contact you within 4 business hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
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

      {/* Benefits Section */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('ondemand.benefits.title')}</h2>
            <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
              {t('ondemand.benefits.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-turnbold-border">
                <CardContent className="pt-8">
                  <div className="text-4xl font-bold text-turnbold-green mb-2">
                    {benefit.metric}
                  </div>
                  <p className="text-turnbold-text font-medium">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('ondemand.testimonials.title')}</h2>
            <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
              {t('ondemand.testimonials.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-turnbold-border">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-turnbold-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-turnbold-text mb-6 italic text-lg">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-turnbold-dark text-lg">{testimonial.name}</p>
                      <p className="text-turnbold-text">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">{t('ondemand.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('ondemand.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary text-lg px-8 py-4">
              {t('common.startFreeTrial')}
            </Button>
            <Button className="btn-secondary border-white text-white hover:bg-white hover:text-turnbold-dark text-lg px-8 py-4">
              {t('common.talkToSpecialist')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OnDemand;