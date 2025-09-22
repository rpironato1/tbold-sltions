import { useTypedTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from '@/components/icons';

const languages = [
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector() {
  const { i18n, changeLanguage, getCurrentLanguage } = useTypedTranslation();

  const currentLanguage = languages.find(lang => lang.code === getCurrentLanguage()) || languages[0];

  const handleLanguageChange = (languageCode: Language) => {
    changeLanguage(languageCode);
    // Força a persistência imediata no localStorage
    localStorage.setItem('language', languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code as Language)}
            className={getCurrentLanguage() === language.code ? 'bg-accent' : ''}
          >
            {language.flag} {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}