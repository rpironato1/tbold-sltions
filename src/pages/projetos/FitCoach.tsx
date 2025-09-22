import { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

// Lazy load project sections
const FitCoachFeatures = lazy(() => import('@/components/project-sections/FitCoachFeatures'));
const FitCoachArchitecture = lazy(() => import('@/components/project-sections/FitCoachArchitecture'));
const FitCoachBenefits = lazy(() => import('@/components/project-sections/FitCoachBenefits'));
const FitCoachTestimonials = lazy(() => import('@/components/project-sections/FitCoachTestimonials'));

const FitCoach = () => {
  const [activeTab, setActiveTab] = useState('funcionalidades');
  const { t } = useTypedTranslation('projects');

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="projects"
        type="website"
        title={t('fitcoach.title')}
        description={t('fitcoach.subtitle')}
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
              <Badge className="bg-turnbold-green text-white mb-4">{t('fitcoach.badge')}</Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">{t('fitcoach.title')}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('fitcoach.subtitle')}
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
                  <Shield size={16} className="text-turnbold-green mr-2" />
                  {t('common.secureData')}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-turnbold-green mr-2" />
                  {t('common.dedicatedSupport')}
                </div>
              </div>
            </div>

            <div className="lg:text-right">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="FitCoach Interface"
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
              { id: 'arquitetura', label: t('tabs.architecture') },
              { id: 'beneficios', label: t('tabs.techStack') },
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
        <Suspense fallback={<LoadingSpinner message="Carregando funcionalidades..." fullScreen={false} />}>
          <FitCoachFeatures />
        </Suspense>
      )}

      {activeTab === 'arquitetura' && (
        <Suspense fallback={<LoadingSpinner message="Carregando arquitetura..." fullScreen={false} />}>
          <FitCoachArchitecture />
        </Suspense>
      )}

      {activeTab === 'beneficios' && (
        <Suspense fallback={<LoadingSpinner message="Carregando benefícios..." fullScreen={false} />}>
          <FitCoachBenefits />
        </Suspense>
      )}

      {activeTab === 'depoimentos' && (
        <Suspense fallback={<LoadingSpinner message="Carregando depoimentos..." fullScreen={false} />}>
          <FitCoachTestimonials />
        </Suspense>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">{t('fitcoach.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('fitcoach.cta.description')}
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

export default FitCoach;