import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, LogOut, Users } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

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
    <aside className="w-64 bg-turnbold-dark text-white flex flex-col p-4">
      <div className="flex items-center justify-center py-4 mb-8">
        <img 
          src="/logo-turnbold.png" 
          alt="TurnBold"
          className="h-12 w-auto"
        />
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
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
  );
};

export default Sidebar;
