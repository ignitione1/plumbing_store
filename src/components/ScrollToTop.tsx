import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент для автоматической прокрутки наверх при изменении маршрута
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
