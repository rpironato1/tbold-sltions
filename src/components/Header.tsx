
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut } from '@/components/icons';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { LanguageSelector } from '@/components/LanguageSelector';

interface HeaderProps {
  alwaysSolid?: boolean;
}

const Header = ({ alwaysSolid = false }: HeaderProps) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.projects'), href: '/projects' },
    { name: t('navigation.subscriptions'), href: '/subscriptions' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.faq'), href: '/faq' },
    { name: t('navigation.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${alwaysSolid || isScrolled || isMenuOpen ? 'bg-turnbold-dark shadow-lg' : 'bg-transparent'}`}>
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo-turnbold.png" 
              alt="TurnBold"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-300 font-medium text-white hover:text-turnbold-green ${
                  isActive(item.href) ? 'text-turnbold-green' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSelector />
            {session ? (
              <Button onClick={handleLogout} variant="default" className="bg-red-600 text-white hover:bg-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                {t('navigation.signOut')}
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="default" className="bg-black text-white hover:bg-gray-800">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('navigation.signIn')}
                </Button>
              </Link>
            )}
            <Link to="/contact">
              <Button className="btn-primary">{t('navigation.hireNow')}</Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-turnbold-green"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-turnbold-border bg-turnbold-dark">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-white rounded-md hover:bg-turnbold-green transition-colors duration-300 ${
                    isActive(item.href) ? 'bg-turnbold-green' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
                <div className="px-3 py-2">
                  <LanguageSelector />
                </div>
                {session ? (
                  <Button onClick={handleLogout} variant="default" className="w-full bg-red-600 text-white hover:bg-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('navigation.signOut')}
                  </Button>
                ) : (
                  <Link to="/login" className="block w-full">
                    <Button variant="default" className="w-full bg-black text-white hover:bg-gray-800">
                      <LogIn className="w-4 h-4 mr-2" />
                      {t('navigation.signIn')}
                    </Button>
                  </Link>
                )}
                <div className="px-3 py-2">
                  <Link to="/contact" className="block w-full">
                  <Button className="btn-primary w-full">{t('navigation.hireNow')}</Button>
                </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
