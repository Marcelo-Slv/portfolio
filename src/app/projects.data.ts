export type Cat = 'web' | 'sistema' | 'design' | 'estudos';

export interface Project {
  id: number;
  title: string;
  cat: Cat;
  catLabel: string;
  year: string;
  desc: string;
  stack: string[];
  c1: string;
  c2: string;
  url: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Conferência de Compras',
    cat: 'sistema',
    catLabel: 'Sistema Web',
    year: '2025',
    desc: 'Auditoria de compras em mercados de autoatendimento: cruza o banco com os itens do fiscal da porta, gera relatórios e exporta em PDF.',
    stack: ['C# (.NET)', 'MySQL', 'PDF', 'Bootstrap'],
    c1: '#e34a2a',
    c2: '#7a1708',
    url: 'https://github.com/Marcelo-Slv',
    featured: true,
  },
  {
    id: 2,
    title: 'API de Controle de Estoque',
    cat: 'sistema',
    catLabel: 'Backend',
    year: '2025',
    desc: 'API REST para gestão de estoque com autenticação, validações e documentação de endpoints.',
    stack: ['C#', 'SQL', 'Swagger', 'JWT'],
    c1: '#2e6ca0',
    c2: '#12313f',
    url: 'https://github.com/Marcelo-Slv',
    featured: true,
  },
  {
    id: 3,
    title: 'Painel Financeiro',
    cat: 'web',
    catLabel: 'Dashboard',
    year: '2025',
    desc: 'Dashboard de controle financeiro pessoal com gráficos, categorias e metas mensais.',
    stack: ['Angular', 'TypeScript', 'Chart.js'],
    c1: '#3a9d7d',
    c2: '#12493b',
    url: 'https://github.com/Marcelo-Slv',
    featured: true,
  },
  {
    id: 4,
    title: 'Portfólio — este site',
    cat: 'design',
    catLabel: 'Frontend',
    year: '2026',
    desc: 'Marca autoral em Angular com transições de página, animações em GSAP e design editorial.',
    stack: ['Angular', 'GSAP', 'TypeScript'],
    c1: '#1c1916',
    c2: '#5c534a',
    url: '/',
    featured: false,
  },
  {
    id: 5,
    title: 'Landing de Produto',
    cat: 'design',
    catLabel: 'UI',
    year: '2026',
    desc: 'Landing page conceitual de produto — identidade, tipografia e microinterações.',
    stack: ['HTML', 'CSS', 'GSAP'],
    c1: '#e5b514',
    c2: '#a0710a',
    url: 'https://github.com/Marcelo-Slv',
    featured: false,
  },
  {
    id: 6,
    title: 'Sistema de Estudos',
    cat: 'estudos',
    catLabel: 'Em breve',
    year: '2026',
    desc: 'Próximo projeto: um sistema de acompanhamento de estudos com gamificação. Em desenvolvimento.',
    stack: ['Angular', 'Firebase'],
    c1: '#7a51c4',
    c2: '#3a2465',
    url: 'https://github.com/Marcelo-Slv',
    featured: false,
  },
];

export const MARQUEE_ITEMS = [
  'Angular',
  'TypeScript',
  'C# (.NET)',
  'SQL',
  'UI Design',
  'GSAP',
  'Git',
];