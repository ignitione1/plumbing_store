/**
 * Утилиты для работы с изображениями
 */

/**
 * Получает путь к изображению товара
 * Поддерживает:
 * - Абсолютные URL (http://, https://)
 * - Пути из public/ (начинаются с /)
 * - Относительные пути (будут искаться в public/images/)
 */
export function getProductImageUrl(imageUrl?: string | null, article?: string): string {
  if (!imageUrl) {
    return '/placeholder.svg';
  }

  // Если это абсолютный URL, возвращаем как есть
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Если путь начинается с /, это путь из public/
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // Иначе ищем в public/images/products/
  return `/images/products/${imageUrl}`;
}

/**
 * Получает путь к изображению категории
 */
export function getCategoryImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) {
    return '/placeholder.svg';
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  return `/images/categories/${imageUrl}`;
}

/**
 * Получает путь к изображению баннера
 */
export function getBannerImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) {
    return '/placeholder.svg';
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  return `/images/banners/${imageUrl}`;
}

/**
 * Получает путь к изображению группы товаров
 */
export function getProductGroupImageUrl(imageUrl?: string | null): string {
  return getProductImageUrl(imageUrl);
}

/**
 * Получает путь к изображению подкатегории
 */
export function getSubcategoryImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) {
    return '/placeholder.svg';
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  return `/images/subcategories/${imageUrl}`;
}
