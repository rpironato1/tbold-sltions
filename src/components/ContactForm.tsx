import { useState } from 'react';
import { useTypedTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2 } from '@/components/icons';
import { toast } from 'sonner';

const ContactForm = () => {
  const { t } = useTypedTranslation('pages');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('contacts')
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error sending form:', error);
      toast.error(`${t('contact.form.error')} ${error.message}`);
    } else {
      toast.success(t('contact.form.success'));
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        interest: ''
      });
    }
  };

  const interestOptions = t('contact.form.interests', { returnObjects: true }) as Array<{value: string, label: string}>;

  return (
    <Card className="border-turnbold-border">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Send className="w-6 h-6 text-turnbold-green mr-3" />
          {t('contact.form.title')}
        </CardTitle>
        <CardDescription>
          {t('contact.form.description')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.name')}</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-turnbold-border focus:border-turnbold-green"
                placeholder={t('contact.form.placeholders.name')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.email')}</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-turnbold-border focus:border-turnbold-green"
                placeholder={t('contact.form.placeholders.email')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.phone')}</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-turnbold-border focus:border-turnbold-green"
                placeholder={t('contact.form.placeholders.phone')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.company')}</label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                disabled={isSubmitting}
                className="border-turnbold-border focus:border-turnbold-green"
                placeholder={t('contact.form.placeholders.company')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.subject')}</label>
              <Input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
                disabled={isSubmitting}
                className="border-turnbold-border focus:border-turnbold-green"
                placeholder={t('contact.form.placeholders.subject')}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t('contact.form.fields.interest')}</label>
              <Select onValueChange={(value) => handleInputChange('interest', value)} disabled={isSubmitting}>
                <SelectTrigger className="border-turnbold-border focus:border-turnbold-green">
                  <SelectValue placeholder={t('contact.form.selectOption')} />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('contact.form.fields.message')}</label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              disabled={isSubmitting}
              className="border-turnbold-border focus:border-turnbold-green min-h-32"
              placeholder={t('contact.form.placeholders.message')}
            />
          </div>

          <div className="bg-turnbold-bg p-4 rounded-lg">
            <p className="text-sm text-turnbold-text">
              {t('contact.form.privacy')}
            </p>
          </div>

          <Button type="submit" className="btn-primary w-full text-lg py-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('contact.form.sending')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t('contact.form.button')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;