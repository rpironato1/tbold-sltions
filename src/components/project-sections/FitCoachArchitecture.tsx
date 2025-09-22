import { Card, CardContent } from '@/components/ui/card';
import { Shield, TrendingUp, Clock } from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';

const FitCoachArchitecture = () => {
  const { t } = useTypedTranslation('projects');

  return (
    <section className="section-padding bg-turnbold-bg">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('fitcoach.architecture.title')}</h2>
          <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
            {t('fitcoach.architecture.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('fitcoach.architecture.components.title')}</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.components.items.0.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.components.items.0.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.components.items.1.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.components.items.1.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.components.items.2.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.components.items.2.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.components.items.3.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.components.items.3.description')}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">{t('fitcoach.architecture.hooks.title')}</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.hooks.items.0.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.hooks.items.0.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.hooks.items.1.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.hooks.items.1.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.hooks.items.2.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.hooks.items.2.description')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-turnbold-border">
                <h4 className="font-semibold text-turnbold-green mb-2">{t('fitcoach.architecture.hooks.items.3.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.hooks.items.3.description')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">{t('fitcoach.architecture.supabase.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-turnbold-border text-center">
              <CardContent className="pt-8">
                <Shield className="w-12 h-12 text-turnbold-green mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{t('fitcoach.architecture.supabase.items.0.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.supabase.items.0.description')}</p>
              </CardContent>
            </Card>
            <Card className="border-turnbold-border text-center">
              <CardContent className="pt-8">
                <TrendingUp className="w-12 h-12 text-turnbold-green mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{t('fitcoach.architecture.supabase.items.1.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.supabase.items.1.description')}</p>
              </CardContent>
            </Card>
            <Card className="border-turnbold-border text-center">
              <CardContent className="pt-8">
                <Clock className="w-12 h-12 text-turnbold-green mx-auto mb-4" />
                <h4 className="font-semibold mb-2">{t('fitcoach.architecture.supabase.items.2.title')}</h4>
                <p className="text-turnbold-text text-sm">{t('fitcoach.architecture.supabase.items.2.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitCoachArchitecture;