import { Card, CardContent } from '@/components/ui/card';
import { Star } from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';

const BarberNowTestimonials = () => {
  const { t } = useTypedTranslation('projects');

  const testimonials = [
    {
      name: t('barbernow.testimonials.items.0.name'),
      role: t('barbernow.testimonials.items.0.role'),
      comment: t('barbernow.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('barbernow.testimonials.items.1.name'),
      role: t('barbernow.testimonials.items.1.role'),
      comment: t('barbernow.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('barbernow.testimonials.title')}</h2>
          <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
            {t('barbernow.testimonials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-turnbold-border">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-turnbold-yellow fill-current" />
                  ))}
                </div>
                <p className="text-turnbold-text mb-6 italic text-lg">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-turnbold-dark text-lg">{testimonial.name}</p>
                    <p className="text-turnbold-text">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarberNowTestimonials;