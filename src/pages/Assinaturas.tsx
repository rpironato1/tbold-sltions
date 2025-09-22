
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Server, Smartphone } from '@/components/icons';

const Assinaturas = () => {
  const { t } = useTypedTranslation('pages');
  
  const produtos = t('subscriptions.products.items', { returnObjects: true }) as Array<{
    name: string;
    price: string;
    description: string;
  }>;

  const datacenterCPU = t('subscriptions.datacenterCPU.items', { returnObjects: true }) as Array<{
    name: string;
    specs: string;
    price: string;
  }>;

  const datacenterGPU = t('subscriptions.datacenterGPU.items', { returnObjects: true }) as Array<{
    name: string;
    specs: string;
    price: string;
  }>;

  const handleContratarClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('subscriptions.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('subscriptions.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('subscriptions.products.title')}</h2>
            <p className="text-xl text-turnbold-text">
              {t('subscriptions.products.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtos.map((produto, index) => (
              <Card key={index} className="text-center border-turnbold-border card-hover">
                <CardHeader>
                  <Smartphone className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                  <CardTitle className="text-xl">{produto.name}</CardTitle>
                  <CardDescription className="text-turnbold-text">
                    {produto.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-turnbold-green mb-4">{produto.price}</div>
                  <div className="text-sm text-turnbold-text mb-4">{t('subscriptions.products.subscription')}</div>
                  <Button 
                    onClick={handleContratarClick}
                    className="bg-turnbold-green hover:bg-turnbold-green/90 text-white w-full"
                  >
                    {t('subscriptions.products.button')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Datacenter CPU */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('subscriptions.datacenterCPU.title')}</h2>
            <p className="text-xl text-turnbold-text">
              {t('subscriptions.datacenterCPU.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {datacenterCPU.map((plano, index) => (
              <Card key={index} className="text-center border-turnbold-border card-hover">
                <CardHeader>
                  <Cpu className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                  <CardTitle className="text-xl">{plano.name}</CardTitle>
                  <CardDescription className="text-turnbold-text">
                    {plano.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-turnbold-green mb-4">{plano.price}</div>
                  <div className="text-sm text-turnbold-text mb-4">{t('subscriptions.products.subscription')}</div>
                  <Button 
                    onClick={handleContratarClick}
                    className="bg-turnbold-green hover:bg-turnbold-green/90 text-white w-full"
                  >
                    {t('subscriptions.products.button')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Datacenter GPU */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('subscriptions.datacenterGPU.title')}</h2>
            <p className="text-xl text-turnbold-text">
              {t('subscriptions.datacenterGPU.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {datacenterGPU.map((plano, index) => (
              <Card key={index} className="text-center border-turnbold-border card-hover">
                <CardHeader>
                  <Zap className="w-16 h-16 text-turnbold-green mx-auto mb-4" />
                  <CardTitle className="text-xl">{plano.name}</CardTitle>
                  <CardDescription className="text-turnbold-text">
                    {plano.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-turnbold-green mb-4">{plano.price}</div>
                  <div className="text-sm text-turnbold-text mb-4">{t('subscriptions.products.subscription')}</div>
                  <Button 
                    onClick={handleContratarClick}
                    className="bg-turnbold-green hover:bg-turnbold-green/90 text-white w-full"
                  >
                    {t('subscriptions.products.button')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-turnbold-dark text-white">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">{t('subscriptions.cta.title')}</h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('subscriptions.cta.description')}
            </p>
            <Button 
              onClick={handleContratarClick}
              className="bg-turnbold-green hover:bg-turnbold-green/90 text-white text-lg px-8 py-3"
            >
              {t('subscriptions.cta.button')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assinaturas;
