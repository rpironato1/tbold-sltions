import { Card, CardContent } from '@/components/ui/card';
import { useTypedTranslation } from '@/hooks/useTranslation';

const FitCoachBenefits = () => {
  const { t } = useTypedTranslation('projects');

  const benefits = [
    { metric: t('fitcoach.techStack.items.0.metric'), description: t('fitcoach.techStack.items.0.description') },
    { metric: t('fitcoach.techStack.items.1.metric'), description: t('fitcoach.techStack.items.1.description') },
    { metric: t('fitcoach.techStack.items.2.metric'), description: t('fitcoach.techStack.items.2.description') },
    { metric: t('fitcoach.techStack.items.3.metric'), description: t('fitcoach.techStack.items.3.description') }
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('fitcoach.techStack.title')}</h2>
          <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
            {t('fitcoach.techStack.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        <div className="bg-turnbold-bg rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">{t('fitcoach.benefits.workflow.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-turnbold-green mb-2">{t('fitcoach.benefits.workflow.steps.0.title')}</div>
              <p className="text-turnbold-text">{t('fitcoach.benefits.workflow.steps.0.description')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-turnbold-green mb-2">{t('fitcoach.benefits.workflow.steps.1.title')}</div>
              <p className="text-turnbold-text">{t('fitcoach.benefits.workflow.steps.1.description')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-turnbold-green mb-2">{t('fitcoach.benefits.workflow.steps.2.title')}</div>
              <p className="text-turnbold-text">{t('fitcoach.benefits.workflow.steps.2.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitCoachBenefits;