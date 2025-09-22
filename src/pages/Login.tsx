import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Loader2 } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from 'sonner';

const Login = () => {
  const { t } = useTypedTranslation('pages');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      toast.error(t('login.errors.title'), { description: error.message });
    } else {
      toast.success(t('navigation.login'));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-turnbold-bg flex flex-col">
      <Header alwaysSolid />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-turnbold-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center">
              <LogIn className="w-6 h-6 text-turnbold-green mr-3" />
              {t('login.title')}
            </CardTitle>
            <CardDescription>
              {t('login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>{t('login.errors.title')}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.fields.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.placeholders.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-turnbold-border focus:border-turnbold-green"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.fields.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('login.placeholders.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="border-turnbold-border focus:border-turnbold-green"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input 
                    type="checkbox" 
                    id="remember" 
                    className="h-4 w-4" 
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm">{t('login.remember')}</Label>
                </div>
                <Link to="#" className="text-sm text-turnbold-green hover:underline">
                  {t('login.forgot')}
                </Link>
              </div>
              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('login.signing')}
                  </>
                ) : t('login.button')}
              </Button>
              <p className="text-center text-sm text-turnbold-text">
                {t('login.noAccount')}{' '}
                <Link to="/signup" className="font-semibold text-turnbold-green hover:underline">
                  {t('login.signup')}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;