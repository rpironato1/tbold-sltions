
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PoliticaPrivacidade = () => {
  const { t } = useTypedTranslation('pages');
  
  const privacyData = t('privacyPolicy', { returnObjects: true }) as {
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
        additionalItems?: string[];
        subtitle?: string;
        cookieTypes?: Array<{
          type: string;
          description: string;
        }>;
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
        title={privacyData.meta.title}
        description={privacyData.meta.description}
        keywords={privacyData.meta.keywords}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{privacyData.header.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {privacyData.header.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-turnbold-dark">{privacyData.content.title}</h2>
            
            <div className="space-y-8 text-turnbold-text leading-relaxed">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-turnbold-dark">{privacyData.content.subtitle}</h3>
              </div>

              {privacyData.content.sections.map((section, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold mb-3 text-turnbold-dark">
                    {section.number}. {section.title}
                  </h4>
                  <p className="mb-4">
                    {section.content}
                  </p>
                  
                  {section.items && (
                    <ul className="list-disc pl-6 mb-3 space-y-1">
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
                  
                  {section.additionalItems && (
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {section.additionalItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.subtitle && (
                    <p className="mb-3">
                      {section.subtitle}
                    </p>
                  )}
                  
                  {section.cookieTypes && (
                    <ul className="list-disc pl-6 mb-3 space-y-1">
                      {section.cookieTypes.map((cookie, cookieIndex) => (
                        <li key={cookieIndex}>
                          <strong>{cookie.type}</strong> {cookie.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.finalNote && (
                    <p className="mb-4">
                      {section.finalNote}
                    </p>
                  )}
                </div>
              ))}

              <div className="bg-turnbold-bg p-6 rounded-lg">
                <p className="font-medium text-turnbold-dark">
                  {privacyData.content.agreement.text}
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

export default PoliticaPrivacidade;
