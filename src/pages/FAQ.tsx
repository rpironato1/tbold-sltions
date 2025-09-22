import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Search, HelpCircle, MessageCircle, Phone, Mail } from '@/components/icons';

const FAQ = () => {
  const { t } = useTypedTranslation('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    {
      title: t('faq.categories.general'),
      iconName: 'HelpCircle',
      questions: t('faq.questions', { returnObjects: true }) as Array<{question: string, answer: string}>
    }
  ];

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isItemOpen = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    return openItems.includes(itemId);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <SEOHead 
        page="faq"
        title={t('faq.meta.title')}
        description={t('faq.meta.description')}
        keywords={t('faq.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('faq.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {t('faq.hero.description')}
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={t('faq.hero.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white focus:text-turnbold-dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          {searchTerm && (
            <div className="mb-8 text-center">
              <p className="text-turnbold-text">
                {filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} {t('faq.search.results')} "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-turnbold-green" />
                  <h2 className="text-2xl font-bold text-turnbold-dark">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <Card key={questionIndex} className="border-turnbold-border">
                      <Collapsible
                        open={isItemOpen(categoryIndex, questionIndex)}
                        onOpenChange={() => toggleItem(categoryIndex, questionIndex)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-turnbold-bg transition-colors">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                              <ChevronDown 
                                className={`w-5 h-5 text-turnbold-green transition-transform ${
                                  isItemOpen(categoryIndex, questionIndex) ? 'rotate-180' : ''
                                }`} 
                              />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <CardDescription className="text-turnbold-text leading-relaxed">
                              {faq.answer}
                            </CardDescription>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">{t('faq.search.noResults')}</h3>
              <p className="text-turnbold-text mb-6">
                {t('faq.search.noResultsDescription')}
              </p>
              <Button 
                onClick={() => setSearchTerm('')}
                className="btn-primary"
              >
                {t('faq.search.clearSearch')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">{t('faq.cta.title')}</h2>
          <p className="text-xl text-turnbold-text mb-8">
            {t('faq.cta.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-turnbold-border text-center">
              <CardContent className="pt-6">
                <Phone className="w-8 h-8 text-turnbold-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('faq.cta.phone.title')}</h3>
                <p className="text-turnbold-text text-sm mb-3">{t('faq.cta.phone.number')}</p>
                <p className="text-xs text-turnbold-text">{t('faq.cta.phone.hours')}</p>
              </CardContent>
            </Card>

            <Card className="border-turnbold-border text-center">
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 text-turnbold-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('faq.cta.email.title')}</h3>
                <p className="text-turnbold-text text-sm mb-3">{t('faq.cta.email.address')}</p>
                <p className="text-xs text-turnbold-text">{t('faq.cta.email.response')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;