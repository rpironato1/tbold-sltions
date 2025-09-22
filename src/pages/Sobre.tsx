
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import Footer from '@/components/Footer';
import { useTypedTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, Heart, Calendar } from '@/components/icons';

const Sobre = () => {
  const { t } = useTypedTranslation('pages');
  const timeline = [
    { year: t('about.history.timeline.0.year'), title: t('about.history.timeline.0.title'), description: t('about.history.timeline.0.description') },
    { year: t('about.history.timeline.1.year'), title: t('about.history.timeline.1.title'), description: t('about.history.timeline.1.description') },
    { year: t('about.history.timeline.2.year'), title: t('about.history.timeline.2.title'), description: t('about.history.timeline.2.description') },
    { year: t('about.history.timeline.3.year'), title: t('about.history.timeline.3.title'), description: t('about.history.timeline.3.description') },
    { year: t('about.history.timeline.4.year'), title: t('about.history.timeline.4.title'), description: t('about.history.timeline.4.description') }
  ];

  const team = [
    {
      name: t('about.team.members.0.name'),
      role: t('about.team.members.0.role'),
      bio: t('about.team.members.0.bio')
    },
    {
      name: t('about.team.members.1.name'),
      role: t('about.team.members.1.role'),
      bio: t('about.team.members.1.bio')
    },
    {
      name: t('about.team.members.2.name'),
      role: t('about.team.members.2.role'),
      bio: t('about.team.members.2.bio')
    },
    {
      name: t('about.team.members.3.name'),
      role: t('about.team.members.3.role'),
      bio: t('about.team.members.3.bio')
    }
  ];

  return (
    <>
      <SEOHead 
        page="about"
        title={t('about.meta.title')}
        description={t('about.meta.description')}
        keywords={t('about.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('about.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-turnbold-border">
              <CardHeader>
                <Target className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                <CardTitle className="text-2xl">{t('about.mission.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-turnbold-text text-base">
                  {t('about.mission.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-turnbold-border">
              <CardHeader>
                <Eye className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                <CardTitle className="text-2xl">{t('about.vision.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-turnbold-text text-base">
                  {t('about.vision.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-turnbold-border">
              <CardHeader>
                <Heart className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                <CardTitle className="text-2xl">{t('about.values.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-turnbold-text text-base">
                  {t('about.values.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('about.history.title')}</h2>
            <p className="text-xl text-turnbold-text">
              {t('about.history.description')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-turnbold-green"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="border-turnbold-border">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Calendar className="w-5 h-5 text-turnbold-green mr-2" />
                        {item.year} - {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-turnbold-text">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-6 h-6 bg-turnbold-green rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('about.team.title')}</h2>
            <p className="text-xl text-turnbold-text">
              {t('about.team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-turnbold-border card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-turnbold-green font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-turnbold-text text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-turnbold-green mb-2">{t('about.stats.items.0.number')}</div>
              <div className="text-gray-300">{t('about.stats.items.0.label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-turnbold-green mb-2">{t('about.stats.items.1.number')}</div>
              <div className="text-gray-300">{t('about.stats.items.1.label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-turnbold-green mb-2">{t('about.stats.items.2.number')}</div>
              <div className="text-gray-300">{t('about.stats.items.2.label')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-turnbold-green mb-2">{t('about.stats.items.3.number')}</div>
              <div className="text-gray-300">{t('about.stats.items.3.label')}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Sobre;
