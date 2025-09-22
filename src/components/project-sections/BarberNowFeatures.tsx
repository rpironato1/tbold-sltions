import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  QrCode, 
  Users, 
  Package, 
  MessageSquare, 
  BarChart3
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';

const BarberNowFeatures = () => {
  const { t } = useTypedTranslation('projects');

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-turnbold-green" />,
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

  return (
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
  );
};

export default BarberNowFeatures;