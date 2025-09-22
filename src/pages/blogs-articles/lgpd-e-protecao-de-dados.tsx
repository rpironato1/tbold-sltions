import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from '@/components/icons';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const Artigo6 = () => {
  const { t } = useTypedTranslation('blog');
  return (
    <div className="min-h-screen bg-turnbold-white">
      <SEOHead 
        page="blog"
        type="article"
        title={t('articles.lgpdProtecao.title')}
        description={t('articles.lgpdProtecao.description')}
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
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop" 
                  alt={t('articles.lgpdProtecao.title')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-turnbold-green px-3 py-1 rounded-full text-sm font-medium">
                    {t('common.category')}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-2">{t('articles.lgpdProtecao.title')}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span>{t('common.by')} {t('articles.lgpdProtecao.author')}</span>
                    <span>•</span>
                    <span>{t('common.publishedOn')} {t('articles.lgpdProtecao.publishDate')}</span>
                    <span>•</span>
                    <span>{t('articles.lgpdProtecao.readingTime')} {t('common.readingTime')}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed mb-6">
                  {t('articles.lgpdProtecao.description')}
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.lgpdProtecao.sections.0.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.lgpdProtecao.sections.0.content')}
                </p>
                
                <h3 className="text-xl font-semibold mb-3">
                  {t('articles.lgpdProtecao.sections.0.subsections.0.title')}
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {t('articles.lgpdProtecao.sections.0.subsections.0.items', { returnObjects: true }).map((item: {title: string, description: string}, index: number) => (
                    <div key={index} className="border-l-4 border-turnbold-green pl-4">
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.lgpdProtecao.sections.1.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.lgpdProtecao.sections.1.content')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {(t('articles.lgpdProtecao.sections.1.challenges', { returnObjects: true }) as Array<{title: string, description: string}>).map((challenge, index: number) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">{challenge.title}</h4>
                      <p className="text-sm text-red-700">{challenge.description}</p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 text-turnbold-dark">
                  {t('articles.lgpdProtecao.sections.2.title')}
                </h2>
                <p className="mb-4">
                  {t('articles.lgpdProtecao.sections.2.content')}
                </p>
                
                <div className="bg-turnbold-green text-white p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t('articles.lgpdProtecao.sections.2.implementation.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.lgpdProtecao.sections.2.implementation.immediate.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {t('articles.lgpdProtecao.sections.2.implementation.immediate.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('articles.lgpdProtecao.sections.2.implementation.mediumTerm.title')}
                      </h4>
                      <ul className="text-sm space-y-1">
                        {t('articles.lgpdProtecao.sections.2.implementation.mediumTerm.items', { returnObjects: true }).map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-8">
                  <p className="text-lg font-medium text-center text-turnbold-dark">
                    💡 <em>"{t('articles.lgpdProtecao.quote.text')}"</em>
                  </p>
                  <p className="text-center text-sm text-turnbold-text mt-2">- {t('articles.lgpdProtecao.quote.source')}</p>
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

export default Artigo6;