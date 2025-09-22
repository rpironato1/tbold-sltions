
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram } from '@/components/icons';

const Footer = () => {
  const { t } = useTranslation('components');
  return (
    <footer className="bg-turnbold-dark text-turnbold-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo-turnbold.png" 
                alt="TurnBold"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/turnbold_" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turnbold-green transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{t('footer.siteMap')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.home')}</Link>
              <Link to="/about" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.about')}</Link>
              <Link to="/projects" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.projects')}</Link>
              <Link to="/subscriptions" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.subscriptions')}</Link>
              <Link to="/blog" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.blog')}</Link>
              <Link to="/faq" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.faq')}</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.navigation.contact')}</Link>
            </div>
          </div>

          {/* Coluna 3: Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{t('footer.policies')}</h3>
            <div className="space-y-2">
              <Link to="/terms-conditions" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.legal.termsConditions')}</Link>
              <Link to="/privacy-policy" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.legal.privacyPolicy')}</Link>
              <Link to="/refund-policy" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.legal.refundPolicy')}</Link>
              <Link to="/legal-notice" className="block text-gray-300 hover:text-turnbold-green transition-colors">{t('footer.legal.legalNotice')}</Link>
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{t('footer.addresses')}</h3>
            <div className="space-y-4">
               <div>
                <h4 className="font-semibold text-gray-200">{t('footer.usa.country')}</h4>
                <div className="space-y-1 text-gray-300 text-sm">
                  <p>{t('footer.usa.ein')}</p>
                  <p>{t('footer.usa.company')}</p>
                  <p>{t('footer.usa.address1')}</p>
                  <p>{t('footer.usa.address2')}</p>
                  <p>{t('footer.usa.phone')}</p>
                  <p>{t('footer.usa.email')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
