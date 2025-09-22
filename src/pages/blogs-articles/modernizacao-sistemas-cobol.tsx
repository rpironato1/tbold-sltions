import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const Artigo7 = () => {
  const { t } = useTypedTranslation('blog');
  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="blog"
        type="article"
        title={t('articles.modernizacaoCobol.title')}
        description={t('articles.modernizacaoCobol.description')}
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
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop" 
                  alt={t('articles.modernizacaoCobol.title')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-turnbold-green px-3 py-1 rounded-full text-sm font-medium">
                    {t('common.category')}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-2">{t('articles.modernizacaoCobol.title')}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{t('common.by')} {t('articles.modernizacaoCobol.author')}</span>
                    <span>•</span>
                    <span>{t('common.publishedOn')} {t('articles.modernizacaoCobol.publishDate')}</span>
                    <span>•</span>
                    <span>{t('articles.modernizacaoCobol.readingTime')} {t('common.readingTime')}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed mb-6">
                  {t('articles.modernizacaoCobol.description')}
                </p>
                
                <div className="bg-turnbold-light p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-3 text-turnbold-green">
                    {t('articles.modernizacaoCobol.marketData.title')}
                  </h3>
                  <ul className="space-y-2">
                    {Array.isArray(t('articles.modernizacaoCobol.marketData.stats', { returnObjects: true })) 
                      ? (t('articles.modernizacaoCobol.marketData.stats', { returnObjects: true }) as string[]).map((stat: string, index: number) => (
                        <li key={index}>• {stat}</li>
                      ))
                      : null
                    }
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.modernizacaoCobol.sections.0.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.modernizacaoCobol.sections.0.content')}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="border-l-4 border-turnbold-green pl-4">
                    <h4 className="font-semibold mb-2">
                      {t('articles.modernizacaoCobol.sections.0.subsections.0.items.0.title')}
                    </h4>
                    <p className="text-sm">
                      {t('articles.modernizacaoCobol.sections.0.subsections.0.items.0.description')}
                    </p>
                  </div>
                  <div className="border-l-4 border-turnbold-green pl-4">
                    <h4 className="font-semibold mb-2">
                      {t('articles.modernizacaoCobol.sections.0.subsections.0.items.1.title')}
                    </h4>
                    <p className="text-sm">
                      {t('articles.modernizacaoCobol.sections.0.subsections.0.items.1.description')}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.modernizacaoCobol.sections.1.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.modernizacaoCobol.sections.1.content')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {(t('articles.modernizacaoCobol.sections.1.strategies', { returnObjects: true }) as Array<{title: string, description: string, benefits: string[]}>).map((strategy, index: number) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">{strategy.title}</h4>
                      <p className="text-sm text-blue-700 mb-2">{strategy.description}</p>
                      <ul className="text-xs text-blue-600">
                        {strategy.benefits.map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.modernizacaoCobol.sections.2.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.modernizacaoCobol.sections.2.content')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {(t('articles.modernizacaoCobol.sections.2.challenges', { returnObjects: true }) as Array<{title: string, description: string}>).map((challenge, index: number) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">{challenge.title}</h4>
                      <p className="text-sm text-red-700">{challenge.description}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.modernizacaoCobol.sections.3.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.modernizacaoCobol.sections.3.content')}
                </p>
                
                <div className="bg-turnbold-green text-white p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('articles.modernizacaoCobol.sections.3.implementation.title')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase1.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase1.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase2.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase2.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase3.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {t('articles.modernizacaoCobol.sections.3.implementation.phase3.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <p className="text-lg font-medium text-center text-turnbold-dark">
                    💡 <em>"{t('articles.modernizacaoCobol.quote.text')}"</em>
                  </p>
                  <p className="text-center text-sm text-turnbold-text mt-2">- {t('articles.modernizacaoCobol.quote.source')}</p>
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

export default Artigo7;