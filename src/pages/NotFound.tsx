import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTypedTranslation('pages');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        page="notFound"
        title={t('notFound.meta.title')}
        description={t('notFound.meta.description')}
        keywords={t('notFound.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white flex flex-col">
        <Header alwaysSolid />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 text-turnbold-dark">{t('notFound.title')}</h1>
            <p className="text-xl text-turnbold-text mb-4">{t('notFound.message')}</p>
            <p className="text-lg text-gray-500 mb-8">{t('notFound.description')}</p>
            <a 
              href="/" 
              className="inline-block bg-turnbold-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-turnbold-green/90 transition-colors"
            >
              {t('notFound.button')}
            </a>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
