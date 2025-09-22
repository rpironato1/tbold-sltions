import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Image, 
  Gift, 
  Shield, 
  Bell, 
  DollarSign,
  Play,
  ArrowLeft,
  Star,
  CheckCircle,
  Clock,
  Heart
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const LovelyNails = () => {
  const [activeTab, setActiveTab] = useState('funcionalidades');
  const { t } = useTypedTranslation('projects');

  const features = [
    {
      icon: <Image className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.0.title'),
      description: t('lovelynails.features.0.description')
    },
    {
      icon: <Calendar className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.1.title'),
      description: t('lovelynails.features.1.description')
    },
    {
      icon: <Gift className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.2.title'),
      description: t('lovelynails.features.2.description')
    },
    {
      icon: <Shield className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.3.title'),
      description: t('lovelynails.features.3.description')
    },
    {
      icon: <DollarSign className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.4.title'),
      description: t('lovelynails.features.4.description')
    },
    {
      icon: <Bell className="w-6 h-6 text-turnbold-green" />,
      title: t('lovelynails.features.5.title'),
      description: t('lovelynails.features.5.description')
    }
  ];

  const benefits = [
    { metric: t('lovelynails.benefits.metrics.0.metric'), description: t('lovelynails.benefits.metrics.0.description') },
    { metric: t('lovelynails.benefits.metrics.1.metric'), description: t('lovelynails.benefits.metrics.1.description') },
    { metric: t('lovelynails.benefits.metrics.2.metric'), description: t('lovelynails.benefits.metrics.2.description') },
    { metric: t('lovelynails.benefits.metrics.3.metric'), description: t('lovelynails.benefits.metrics.3.description') }
  ];

  const testimonials = [
    {
      name: t('lovelynails.testimonials.items.0.name'),
      role: t('lovelynails.testimonials.items.0.role'),
      comment: t('lovelynails.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('lovelynails.testimonials.items.1.name'),
      role: t('lovelynails.testimonials.items.1.role'),
      comment: t('lovelynails.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="projects"
        type="website"
        title={t('lovelynails.title')}
        description={t('lovelynails.subtitle')}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-turnbold-green text-white mb-4">{t('lovelynails.badge')}</Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">{t('lovelynails.title')}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('lovelynails.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="btn-primary text-lg px-8 py-4">
                  <Play size={20} className="mr-2" />
                  {t('common.viewDemo')}
                </Button>
                <Button className="btn-secondary border-white text-white hover:bg-white hover:text-turnbold-dark text-lg px-8 py-4">
                  {t('common.requestTrial')}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-turnbold-green mr-2" />
                  {t('common.setup24h')}
                </div>
                <div className="flex items-center">
                  <Heart size={16} className="text-turnbold-green mr-2" />
                  {t('common.dedicatedSupport')}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-turnbold-green mr-2" />
                  {t('common.support247')}
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop"
                alt="LovelyNails Interface"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-turnbold-bg border-b border-turnbold-border">
        <div className="container-max">
          <div className="flex overflow-x-auto">
            {[
              { id: 'funcionalidades', label: t('tabs.features') },
              { id: 'beneficios', label: t('tabs.benefits') },
              { id: 'depoimentos', label: t('tabs.testimonials') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-turnbold-green text-turnbold-green'
                    : 'border-transparent text-turnbold-text hover:text-turnbold-green'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {activeTab === 'funcionalidades' && (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('lovelynails.hero.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('lovelynails.hero.description')}
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
      )}

      {activeTab === 'beneficios' && (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('lovelynails.benefits.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('lovelynails.benefits.description')}
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
      )}

      {activeTab === 'depoimentos' && (
        <section className="section-padding">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('lovelynails.testimonials.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('lovelynails.testimonials.description')}
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
      )}

      {/* CTA Section */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">{t('lovelynails.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('lovelynails.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary text-lg px-8 py-4">
              {t('common.startFreeTrial')}
            </Button>
            <Button className="btn-secondary border-white text-white hover:bg-white hover:text-turnbold-dark text-lg px-8 py-4">
              {t('common.scheduleDemo')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LovelyNails;