
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X, Shield } from '@/components/icons';

const LGPDBanner = () => {
  const { t } = useTranslation('components');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('lgpd-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd-accepted', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-turnbold-dark text-white p-4 shadow-2xl z-50 animate-fade-in">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Shield className="w-6 h-6 text-turnbold-green flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Privacy Policy and Cookies</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t('lgpdBanner.message')}
                <a href="/privacy-policy" className="text-turnbold-green hover:underline ml-1">
                  {t('lgpdBanner.privacyPolicy')}
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-300 hover:bg-gray-700"
            >
              {t('lgpdBanner.decline')}
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-turnbold-green hover:bg-turnbold-green/90 text-white"
              size="sm"
            >
              {t('lgpdBanner.accept')}
            </Button>
            <button
              onClick={handleReject}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGPDBanner;
