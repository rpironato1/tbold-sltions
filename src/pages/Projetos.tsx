import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Users, Zap, Building2 } from '@/components/icons';

const Projetos = () => {
  const { t } = useTypedTranslation('pages');
  
  const projects = [
    {
      id: 'analisejur',
      name: t('projects.items.0.name'),
      subtitle: t('projects.items.0.subtitle'),
      description: t('projects.items.0.description'),
      features: [
        t('projects.items.0.features.0'),
        t('projects.items.0.features.1'),
        t('projects.items.0.features.2'),
        t('projects.items.0.features.3'),
        t('projects.items.0.features.4'),
        t('projects.items.0.features.5')
      ],
      benefits: [
        t('projects.items.0.benefits.0'),
        t('projects.items.0.benefits.1'),
        t('projects.items.0.benefits.2'),
        t('projects.items.0.benefits.3')
      ],
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
      icon: <Code className="w-8 h-8 text-turnbold-green" />,
      sector: t('projects.items.0.sector'),
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'fitcoach',
      name: t('projects.items.1.name'),
      subtitle: t('projects.items.1.subtitle'),
      description: t('projects.items.1.description'),
      features: [
        t('projects.items.1.features.0'),
        t('projects.items.1.features.1'),
        t('projects.items.1.features.2'),
        t('projects.items.1.features.3'),
        t('projects.items.1.features.4'),
        t('projects.items.1.features.5')
      ],
      benefits: [
        t('projects.items.1.benefits.0'),
        t('projects.items.1.benefits.1'),
        t('projects.items.1.benefits.2'),
        t('projects.items.1.benefits.3')
      ],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      icon: <Users className="w-8 h-8 text-turnbold-green" />,
      sector: t('projects.items.1.sector'),
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'barbernow',
      name: t('projects.items.2.name'),
      subtitle: t('projects.items.2.subtitle'),
      description: t('projects.items.2.description'),
      features: [
        t('projects.items.2.features.0'),
        t('projects.items.2.features.1'),
        t('projects.items.2.features.2'),
        t('projects.items.2.features.3'),
        t('projects.items.2.features.4'),
        t('projects.items.2.features.5')
      ],
      benefits: [
        t('projects.items.2.benefits.0'),
        t('projects.items.2.benefits.1'),
        t('projects.items.2.benefits.2'),
        t('projects.items.2.benefits.3')
      ],
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop',
      icon: <Zap className="w-8 h-8 text-turnbold-green" />,
      sector: t('projects.items.2.sector'),
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'lovelynails',
      name: t('projects.items.3.name'),
      subtitle: t('projects.items.3.subtitle'),
      description: t('projects.items.3.description'),
      features: [
        t('projects.items.3.features.0'),
        t('projects.items.3.features.1'),
        t('projects.items.3.features.2'),
        t('projects.items.3.features.3'),
        t('projects.items.3.features.4'),
        t('projects.items.3.features.5')
      ],
      benefits: [
        t('projects.items.3.benefits.0'),
        t('projects.items.3.benefits.1'),
        t('projects.items.3.benefits.2'),
        t('projects.items.3.benefits.3')
      ],
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop',
      icon: <Building2 className="w-8 h-8 text-turnbold-green" />,
      sector: t('projects.items.3.sector'),
      color: 'bg-pink-50 border-pink-200'
    }
  ];

  return (
    <>
      <SEOHead 
        page="projects"
        title={t('projects.meta.title')}
        description={t('projects.meta.description')}
        keywords={t('projects.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('projects.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('projects.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Projetos Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <Card key={project.id} className={`overflow-hidden border-2 ${project.color} card-hover`}>
                <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {project.icon}
                      <div>
                        <CardTitle className="text-2xl">{project.name}</CardTitle>
                        <CardDescription className="text-turnbold-green font-semibold">
                          {project.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                    <span className="bg-turnbold-green text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.sector}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-turnbold-text leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-turnbold-dark mb-3">{t('projects.keyFeatures')}:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-turnbold-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-turnbold-text">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {project.features.length > 4 && (
                      <p className="text-sm text-turnbold-green mt-2">
                        +{project.features.length - 4} {t('projects.additionalFeatures')}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-turnbold-dark mb-3">{t('projects.benefits')}:</h4>
                    <div className="space-y-2">
                      {project.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-turnbold-yellow rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-turnbold-text">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link to={`/projects/${project.id}`} className="flex-1">
                      <Button className="w-full btn-primary">
                        {t('projects.viewDetails')} <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                    <Button className="flex-1 btn-secondary">
                      {t('projects.requestDemo')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">{t('projects.customSolution.title')}</h2>
            <p className="text-xl text-turnbold-text mb-8">
              {t('projects.customSolution.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="btn-primary text-lg px-8 py-4">
                  {t('projects.customSolution.requestQuote')}
                </Button>
              </Link>
              <Link to="/projects/on-demand">
                <Button className="btn-secondary text-lg px-8 py-4">
                  {t('projects.customSolution.customProjects')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Projetos;