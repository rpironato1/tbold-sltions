import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermosCondicoes = () => {
  const { t } = useTypedTranslation('pages');

  return (
    <>
      <SEOHead 
        page="termsConditions"
        title={t('termsConditions.meta.title')}
        description={t('termsConditions.meta.description')}
        keywords={t('termsConditions.meta.keywords')}
        type="article"
      />
      <div className="min-h-screen bg-turnbold-white">
        <Header />

        {/* Hero Section */}
        <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-white">{t('termsConditions.header.title')}</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('termsConditions.header.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Termos e Condições Content */}
        <section className="section-padding">
          <div className="container-max max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-turnbold-dark">{t('termsConditions.content.title')}</h2>
              
              <div className="space-y-6 text-turnbold-text leading-relaxed">
                {t('termsConditions.content.sections', { returnObjects: true }).map((section: { number: string; title: string; content?: string; items?: { term: string; definition: string }[]; additionalContent?: string; finalNote?: string }, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-3 text-turnbold-dark">
                      {section.number}. {section.title}
                    </h3>
                    
                    {section.content && (
                      <p className="mb-3">{section.content}</p>
                    )}
                    
                    {section.items && (
                      <ul className="list-disc pl-6 space-y-2 mb-3">
                        {section.items.map((item: { term: string; definition: string }, idx: number) => (
                          <li key={idx}>
                            <strong>"{item.term}"</strong>: {item.definition}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.additionalContent && (
                      <p className="mb-3">{section.additionalContent}</p>
                    )}
                    
                    {section.finalNote && (
                      <p className="mb-3">{section.finalNote}</p>
                    )}
                  </div>
                ))}

                <div className="mt-8 p-4 bg-turnbold-bg rounded-lg">
                  <p className="font-medium">{t('termsConditions.content.agreement.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default TermosCondicoes;