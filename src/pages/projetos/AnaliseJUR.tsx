
import { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Play,
  ArrowLeft,
  Shield,
  Clock
} from '@/components/icons';

import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

// Lazy load project sections
const AnaliseJURFeatures = lazy(() => import('@/components/project-sections/AnaliseJURFeatures'));
const AnaliseJURBenefits = lazy(() => import('@/components/project-sections/AnaliseJURBenefits'));
const AnaliseJURTestimonials = lazy(() => import('@/components/project-sections/AnaliseJURTestimonials'));
const AnaliseJURFAQ = lazy(() => import('@/components/project-sections/AnaliseJURFAQ'));

const AnaliseJUR = () => {
  const [activeTab, setActiveTab] = useState('funcionalidades');
  const { t } = useTypedTranslation('projects');

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="projects"
        type="website"
        title={t('analisejur.title')}
        description={t('analisejur.subtitle')}
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
              <Badge className="bg-turnbold-green text-white mb-4">{t('analisejur.badge')}</Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">{t('analisejur.title')}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('analisejur.subtitle')}
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
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop"
                alt="AnaliseJUR Interface"
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
              { id: 'depoimentos', label: t('tabs.testimonials') },
              { id: 'faq', label: t('tabs.faq') }
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
        <Suspense fallback={<LoadingSpinner message="Carregando funcionalidades..." fullScreen={false} />}>
          <AnaliseJURFeatures />
        </Suspense>
      )}

      {activeTab === 'beneficios' && (
        <Suspense fallback={<LoadingSpinner message="Carregando benefícios..." fullScreen={false} />}>
          <AnaliseJURBenefits />
        </Suspense>
      )}

      {activeTab === 'depoimentos' && (
        <Suspense fallback={<LoadingSpinner message="Carregando depoimentos..." fullScreen={false} />}>
          <AnaliseJURTestimonials />
        </Suspense>
      )}

      {activeTab === 'faq' && (
        <Suspense fallback={<LoadingSpinner message="Carregando FAQ..." fullScreen={false} />}>
          <AnaliseJURFAQ />
        </Suspense>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">{t('analisejur.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('analisejur.cta.description')}
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

export default AnaliseJUR;
