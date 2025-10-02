import { useState, useEffect, useCallback } from 'react';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LGPDBanner from '@/components/LGPDBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Code, Users, Zap, Building2, Send, CheckCircle, Trophy, Target, Lightbulb, Shield, Clock, Sparkles, Rocket, TrendingUp, Loader2 } from '@/components/icons';
import { toast } from 'sonner';

const Index = () => {
  const { t } = useTypedTranslation('pages');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bannerSlides = [
    {
      title: t('index.hero.slides.0.title'),
      subtitle: t('index.hero.slides.0.subtitle'),
      cta: t('index.hero.slides.0.cta'),
      ctaLink: '/contato',
      secondaryCta: t('index.hero.slides.0.secondaryCta'),
      secondaryCtaLink: '/contato',
      bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
      highlight: t('index.hero.slides.0.highlight'),
      gradient: 'from-blue-600 to-purple-700'
    },
    {
      title: t('index.hero.slides.1.title'),
      subtitle: t('index.hero.slides.1.subtitle'),
      cta: t('index.hero.slides.1.cta'),
      ctaLink: '/contato',
      secondaryCta: t('index.hero.slides.1.secondaryCta'),
      secondaryCtaLink: '/projetos',
      bgImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
      highlight: t('index.hero.slides.1.highlight'),
      gradient: 'from-green-600 to-teal-700'
    },
    {
      title: t('index.hero.slides.2.title'),
      subtitle: t('index.hero.slides.2.subtitle'),
      cta: t('index.hero.slides.2.cta'),
      ctaLink: '/contato',
      secondaryCta: t('index.hero.slides.2.secondaryCta'),
      secondaryCtaLink: '/contato',
      bgImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop',
      highlight: t('index.hero.slides.2.highlight'),
      gradient: 'from-orange-600 to-red-700'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, [bannerSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('leads')
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error capturing lead:', error);
      toast.error(`${t('index.contact.form.error')} ${error.message}`);
    } else {
      toast.success(t('index.contact.form.success'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const projects = [
    {
      id: 'analisejur',
      name: t('index.projects.items.0.name'),
      description: t('index.projects.items.0.description'),
      icon: <Code className="w-8 h-8 text-turnbold-green" />,
      sector: t('index.projects.items.0.sector'),
      features: [
        t('index.projects.items.0.features.0'),
        t('index.projects.items.0.features.1'),
        t('index.projects.items.0.features.2')
      ],
      savings: t('index.projects.items.0.savings'),
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'fitcoach',
      name: t('index.projects.items.1.name'),
      description: t('index.projects.items.1.description'),
      icon: <Users className="w-8 h-8 text-turnbold-green" />,
      sector: t('index.projects.items.1.sector'),
      features: [
        t('index.projects.items.1.features.0'),
        t('index.projects.items.1.features.1'),
        t('index.projects.items.1.features.2')
      ],
      savings: t('index.projects.items.1.savings'),
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'barbernow',
      name: t('index.projects.items.2.name'),
      description: t('index.projects.items.2.description'),
      icon: <Zap className="w-8 h-8 text-turnbold-green" />,
      sector: t('index.projects.items.2.sector'),
      features: [
        t('index.projects.items.2.features.0'),
        t('index.projects.items.2.features.1'),
        t('index.projects.items.2.features.2')
      ],
      savings: t('index.projects.items.2.savings'),
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'lovelynails',
      name: t('index.projects.items.3.name'),
      description: t('index.projects.items.3.description'),
      icon: <Building2 className="w-8 h-8 text-turnbold-green" />,
      sector: t('index.projects.items.3.sector'),
      features: [
        t('index.projects.items.3.features.0'),
        t('index.projects.items.3.features.1'),
        t('index.projects.items.3.features.2')
      ],
      savings: t('index.projects.items.3.savings'),
      color: 'from-pink-500 to-pink-700'
    }
  ];

  const testimonials = [
    {
      name: t('index.testimonials.items.0.name'),
      role: t('index.testimonials.items.0.role'),
      company: t('index.testimonials.items.0.company'),
      comment: t('index.testimonials.items.0.comment'),
      rating: 5,
      image: 'https://i.postimg.cc/j2G3RnDG/homem-projeto.png',
      result: t('index.testimonials.items.0.result')
    },
    {
      name: t('index.testimonials.items.1.name'),
      role: t('index.testimonials.items.1.role'),
      company: t('index.testimonials.items.1.company'),
      comment: t('index.testimonials.items.1.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1734668484998-c943d1fcb48a?w=100&h=100&fit=crop&crop=face',
      result: t('index.testimonials.items.1.result')
    },
    {
      name: t('index.testimonials.items.2.name'),
      role: t('index.testimonials.items.2.role'),
      company: t('index.testimonials.items.2.company'),
      comment: t('index.testimonials.items.2.comment'),
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
      result: t('index.testimonials.items.2.result')
    }
  ];

  const services = [
    {
      title: t('index.services.items.0.title'),
      description: t('index.services.items.0.description'),
      icon: <Lightbulb className="w-12 h-12 text-turnbold-green mb-4" />,
      features: [
        t('index.services.items.0.features.0'),
        t('index.services.items.0.features.1'),
        t('index.services.items.0.features.2'),
        t('index.services.items.0.features.3')
      ],
      highlight: t('index.services.items.0.highlight'),
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: t('index.services.items.1.title'),
      description: t('index.services.items.1.description'),
      icon: <Target className="w-12 h-12 text-turnbold-green mb-4" />,
      features: [
        t('index.services.items.1.features.0'),
        t('index.services.items.1.features.1'),
        t('index.services.items.1.features.2'),
        t('index.services.items.1.features.3')
      ],
      highlight: t('index.services.items.1.highlight'),
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: t('index.services.items.2.title'),
      description: t('index.services.items.2.description'),
      icon: <Shield className="w-12 h-12 text-turnbold-green mb-4" />,
      features: [
        t('index.services.items.2.features.0'),
        t('index.services.items.2.features.1'),
        t('index.services.items.2.features.2'),
        t('index.services.items.2.features.3')
      ],
      highlight: t('index.services.items.2.highlight'),
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const stats = [
    { number: t('index.stats.items.0.number'), label: t('index.stats.items.0.label'), icon: <Trophy className="w-6 h-6 text-turnbold-green" /> },
    { number: t('index.stats.items.1.number'), label: t('index.stats.items.1.label'), icon: <Star className="w-6 h-6 text-turnbold-yellow" /> },
    { number: t('index.stats.items.2.number'), label: t('index.stats.items.2.label'), icon: <Clock className="w-6 h-6 text-turnbold-green" /> },
    { number: t('index.stats.items.3.number'), label: t('index.stats.items.3.label'), icon: <CheckCircle className="w-6 h-6 text-turnbold-green" /> }
  ];

  return (
    <>
      <SEOHead 
        page="home"
        title={t('index.meta.title')}
        description={t('index.meta.description')}
        keywords={t('index.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-turnbold-white via-turnbold-bg to-blue-50">
      <Header />

      {/* Hero Banner Renovado */}
      <section className="relative h-screen overflow-hidden -mt-20 pt-20">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${slide.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
            <div className="container-max h-full flex items-center relative z-10">
              <div className="max-w-4xl text-white">
                <div className="mb-6 animate-fade-in">
                  <Badge className={`bg-gradient-to-r ${slide.gradient} text-white px-6 py-3 text-base font-bold border-0 shadow-2xl`}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {slide.highlight}
                  </Badge>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight animate-fade-in bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-10 text-gray-100 leading-relaxed animate-fade-in max-w-4xl font-light">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
                  <Link to={slide.ctaLink}>
                    <Button className="btn-primary text-base px-8 py-4 h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-turnbold-green to-green-600 border-0">
                      <Rocket className="w-6 h-6 mr-3" />
                      {slide.cta}
                      <ArrowRight size={24} className="ml-3" />
                    </Button>
                  </Link>
                  <Link to={slide.secondaryCtaLink}>
                    <Button className="btn-secondary border-3 border-white text-white hover:bg-white hover:text-turnbold-dark text-base px-8 py-4 h-auto rounded-2xl backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105">
                      <TrendingUp className="w-6 h-6 mr-3" />
                      {slide.secondaryCta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicadores Renovados */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full shadow-lg ${
                index === currentSlide 
                  ? 'w-16 h-5 bg-gradient-to-r from-turnbold-green to-green-400' 
                  : 'w-5 h-5 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Estatísticas Redesenhadas */}
      <section className="section-padding bg-gradient-to-r from-turnbold-dark via-gray-900 to-turnbold-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-turnbold-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('index.stats.title')}
            </h2>
            <p className="text-xl text-gray-300">{t('index.stats.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-black text-transparent bg-gradient-to-r from-turnbold-green to-green-400 bg-clip-text mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Principais Renovados */}
      <section className="section-padding bg-gradient-to-br from-white via-turnbold-bg to-blue-50">
        <div className="container-max">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-turnbold-green to-green-600 text-white px-6 py-3 mb-6 text-lg font-bold">
              <Sparkles className="w-5 h-5 mr-2" />
              {t('index.services.title')}
            </Badge>
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-turnbold-dark to-gray-700 bg-clip-text text-transparent">
              {t('index.services.subtitle')}
            </h2>
            <p className="text-2xl text-turnbold-text max-w-4xl mx-auto leading-relaxed">
              {t('index.services.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="border-0 card-hover relative overflow-hidden group shadow-2xl rounded-3xl bg-gradient-to-br from-white to-gray-50">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full -translate-y-32 translate-x-32 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700`}></div>
                <CardHeader className="relative z-10 text-center p-10">
                  <div className="flex justify-center mb-6">
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${service.gradient} shadow-2xl`}>
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold mb-4">{service.title}</CardTitle>
                  <div className="text-center">
                    <Badge className={`bg-gradient-to-r ${service.gradient} text-white px-4 py-2 text-base font-semibold`}>
                      {service.highlight}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 p-10 pt-0">
                  <CardDescription className="text-turnbold-text mb-8 text-center text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-turnbold-text">
                        <CheckCircle size={20} className="text-turnbold-green mr-4 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos Proprietários Renovados */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 mb-6 text-lg font-bold">
              <Code className="w-5 h-5 mr-2" />
              {t('index.projects.title')}
            </Badge>
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-turnbold-dark to-gray-700 bg-clip-text text-transparent">
              {t('index.projects.subtitle')}
            </h2>
            <p className="text-2xl text-turnbold-text max-w-4xl mx-auto leading-relaxed">
              {t('index.projects.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <Card key={project.id} className="border-0 card-hover overflow-hidden group shadow-2xl rounded-3xl bg-white">
                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                <CardHeader className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className={`p-4 bg-gradient-to-br ${project.color} rounded-2xl shadow-lg`}>
                        {project.icon}
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
                        <Badge variant="outline" className="border-turnbold-green text-turnbold-green mt-2 font-semibold">
                          {project.sector}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`bg-gradient-to-r ${project.color} text-white font-bold px-4 py-2`}>
                        {project.savings}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <CardDescription className="text-turnbold-text mb-6 text-lg leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm px-3 py-1 bg-gray-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/projects/${project.id}`}>
                    <Button className={`btn-primary w-full group-hover:shadow-2xl bg-gradient-to-r ${project.color} border-0 text-lg py-6 rounded-2xl transform hover:scale-105 transition-all duration-300`}>
                      {t('index.projects.viewDetails')} 
                      <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Renovados */}
      <section className="section-padding bg-gradient-to-br from-turnbold-bg to-blue-50">
        <div className="container-max">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-turnbold-yellow to-orange-500 text-white px-6 py-3 mb-6 text-lg font-bold">
              <Star className="w-5 h-5 mr-2" />
              {t('index.testimonials.title')}
            </Badge>
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-turnbold-dark to-gray-700 bg-clip-text text-transparent">
              {t('index.testimonials.subtitle')}
            </h2>
            <p className="text-xl text-turnbold-text max-w-4xl mx-auto leading-relaxed">
              {t('index.testimonials.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 card-hover relative overflow-hidden shadow-2xl rounded-3xl bg-white">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-turnbold-green via-turnbold-yellow to-orange-500"></div>
                <CardContent className="p-10 flex flex-col h-full">
                  <div className="flex mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={24} className="text-turnbold-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-turnbold-text mb-8 italic text-base leading-relaxed text-center font-medium flex-grow">
                    "{testimonial.comment}"
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4 object-cover shadow-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-turnbold-dark text-sm">{testimonial.name}</p>
                        <p className="text-xs text-turnbold-text">{testimonial.role}</p>
                        <p className="text-xs text-turnbold-text font-semibold">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-turnbold-green to-green-600 text-white font-bold px-4 py-2">
                        {testimonial.result}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Captura de Leads Renovada */}
      <section className="section-padding bg-gradient-to-br from-turnbold-dark via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-turnbold-green to-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-turnbold-green to-green-600 text-white px-6 py-3 mb-8 text-lg font-bold">
                <Send className="w-5 h-5 mr-2" />
                {t('index.contact.title')}
              </Badge>
              <h2 className="text-5xl font-black mb-8 text-white leading-tight">
                {t('index.contact.subtitle')}
                <span className="bg-gradient-to-r from-turnbold-green to-green-400 bg-clip-text text-transparent"> {t('index.contact.subtitleHighlight')}</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                {t('index.contact.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-turnbold-green flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{t('index.contact.features.0')}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-turnbold-green flex-shrink-0" />
                  <span className="text-gray-300 text-base">{t('index.contact.features.1')}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-turnbold-green flex-shrink-0" />
                  <span className="text-gray-300 text-base">{t('index.contact.features.2')}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-8 h-8 text-turnbold-green flex-shrink-0" />
                  <span className="text-gray-300 text-base">{t('index.contact.features.3')}</span>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-2xl rounded-3xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center p-10">
                <CardTitle className="text-4xl flex items-center justify-center text-turnbold-dark font-black">
                  <Send className="w-10 h-10 text-turnbold-green mr-4" />
                  {t('index.contact.form.title')}
                </CardTitle>
                <CardDescription className="text-xl mt-4 text-gray-600">
                  {t('index.contact.form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-0">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <Input
                    type="text"
                    placeholder={t('index.contact.form.fields.name')}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="border-2 border-gray-200 focus:border-turnbold-green h-16 text-lg rounded-2xl"
                  />
                  <Input
                    type="email"
                    placeholder={t('index.contact.form.fields.email')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="border-2 border-gray-200 focus:border-turnbold-green h-16 text-xl rounded-2xl"
                  />
                  <Input
                    type="tel"
                    placeholder={t('index.contact.form.fields.phone')}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="border-2 border-gray-200 focus:border-turnbold-green h-16 text-xl rounded-2xl"
                  />
                  <Textarea
                    placeholder={t('index.contact.form.fields.message')}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="border-2 border-gray-200 focus:border-turnbold-green min-h-40 text-lg resize-none rounded-2xl"
                  />
                  <Button type="submit" className="btn-primary w-full h-20 text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-turnbold-green to-green-600 rounded-2xl border-0" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Send size={28} className="mr-4" />
                        {t('index.contact.form.button')}
                      </>
                    )}
                  </Button>
                  <p className="text-base text-gray-500 text-center">
                    {t('index.contact.form.required')}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <LGPDBanner />
    </div>
    </>
  );
};

export default Index;