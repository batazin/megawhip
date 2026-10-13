import { useState, useEffect } from 'react';

export type PageRoute = 'home' | 'about' | 'catalog' | 'engineering' | 'segments' | 'contact';

export const ROUTE_MAP: Record<PageRoute, string> = {
  home: '/',
  about: '/sobre',
  catalog: '/catalogo',
  engineering: '/engenharia-3d',
  segments: '/segmentos',
  contact: '/contato',
};

export const PATH_TO_ROUTE: Record<string, PageRoute> = {
  '/': 'home',
  '/home': 'home',
  '/inicio': 'home',
  '/sobre': 'about',
  '/about': 'about',
  '/catalogo': 'catalog',
  '/catalog': 'catalog',
  '/engenharia-3d': 'engineering',
  '/engenharia': 'engineering',
  '/engineering': 'engineering',
  '/segmentos': 'segments',
  '/segments': 'segments',
  '/contato': 'contact',
  '/contact': 'contact',
};

export function parseRouteFromLocation(): PageRoute {
  // 1. Checa pathname
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (PATH_TO_ROUTE[path]) {
    return PATH_TO_ROUTE[path];
  }

  // 2. Checa hash (#/sobre ou #sobre)
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '/');
  if (hash && PATH_TO_ROUTE[hash]) {
    return PATH_TO_ROUTE[hash];
  }

  return 'home';
}

const listeners = new Set<(route: PageRoute) => void>();

export function navigateTo(route: PageRoute) {
  const path = ROUTE_MAP[route] || '/';
  
  try {
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState({}, '', path);
    }
  } catch {
    // fallback if restricted
  }
  
  // Atualiza imediatamente todos os componentes inscritos
  listeners.forEach((listener) => listener(route));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useRoute() {
  const [route, setRoute] = useState<PageRoute>(parseRouteFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseRouteFromLocation());
    };

    listeners.add(setRoute);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      listeners.delete(setRoute);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return { route, navigateTo };
}
