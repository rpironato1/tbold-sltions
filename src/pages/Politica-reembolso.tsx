import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PoliticaReembolso = () => {
  const { t } = useTypedTranslation('pages');
  
  const refundData = t('refundPolicy', { returnObjects: true }) as {
    meta: {
      title: string;
      description: string;
      keywords: string;
    };
    header: {
      title: string;
      subtitle: string;
    };
    content: {
      title: string;
      subtitle: string;
      sections: Array<{
        number: string;
        title: string;
        content: string;
        items?: string[];
        additionalContent?: string;
        subtitle?: string;
        finalNote?: string;
      }>;
      agreement: {
        text: string;
      };
    };
  };

  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead
        title={refundData.meta.title}
        description={refundData.meta.description}
        keywords={refundData.meta.keywords}
      />
      
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{refundData.header.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {refundData.header.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-turnbold-dark">{refundData.content.title}</h2>
            
            <div className="space-y-8 text-turnbold-text leading-relaxed">
              {refundData.content.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-semibold mb-4 text-turnbold-dark">
                    {section.number}. {section.title}
                  </h3>
                  <p className="mb-3">
                    {section.content}
                  </p>
                  
                  {section.subtitle && (
                    <p className="mb-3 font-medium">
                      {section.subtitle}
                    </p>
                  )}
                  
                  {section.items && (
                    <ul className="list-disc pl-6 mb-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.additionalContent && (
                    <p className="mb-3">
                      {section.additionalContent}
                    </p>
                  )}
                  
                  {section.finalNote && (
                    <p>
                      {section.finalNote}
                    </p>
                  )}
                </div>
              ))}

              <div className="bg-turnbold-bg p-6 rounded-lg mt-8">
                <p className="text-center font-medium">
                  {refundData.content.agreement.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PoliticaReembolso;