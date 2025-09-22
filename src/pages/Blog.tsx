import { useState, useEffect, useMemo } from 'react';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { useTypedTranslation } from '@/hooks/useTranslation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, ArrowRight } from '@/components/icons';

const Blog = () => {
  const { t, i18n } = useTypedTranslation('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get data from i18n resources directly as a fallback
  const pageResources = i18n.getResourceBundle(i18n.language, 'pages');
  
  // Get categories with multiple fallbacks - memoize to prevent unnecessary re-renders
  const categories = useMemo(() => {
    const categoriesFromT = t('blog.categories', { returnObjects: true });
    return Array.isArray(categoriesFromT) 
      ? categoriesFromT 
      : (pageResources?.blog?.categories || []);
  }, [t, pageResources?.blog?.categories]);
  
  // Get posts with multiple fallbacks
  const postsFromT = t('blog.posts', { returnObjects: true });
  const posts = (Array.isArray(postsFromT) 
    ? postsFromT 
    : (pageResources?.blog?.posts || [])) as Array<{
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image: string;
    readTime: string;
  }>;
  
  // Set initial selected category when categories are loaded or language changes
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [i18n.language, categories]); // Reset when language changes or categories update

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === categories[0] || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead 
        page="blog"
        title={t('blog.meta.title')}
        description={t('blog.meta.description')}
        keywords={t('blog.meta.keywords')}
        type="website"
      />
      <div className="min-h-screen bg-turnbold-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-turnbold-dark text-white pt-20 pb-16 px-4 md:px-8 -mt-20">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">{t('blog.hero.title')}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('blog.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-turnbold-text" size={20} />
                <Input
                  type="text"
                  placeholder={t('blog.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-turnbold-border focus:border-turnbold-green"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 
                      "bg-turnbold-green text-white" : 
                      "border-turnbold-border text-turnbold-text hover:bg-turnbold-green hover:text-white"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-turnbold-text">
                {filteredPosts.length} {t('blog.search.results')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-turnbold-border card-hover">
                <Link to={`/blog/${post.slug}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </Link>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-turnbold-green text-turnbold-green">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-turnbold-text">{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <CardTitle className="text-xl leading-tight hover:text-turnbold-green transition-colors cursor-pointer">
                      {post.title}
                    </CardTitle>
                  </Link>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-turnbold-text mb-4 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-turnbold-text">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="text-turnbold-green hover:text-turnbold-dark p-0">
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-turnbold-text mb-4">
                {t('blog.noResults.title')}
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(categories[0]);
                }}
                className="btn-primary"
              >
                {t('blog.noResults.button')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-turnbold-bg">
        <div className="container-max text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">{t('blog.newsletter.title')}</h2>
          <p className="text-xl text-turnbold-text mb-8">
            {t('blog.newsletter.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 border-turnbold-border focus:border-turnbold-green"
            />
            <Button className="btn-primary">
              {t('blog.newsletter.button')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Blog;