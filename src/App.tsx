import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoadingSpinner from "./components/LoadingSpinner";

// ========== IMPORTAÇÕES CRÍTICAS (CARREGAMENTO IMEDIATO) ==========
// Página inicial e de autenticação carregadas diretamente para performance máxima
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// ========== PÁGINAS PRINCIPAIS (PRIORIDADE ALTA) ==========
// Páginas mais acessadas pelos usuários - carregamento prioritário
const Sobre = lazy(() => import("./pages/Sobre"));
const Projetos = lazy(() => import("./pages/Projetos"));
const Contato = lazy(() => import("./pages/Contato"));

// ========== PÁGINAS SECUNDÁRIAS (PRIORIDADE MÉDIA) ==========
// Conteúdo importante mas com menor frequência de acesso
const Blog = lazy(() => import("./pages/Blog"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Assinaturas = lazy(() => import("./pages/Assinaturas"));

// ========== PROJETOS ESPECÍFICOS (PRIORIDADE MÉDIA-BAIXA) ==========
// Páginas de detalhes de projetos - carregadas quando necessário
const AnaliseJUR = lazy(() => import("./pages/projetos/AnaliseJUR"));
const FitCoach = lazy(() => import("./pages/projetos/FitCoach"));
const BarberNow = lazy(() => import("./pages/projetos/BarberNow"));
const LovelyNails = lazy(() => import("./pages/projetos/LovelyNails"));
const OnDemand = lazy(() => import("./pages/projetos/OnDemand"));

// ========== ARTIGOS DO BLOG (PRIORIDADE MÉDIA-BAIXA) ==========
// Conteúdo específico carregado apenas quando acessado
const ComoIaRevolucionaSetorJuridico = lazy(() => import("./pages/blogs-articles/como-ia-revoluciona-setor-juridico"));
const ModernizacaoSistemasCobol = lazy(() => import("./pages/blogs-articles/modernizacao-sistemas-cobol"));
const TecnologiaParaPersonalTrainers = lazy(() => import("./pages/blogs-articles/tecnologia-para-personal-trainers"));
const OcrEMachineLearning = lazy(() => import("./pages/blogs-articles/ocr-e-machine-learning"));
const GestaoDigitalParaBarbearias = lazy(() => import("./pages/blogs-articles/gestao-digital-para-barbearias"));
const LgpdEProtecaoDeDados = lazy(() => import("./pages/blogs-articles/lgpd-e-protecao-de-dados"));

// ========== PÁGINAS LEGAIS (BAIXA PRIORIDADE) ==========
// Páginas acessadas raramente - carregamento sob demanda total
const AvisoLegal = lazy(() => import("./pages/Aviso-legal"));
const PoliticaPrivacidade = lazy(() => import("./pages/Politica-privacidade"));
const PoliticaReembolso = lazy(() => import("./pages/Politica-reembolso"));
const TermosCondicoes = lazy(() => import("./pages/Termos-condicoes"));

// ========== DASHBOARD PROTEGIDO (BAIXA PRIORIDADE) ==========
// Área administrativa - carregada apenas para usuários autenticados
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const DashboardForms = lazy(() => import("./pages/DashboardForms"));
const DashboardCustomerService = lazy(() => import("./pages/DashboardCustomerService"));
const DemoCustomerService = lazy(() => import("./pages/DemoCustomerService"));

// ========== PÁGINAS DE ERRO (BAIXA PRIORIDADE) ==========
// Carregada apenas em caso de rotas inexistentes
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner size="large" message="Carregando página..." />}>
            <Routes>
              {/* Rotas Públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<Sobre />} />
            <Route path="/projects" element={<Projetos />} />
            <Route path="/subscriptions" element={<Assinaturas />} />
            <Route path="/projects/analisejur" element={<AnaliseJUR />} />
            <Route path="/projects/fitcoach" element={<FitCoach />} />
            <Route path="/projects/barbernow" element={<BarberNow />} />
            <Route path="/projects/lovelynails" element={<LovelyNails />} />
            <Route path="/projects/on-demand" element={<OnDemand />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/how-ai-revolutionizes-legal-sector" element={<ComoIaRevolucionaSetorJuridico />} />
            <Route path="/blog/cobol-systems-modernization" element={<ModernizacaoSistemasCobol />} />
            <Route path="/blog/technology-for-personal-trainers" element={<TecnologiaParaPersonalTrainers />} />
            <Route path="/blog/ocr-and-machine-learning" element={<OcrEMachineLearning />} />
            <Route path="/blog/digital-management-for-barbershops" element={<GestaoDigitalParaBarbearias />} />
            <Route path="/blog/lgpd-and-data-protection" element={<LgpdEProtecaoDeDados />} />
            {/* Rotas em português para os blogs */}
            <Route path="/blog/como-ia-revoluciona-setor-juridico" element={<ComoIaRevolucionaSetorJuridico />} />
            <Route path="/blog/modernizacao-sistemas-cobol" element={<ModernizacaoSistemasCobol />} />
            <Route path="/blog/tecnologia-para-personal-trainers" element={<TecnologiaParaPersonalTrainers />} />
            <Route path="/blog/ocr-e-machine-learning" element={<OcrEMachineLearning />} />
            <Route path="/blog/gestao-digital-para-barbearias" element={<GestaoDigitalParaBarbearias />} />
            <Route path="/blog/lgpd-e-protecao-de-dados" element={<LgpdEProtecaoDeDados />} />
            {/* Rotas em espanhol para os blogs */}
            <Route path="/blog/como-ia-revoluciona-sector-juridico" element={<ComoIaRevolucionaSetorJuridico />} />
            <Route path="/blog/modernizacion-sistemas-cobol" element={<ModernizacaoSistemasCobol />} />
            <Route path="/blog/tecnologia-para-entrenadores-personales" element={<TecnologiaParaPersonalTrainers />} />
            <Route path="/blog/ocr-y-machine-learning" element={<OcrEMachineLearning />} />
            <Route path="/blog/gestion-digital-para-barberias" element={<GestaoDigitalParaBarbearias />} />
            <Route path="/blog/lgpd-y-proteccion-de-datos" element={<LgpdEProtecaoDeDados />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contato />} />
            <Route path="/legal-notice" element={<AvisoLegal />} />
            <Route path="/privacy-policy" element={<PoliticaPrivacidade />} />
            <Route path="/refund-policy" element={<PoliticaReembolso />} />
            <Route path="/terms-conditions" element={<TermosCondicoes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Demo Route - Public access to Customer Service Dashboard */}
            <Route path="/demo/customer-service" element={<DemoCustomerService />} />

            {/* Rotas Protegidas do Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="customer-service" element={<DashboardCustomerService />} />
                <Route path="forms" element={<DashboardForms />} />
              </Route>
            </Route>

            {/* Rota Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;