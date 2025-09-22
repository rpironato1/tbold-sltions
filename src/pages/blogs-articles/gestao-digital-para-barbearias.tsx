
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const Artigo5 = () => {
  const { t } = useTypedTranslation('blog');
  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="blog"
        type="article"
        title={t('articles.gestaoDigital.title')}
        description={t('articles.gestaoDigital.description')}
      />
      <Header />

      <main className="py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/blog" className="flex items-center text-turnbold-green hover:text-turnbold-dark transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('navigation.backToBlog')}
          </Link>
          
          <article>
            <Card className="overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop" 
                  alt={t('articles.gestaoDigital.title')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-turnbold-green px-3 py-1 rounded-full text-sm font-medium">
                    {t('common.category')}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-2">{t('articles.gestaoDigital.title')}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{t('common.by')} {t('articles.gestaoDigital.author')}</span>
                    <span>•</span>
                    <span>{t('common.publishedOn')} {t('articles.gestaoDigital.publishDate')}</span>
                    <span>•</span>
                    <span>{t('articles.gestaoDigital.readingTime')} {t('common.readingTime')}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed mb-6">
                  {t('articles.gestaoDigital.description')}
                </p>
                
                <div className="bg-turnbold-light p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-turnbold-green">
                    {t('articles.gestaoDigital.marketData.title')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(t('articles.gestaoDigital.marketData.stats', { returnObjects: true }) as Array<{value: string, label: string}>).map((stat, index: number) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-turnbold-green">{stat.value}</div>
                        <div className="text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.gestaoDigital.sections.0.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.gestaoDigital.sections.0.content')}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {t('articles.gestaoDigital.sections.0.benefits.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-turnbold-green">
                        {t('articles.gestaoDigital.sections.0.benefits.forClient.title')}
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {(t('articles.gestaoDigital.sections.0.benefits.forClient.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-turnbold-green">
                        {t('articles.gestaoDigital.sections.0.benefits.forBusiness.title')}
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {(t('articles.gestaoDigital.sections.0.benefits.forBusiness.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-turnbold-green pl-6 mb-6">
                  <h4 className="font-semibold mb-2">{t('articles.gestaoDigital.sections.0.tools.title')}</h4>
                  <p className="text-sm mb-2">
                    <strong>{t('articles.gestaoDigital.sections.0.tools.description')}</strong>
                  </p>
                  <p className="text-sm">
                    <strong>{t('articles.gestaoDigital.sections.0.tools.cost')}</strong> | <strong>{t('articles.gestaoDigital.sections.0.tools.roi')}</strong>
                  </p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.gestaoDigital.sections.1.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.gestaoDigital.sections.1.content')}
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">
                    {t('articles.gestaoDigital.sections.1.howItWorks.title')}
                  </h3>
                  <div className="space-y-3">
                    {(t('articles.gestaoDigital.sections.1.howItWorks.steps', { returnObjects: true }) as Array<{number: string, title: string, description: string}>).map((step, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {step.number}
                        </span>
                        <div>
                          <strong>{step.title}:</strong> {step.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.gestaoDigital.sections.2.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.gestaoDigital.sections.2.content')}
                </p>
                
                <div className="bg-turnbold-green text-white p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('articles.gestaoDigital.sections.2.features.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">
                        {t('articles.gestaoDigital.sections.2.features.operational.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {(t('articles.gestaoDigital.sections.2.features.operational.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">
                        {t('articles.gestaoDigital.sections.2.features.intelligence.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {(t('articles.gestaoDigital.sections.2.features.intelligence.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-8">
                  <p className="text-lg font-medium text-center text-turnbold-dark">
                    💡 <em>"{t('articles.gestaoDigital.quote.text')}"</em>
                  </p>
                  <p className="text-center text-sm text-turnbold-text mt-2">
                    - {t('articles.gestaoDigital.quote.source')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Artigo5;
