import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Loader2 } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { saveUserSession } from '@/lib/formStorage';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTypedTranslation('pages');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validation of invitation code
    if (invitationCode !== '#ADMIN') {
      setError(t('signUp.errors.invalidCode'));
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Save user session for future reference
      try {
        saveUserSession(email, false);
        console.log('User session saved after successful signup');
      } catch (sessionError) {
        console.error('Error saving user session:', sessionError);
      }

      // By default, Supabase may require email confirmation.
      // We inform the user about this.
      setSuccessMessage(t('signUp.success.message'));
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3s
    }
  };

  return (
    <>
      <SEOHead 
        page="signUp"
        title={t('signUp.meta.title')}
        description={t('signUp.meta.description')}
        keywords={t('signUp.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-bg flex flex-col">
        <Header alwaysSolid />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-turnbold-border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-turnbold-green mr-3" />
                {t('signUp.title')}
              </CardTitle>
              <CardDescription>
                {t('signUp.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>{t('signUp.errors.title')}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {successMessage && (
                  <Alert variant="default">
                    <AlertTitle>{t('signUp.success.title')}</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t('signUp.fields.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('signUp.placeholders.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-turnbold-border focus:border-turnbold-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('signUp.fields.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('signUp.placeholders.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-turnbold-border focus:border-turnbold-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invitationCode">{t('signUp.fields.invitationCode')}</Label>
                  <Input
                    id="invitationCode"
                    type="text"
                    placeholder={t('signUp.placeholders.invitationCode')}
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    required
                    disabled={isLoading}
                    className="border-turnbold-border focus:border-turnbold-green"
                  />
                </div>
                <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('signUp.registering')}
                    </>
                  ) : t('signUp.button')}
                </Button>
                <p className="text-center text-sm text-turnbold-text">
                  {t('signUp.hasAccount')}{' '}
                  <Link to="/login" className="font-semibold text-turnbold-green hover:underline">
                    {t('signUp.signin')}
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
