import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, LogOut, Users, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import logo from '@/assets/images/logo-turnbold.png';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menuItems = [
    { name: t('navigation.home'), href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: t('navigation.customerService'), href: '/dashboard/customer-service', icon: <Users className="w-5 h-5" /> },
    { name: t('navigation.forms'), href: '/dashboard/forms', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-30 md:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-turnbold-dark text-white flex flex-col p-4 z-40',
          'transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between py-4 mb-8">
          <img 
            src={logo} 
            alt="TurnBold"
            className="h-12 w-auto"
          />
          <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-turnbold-green text-white'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start space-x-3 hover:bg-red-700">
            <LogOut className="w-5 h-5" />
            <span>{t('navigation.signOut')}</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;