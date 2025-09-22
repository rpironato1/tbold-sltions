import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const Artigo9 = () => {
  const { t } = useTypedTranslation('blog');
  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="blog"
        type="article"
        title={t('articles.tecnologiaPersonal.title')}
        description={t('articles.tecnologiaPersonal.description')}
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
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop" 
                  alt={t('articles.tecnologiaPersonal.title')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-turnbold-green px-3 py-1 rounded-full text-sm font-medium">
                    {t('common.category')}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-2">{t('articles.tecnologiaPersonal.title')}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{t('common.by')} {t('articles.tecnologiaPersonal.author')}</span>
                    <span>•</span>
                    <span>{t('common.publishedOn')} {t('articles.tecnologiaPersonal.publishDate')}</span>
                    <span>•</span>
                    <span>{t('articles.tecnologiaPersonal.readingTime')} {t('common.readingTime')}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed mb-6">
                  {t('articles.tecnologiaPersonal.description')}
                </p>
                
                <div className="bg-turnbold-light p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-turnbold-green">
                    {t('articles.tecnologiaPersonal.marketData.title')}
                  </h3>
                  <ul className="space-y-2">
                    {Array.isArray(t('articles.tecnologiaPersonal.marketData.stats', { returnObjects: true })) 
                      ? (t('articles.tecnologiaPersonal.marketData.stats', { returnObjects: true }) as string[]).map((stat: string, index: number) => (
                        <li key={index}>• {stat}</li>
                      ))
                      : null
                    }
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.tecnologiaPersonal.sections.0.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.tecnologiaPersonal.sections.0.content')}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">
                  {t('articles.tecnologiaPersonal.sections.0.subsections.0.title')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="border-l-4 border-turnbold-green pl-4">
                    <h4 className="font-semibold mb-2">
                      {t('articles.tecnologiaPersonal.sections.0.subsections.0.items.0.title')}
                    </h4>
                    <p className="text-sm">
                      {t('articles.tecnologiaPersonal.sections.0.subsections.0.items.0.description')}
                    </p>
                  </div>
                  <div className="border-l-4 border-turnbold-green pl-4">
                    <h4 className="font-semibold mb-2">
                      {t('articles.tecnologiaPersonal.sections.0.subsections.0.items.1.title')}
                    </h4>
                    <p className="text-sm">
                      {t('articles.tecnologiaPersonal.sections.0.subsections.0.items.1.description')}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.tecnologiaPersonal.sections.1.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.tecnologiaPersonal.sections.1.content')}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {t('articles.tecnologiaPersonal.sections.1.features.0.title')}
                  </h3>
                  <p className="text-sm mb-3">
                    {t('articles.tecnologiaPersonal.sections.1.features.0.description')}
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-3">
                    {t('articles.tecnologiaPersonal.sections.1.features.1.title')}
                  </h3>
                  <p className="text-sm mb-3">
                    {t('articles.tecnologiaPersonal.sections.1.features.1.description')}
                  </p>

                  <h3 className="text-lg font-semibold mb-3">
                    {t('articles.tecnologiaPersonal.sections.1.features.2.title')}
                  </h3>
                  <p className="text-sm">
                    {t('articles.tecnologiaPersonal.sections.1.features.2.description')}
                  </p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.tecnologiaPersonal.sections.2.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.tecnologiaPersonal.sections.2.content')}
                </p>
                
                <div className="space-y-3 mb-6">
                  {(t('articles.tecnologiaPersonal.sections.2.benefits', { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-turnbold-green text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{index + 1}</span>
                      <div>
                        <p className="text-sm">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.tecnologiaPersonal.sections.3.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.tecnologiaPersonal.sections.3.content')}
                </p>
                
                <div className="bg-turnbold-green text-white p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('articles.tecnologiaPersonal.sections.3.implementation.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.tecnologiaPersonal.sections.3.implementation.immediate.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {(t('articles.tecnologiaPersonal.sections.3.implementation.immediate.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.tecnologiaPersonal.sections.3.implementation.advanced.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {(t('articles.tecnologiaPersonal.sections.3.implementation.advanced.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <p className="text-lg font-medium text-center text-turnbold-dark">
                    💡 <em>"{t('articles.tecnologiaPersonal.quote.text')}"</em>
                  </p>
                  <p className="text-center text-sm text-turnbold-text mt-2">- {t('articles.tecnologiaPersonal.quote.source')}</p>
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

export default Artigo9;