import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypedTranslation } from '@/hooks/useTranslation';

const AnaliseJURFAQ = () => {
  const { t } = useTypedTranslation('projects');

  const faq = [
    {
      question: t('analisejur.faq.items.0.question'),
      answer: t('analisejur.faq.items.0.answer')
    },
    {
      question: t('analisejur.faq.items.1.question'),
      answer: t('analisejur.faq.items.1.answer')
    },
    {
      question: t('analisejur.faq.items.2.question'),
      answer: t('analisejur.faq.items.2.answer')
    },
    {
      question: t('analisejur.faq.items.3.question'),
      answer: t('analisejur.faq.items.3.answer')
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('analisejur.faq.title')}</h2>
          <p className="text-xl text-turnbold-text">
            {t('analisejur.faq.description')}
          </p>
        </div>

        <div className="space-y-6">
          {faq.map((item, index) => (
            <Card key={index} className="border-turnbold-border">
              <CardHeader>
                <CardTitle className="text-xl text-turnbold-dark">
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-turnbold-text leading-relaxed">
                  {item.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnaliseJURFAQ;