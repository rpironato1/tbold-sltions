/**
 * Generates multilingual sitemap.xml with hreflang attributes
 * Run this script after build to generate sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://turnbold.com.br';
const languages = ['pt-BR', 'en', 'es'];
const defaultLanguage = 'pt-BR';

// Define all website routes
const routes = [
  {
    path: '',
    priority: '1.0',
    changefreq: 'weekly',
    pages: {
      'pt-BR': '',
      'en': '/en',
      'es': '/es'
    }
  },
  {
    path: 'about',
    priority: '0.9',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/sobre',
      'en': '/en/about',
      'es': '/es/acerca'
    }
  },
  {
    path: 'contact',
    priority: '0.9',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/contato',
      'en': '/en/contact',
      'es': '/es/contacto'
    }
  },
  {
    path: 'projects',
    priority: '0.8',
    changefreq: 'weekly',
    pages: {
      'pt-BR': '/projetos',
      'en': '/en/projects',
      'es': '/es/proyectos'
    }
  },
  {
    path: 'blog',
    priority: '0.8',
    changefreq: 'weekly',
    pages: {
      'pt-BR': '/blog',
      'en': '/en/blog',
      'es': '/es/blog'
    }
  },
  {
    path: 'faq',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/faq',
      'en': '/en/faq',
      'es': '/es/preguntas-frecuentes'
    }
  },
  {
    path: 'subscriptions',
    priority: '0.8',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/assinaturas',
      'en': '/en/subscriptions',
      'es': '/es/suscripciones'
    }
  },
  // Project pages
  {
    path: 'projects/analisejur',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/projetos/analisejur',
      'en': '/en/projects/analisejur',
      'es': '/es/proyectos/analisejur'
    }
  },
  {
    path: 'projects/fitcoach',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/projetos/fitcoach',
      'en': '/en/projects/fitcoach',
      'es': '/es/proyectos/fitcoach'
    }
  },
  {
    path: 'projects/barbernow',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/projetos/barbernow',
      'en': '/en/projects/barbernow',
      'es': '/es/proyectos/barbernow'
    }
  },
  {
    path: 'projects/lovelynails',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/projetos/lovelynails',
      'en': '/en/projects/lovelynails',
      'es': '/es/proyectos/lovelynails'
    }
  },
  {
    path: 'projects/on-demand',
    priority: '0.7',
    changefreq: 'monthly',
    pages: {
      'pt-BR': '/projetos/on-demand',
      'en': '/en/projects/on-demand',
      'es': '/es/proyectos/on-demand'
    }
  },
  // Blog articles
  {
    path: 'blog/how-ai-revolutionizes-legal-sector',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/como-ia-revoluciona-setor-juridico',
      'en': '/en/blog/how-ai-revolutionizes-legal-sector',
      'es': '/es/blog/como-ia-revoluciona-sector-juridico'
    }
  },
  {
    path: 'blog/cobol-systems-modernization',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/modernizacao-sistemas-cobol',
      'en': '/en/blog/cobol-systems-modernization',
      'es': '/es/blog/modernizacion-sistemas-cobol'
    }
  },
  {
    path: 'blog/technology-for-personal-trainers',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/tecnologia-para-personal-trainers',
      'en': '/en/blog/technology-for-personal-trainers',
      'es': '/es/blog/tecnologia-para-entrenadores-personales'
    }
  },
  {
    path: 'blog/ocr-and-machine-learning',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/ocr-e-machine-learning',
      'en': '/en/blog/ocr-and-machine-learning',
      'es': '/es/blog/ocr-y-machine-learning'
    }
  },
  {
    path: 'blog/digital-management-for-barbershops',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/gestao-digital-para-barbearias',
      'en': '/en/blog/digital-management-for-barbershops',
      'es': '/es/blog/gestion-digital-para-barberias'
    }
  },
  {
    path: 'blog/lgpd-and-data-protection',
    priority: '0.6',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/blog/lgpd-e-protecao-de-dados',
      'en': '/en/blog/lgpd-and-data-protection',
      'es': '/es/blog/lgpd-y-proteccion-de-datos'
    }
  },
  // Legal pages
  {
    path: 'privacy-policy',
    priority: '0.3',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/politica-privacidade',
      'en': '/en/privacy-policy',
      'es': '/es/politica-privacidad'
    }
  },
  {
    path: 'terms-conditions',
    priority: '0.3',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/termos-condicoes',
      'en': '/en/terms-conditions',
      'es': '/es/terminos-condiciones'
    }
  },
  {
    path: 'refund-policy',
    priority: '0.3',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/politica-reembolso',
      'en': '/en/refund-policy',
      'es': '/es/politica-reembolso'
    }
  },
  {
    path: 'legal-notice',
    priority: '0.3',
    changefreq: 'yearly',
    pages: {
      'pt-BR': '/aviso-legal',
      'en': '/en/legal-notice',
      'es': '/es/aviso-legal'
    }
  }
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function generateSitemap() {
  const currentDate = getCurrentDate();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Generate entries for each route
  routes.forEach(route => {
    languages.forEach(lang => {
      const url = baseUrl + route.pages[lang];
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
`;

      // Add hreflang links for all languages
      languages.forEach(hrefLang => {
        const hrefUrl = baseUrl + route.pages[hrefLang];
        const hrefLangCode = hrefLang === 'pt-BR' ? 'pt-BR' : hrefLang;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${hrefLangCode}" href="${hrefUrl}" />
`;
      });

      // Add x-default hreflang (points to default language)
      const defaultUrl = baseUrl + route.pages[defaultLanguage];
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
  </url>
`;
    });
  });

  sitemap += `</urlset>`;
  
  return sitemap;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Optimize crawling
Crawl-delay: 1

# Block admin areas
Disallow: /dashboard/
Disallow: /admin/
Disallow: /_/
Disallow: /api/

# Allow important files
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.ico
Allow: /*.webp
Allow: /*.pdf
`;
}

// Main execution
async function main() {
  try {
    const sitemap = generateSitemap();
    const robotsTxt = generateRobotsTxt();
    
    // Create public directory if it doesn't exist
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap.xml
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
    console.log('✅ Generated sitemap.xml successfully');
    
    // Write robots.txt
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
    console.log('✅ Generated robots.txt successfully');
    
    // Generate site statistics
    const totalUrls = routes.length * languages.length;
    console.log(`📊 Sitemap Statistics:`);
    console.log(`   • Total URLs: ${totalUrls}`);
    console.log(`   • Languages: ${languages.length} (${languages.join(', ')})`);
    console.log(`   • Routes: ${routes.length}`);
    console.log(`   • Base URL: ${baseUrl}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
main();