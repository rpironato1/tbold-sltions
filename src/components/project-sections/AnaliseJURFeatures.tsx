import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Eye, 
  Users, 
  Download, 
  Shield, 
  Clock
} from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';

const AnaliseJURFeatures = () => {
  const { t } = useTypedTranslation('projects');

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.0.title'),
      description: t('analisejur.features.0.description')
    },
    {
      icon: <Eye className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.1.title'),
      description: t('analisejur.features.1.description')
    },
    {
      icon: <Users className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.2.title'),
      description: t('analisejur.features.2.description')
    },
    {
      icon: <Download className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.3.title'),
      description: t('analisejur.features.3.description')
    },
    {
      icon: <Shield className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.4.title'),
      description: t('analisejur.features.4.description')
    },
    {
      icon: <Clock className="w-6 h-6 text-turnbold-green" />,
      title: t('analisejur.features.5.title'),
      description: t('analisejur.features.5.description')
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('analisejur.hero.title')}</h2>
          <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
            {t('analisejur.hero.description')}
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

export default AnaliseJURFeatures;