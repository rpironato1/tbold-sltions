import { Suspense, lazy } from 'react';
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Clock, MessageCircle } from '@/components/icons';

// Lazy load ContactForm
const ContactForm = lazy(() => import('@/components/ContactForm'));

const Contato = () => {
  const { t } = useTypedTranslation('pages');

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-turnbold-green" />,
      title: t('contact.info.email.title'),
      info: t('contact.info.email.info')
    },
    {
      icon: <Phone className="w-6 h-6 text-turnbold-green" />,
      title: t('contact.info.phone.title'),
      info: t('contact.info.phone.info')
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-turnbold-green" />,
      title: t('contact.info.whatsapp.title'),
      info: t('contact.info.whatsapp.info')
    },
    {
      icon: <Clock className="w-6 h-6 text-turnbold-green" />,
      title: t('contact.info.hours.title'),
      info: t('contact.info.hours.info')
    }
  ];

  return (
    <>
      <SEOHead 
        page="contact"
        title={t('contact.meta.title')}
        description={t('contact.meta.description')}
        keywords={t('contact.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('contact.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('contact.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingSpinner message="Carregando formulário..." fullScreen={false} />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-turnbold-border">
                <CardHeader>
                  <CardTitle className="text-xl">{t('contact.info.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {info.icon}
                      <div>
                        <h3 className="font-semibold text-turnbold-dark mb-1">{info.title}</h3>
                        <p className="text-sm text-turnbold-text whitespace-pre-line leading-relaxed">
                          {info.info}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-turnbold-border bg-turnbold-bg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-turnbold-dark mb-2">{t('contact.info.businessHours.title')}</h3>
                    <div className="space-y-1 text-sm text-turnbold-text">
                      <p>{t('contact.info.businessHours.schedule')}</p>
                    </div>
                    <p className="text-xs text-turnbold-text mt-3">
                      {t('contact.info.businessHours.emergency')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Contato;