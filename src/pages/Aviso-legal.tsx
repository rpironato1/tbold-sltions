
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from '@/components/icons';

const AvisoLegal = () => {
  const { t } = useTypedTranslation('pages');

  return (
    <>
      <SEOHead 
        page="legalNotice"
        title={t('legalNotice.meta.title')}
        description={t('legalNotice.meta.description')}
        keywords={t('legalNotice.meta.keywords')}
        type="article"
      />
      <div className="min-h-screen bg-turnbold-white">
        <Header />

        {/* Hero Section */}
        <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
          <div className="container-max">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <FileText className="w-12 h-12 text-turnbold-green" />
                <h1 className="text-5xl font-bold text-white">{t('legalNotice.header.title')}</h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t('legalNotice.header.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-max max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-sm border border-turnbold-border p-8">
                <h2 className="text-3xl font-bold text-turnbold-dark mb-8 text-center">
                  <span className="text-turnbold-green">{t('legalNotice.content.title')}</span>
                </h2>
                
                <div className="space-y-8 text-turnbold-text leading-relaxed">
                  {t('legalNotice.content.sections', { returnObjects: true }).map((section: { number: string; title: string; content?: string; additionalContent?: string; finalNote?: string }, index: number) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-turnbold-dark mb-4">
                        {section.number}. {section.title}
                      </h3>
                      
                      {section.content && (
                        <p className="mb-3">{section.content}</p>
                      )}
                      
                      {section.additionalContent && (
                        <p className="mb-3">{section.additionalContent}</p>
                      )}
                      
                      {section.finalNote && (
                        <p className="mb-3">{section.finalNote}</p>
                      )}
                    </div>
                  ))}

                  <div className="bg-turnbold-bg p-6 rounded-lg border-l-4 border-turnbold-green mt-8">
                    <p className="font-semibold text-turnbold-dark">
                      {t('legalNotice.content.agreement.text')}
                    </p>
                  </div>
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

export default AvisoLegal;
