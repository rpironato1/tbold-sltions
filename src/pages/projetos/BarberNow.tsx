import { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  Play,
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  QrCode,
  Users,
  Package,
  MessageSquare,
  BarChart3,
  Star
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

// Lazy load project sections
const BarberNowFeatures = lazy(() => import('@/components/project-sections/BarberNowFeatures'));
const BarberNowBenefits = lazy(() => import('@/components/project-sections/BarberNowBenefits'));
const BarberNowTestimonials = lazy(() => import('@/components/project-sections/BarberNowTestimonials'));
const BarberNowFAQ = lazy(() => import('@/components/project-sections/BarberNowFAQ'));

const BarberNow = () => {
  const [activeTab, setActiveTab] = useState('funcionalidades');
  const { t } = useTypedTranslation('projects');

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.0.title'),
      description: t('barbernow.features.0.description')
    },
    {
      icon: <QrCode className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.1.title'),
      description: t('barbernow.features.1.description')
    },
    {
      icon: <Users className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.2.title'),
      description: t('barbernow.features.2.description')
    },
    {
      icon: <Package className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.3.title'),
      description: t('barbernow.features.3.description')
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.4.title'),
      description: t('barbernow.features.4.description')
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-turnbold-green" />,
      title: t('barbernow.features.5.title'),
      description: t('barbernow.features.5.description')
    }
  ];

  const benefits = [
    { metric: t('barbernow.benefits.metrics.0.metric'), description: t('barbernow.benefits.metrics.0.description') },
    { metric: t('barbernow.benefits.metrics.1.metric'), description: t('barbernow.benefits.metrics.1.description') },
    { metric: t('barbernow.benefits.metrics.2.metric'), description: t('barbernow.benefits.metrics.2.description') },
    { metric: t('barbernow.benefits.metrics.3.metric'), description: t('barbernow.benefits.metrics.3.description') }
  ];

  const testimonials = [
    {
      name: t('barbernow.testimonials.items.0.name'),
      role: t('barbernow.testimonials.items.0.role'),
      comment: t('barbernow.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('barbernow.testimonials.items.1.name'),
      role: t('barbernow.testimonials.items.1.role'),
      comment: t('barbernow.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="projects"
        type="website"
        title={t('barbernow.title')}
        description={t('barbernow.subtitle')}
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
              <Badge className="bg-turnbold-green text-white mb-4">{t('barbernow.badge')}</Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">{t('barbernow.title')}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('barbernow.subtitle')}
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
                  {t('common.freeTrial')}
                </div>
                <div className="flex items-center">
                  <Shield size={16} className="text-turnbold-green mr-2" />
                  {t('common.gdprCompliant')}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-turnbold-green mr-2" />
                  {t('common.support247')}
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop"
                alt="BarberNow Interface"
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
              <h2 className="text-4xl font-bold mb-4">{t('barbernow.hero.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('barbernow.hero.description')}
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
              <h2 className="text-4xl font-bold mb-4">{t('barbernow.benefits.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('barbernow.benefits.description')}
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
              <h2 className="text-4xl font-bold mb-4">{t('barbernow.testimonials.title')}</h2>
              <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
                {t('barbernow.testimonials.description')}
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
          <h2 className="text-4xl font-bold mb-6 text-white">{t('barbernow.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('barbernow.cta.description')}
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

export default BarberNow;