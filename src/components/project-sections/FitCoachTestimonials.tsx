import { Card, CardContent } from '@/components/ui/card';
import { Star } from '@/components/icons';
import { useTypedTranslation } from '@/hooks/useTranslation';

const FitCoachTestimonials = () => {
  const { t } = useTypedTranslation('projects');

  const testimonials = [
    {
      name: t('fitcoach.testimonials.items.0.name'),
      role: t('fitcoach.testimonials.items.0.role'),
      comment: t('fitcoach.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: t('fitcoach.testimonials.items.1.name'),
      role: t('fitcoach.testimonials.items.1.role'),
      comment: t('fitcoach.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('fitcoach.testimonials.title')}</h2>
          <p className="text-xl text-turnbold-text max-w-3xl mx-auto">
            {t('fitcoach.testimonials.description')}
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

export default FitCoachTestimonials;