import { useMemo } from 'react';
import { useAllCatalogProducts, useCatalog } from '@/hooks/useCatalog';
import type { CatalogProduct } from '@/types/catalog';

export interface SearchSuggestion {
  type: 'product' | 'category' | 'subcategory' | 'group';
  title: string;
  subtitle?: string;
  url: string;
  article?: string;
  imageUrl?: string;
}

export function useSearchSuggestions(query: string, limit: number = 7): SearchSuggestion[] {
  const allProducts = useAllCatalogProducts();
  const catalog = useCatalog();

  return useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();

    const isImagePathLike = (value: string): boolean => {
      const v = value.trim().toLowerCase();
      if (!v) return false;
      if (v.startsWith('/images/')) return true;
      return /\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/.test(v);
    };
    const suggestions: SearchSuggestion[] = [];

    // Создаем мапы для быстрого поиска
    const categoryMap = new Map<string, { name: string; slug: string; imageUrl?: string }>();
    const subcategoryMap = new Map<string, { name: string; slug: string; categorySlug: string; imageUrl?: string }>();
    const groupMap = new Map<string, { name: string; slug: string; categorySlug: string; subcategorySlug: string; commonSpecs?: any; imageUrl?: string }>();

    catalog.forEach(category => {
      categoryMap.set(category.slug, { name: category.name, slug: category.slug, imageUrl: category.imageUrl });
      category.subcategories.forEach(subcategory => {
        const key = `${category.slug}/${subcategory.slug}`;
        subcategoryMap.set(key, {
          name: subcategory.name,
          slug: subcategory.slug,
          categorySlug: category.slug,
          imageUrl: subcategory.imageUrl,
        });
        subcategory.productGroups.forEach(group => {
          const groupKey = `${category.slug}/${subcategory.slug}/${group.slug}`;
          groupMap.set(groupKey, {
            name: group.groupName,
            slug: group.slug,
            categorySlug: category.slug,
            subcategorySlug: subcategory.slug,
            commonSpecs: group.commonSpecs,
            imageUrl: group.imageUrl,
          });
        });
      });
    });

    // Поиск по категориям
    categoryMap.forEach((category, slug) => {
      if (category.name.toLowerCase().includes(searchQuery)) {
        suggestions.push({
          type: 'category',
          title: category.name,
          url: `/catalog/${slug}`,
          imageUrl: category.imageUrl,
        });
      }
    });

    // Поиск по подкатегориям
    subcategoryMap.forEach((subcategory, key) => {
      if (subcategory.name.toLowerCase().includes(searchQuery)) {
        const categoryName = categoryMap.get(subcategory.categorySlug)?.name || '';
        suggestions.push({
          type: 'subcategory',
          title: subcategory.name,
          subtitle: categoryName,
          url: `/catalog/${subcategory.categorySlug}/${subcategory.slug}`,
          imageUrl: subcategory.imageUrl,
        });
      }
    });

    // Поиск по группам товаров
    groupMap.forEach((group, key) => {
      if (group.name.toLowerCase().includes(searchQuery)) {
        suggestions.push({
          type: 'group',
          title: group.name,
          subtitle: categoryMap.get(group.categorySlug)?.name || '',
          url: `/catalog/${group.categorySlug}/${group.subcategorySlug}/${group.slug}`,
          imageUrl: group.imageUrl,
        });
      }
    });

    // Поиск по товарам (артикул и другие поля)
    const productMatches: Array<SearchSuggestion & { score: number }> = [];
    allProducts.forEach(product => {
      let matchScore = 0;
      let matchText = '';
      const groupKey = `${product.categorySlug}/${product.subcategorySlug}/${product.groupSlug}`;
      const group = groupMap.get(groupKey);

      // Точное совпадение артикула - высший приоритет
      if (product.article.toLowerCase() === searchQuery) {
        matchScore = 100;
        matchText = `${group?.name || ''} ${product.article}`.trim();
      } else if (product.article.toLowerCase().startsWith(searchQuery)) {
        matchScore = 80;
        matchText = `${group?.name || ''} ${product.article}`.trim();
      } else if (product.article.toLowerCase().includes(searchQuery)) {
        matchScore = 50;
        matchText = `${group?.name || ''} ${product.article}`.trim();
      }

      // Поиск в названии группы
      if (group && group.name.toLowerCase().includes(searchQuery)) {
        const groupMatchScore = group.name.toLowerCase().startsWith(searchQuery) ? 70 : 40;
        if (matchScore < groupMatchScore) {
          matchScore = groupMatchScore;
          matchText = `${group.name} ${product.article}`.trim();
        }
      }

      // Поиск по другим полям товара
      for (const [key, value] of Object.entries(product)) {
        if (['groupId', 'categorySlug', 'subcategorySlug', 'groupSlug', 'specs', 'article', 'image_url', 'image', 'imageUrl', 'img', 'photo', 'picture'].includes(key)) {
          continue;
        }

        if (typeof value === 'string') {
          if (isImagePathLike(value)) {
            continue;
          }
          if (!value.toLowerCase().includes(searchQuery)) {
            continue;
          }
          const fieldScore = value.toLowerCase().startsWith(searchQuery) ? 35 : 25;
          if (matchScore < fieldScore) {
            matchScore = fieldScore;
            matchText = value;
          }
        }
      }

      if (matchScore > 0) {
        // Получаем URL изображения - используем ту же логику, что на странице товара
        let imageUrl: string | undefined;
        if (group?.imageUrl) {
          imageUrl = group.imageUrl;
        } else if (product.image_url) {
          imageUrl = product.image_url;
        } else if (group && group.commonSpecs?.image_url) {
          imageUrl = group.commonSpecs.image_url;
        }

        productMatches.push({
          type: 'product',
          title: matchText || product.article,
          subtitle: group?.name || '',
          url: `/product/${encodeURIComponent(product.article)}`,
          article: product.article,
          imageUrl,
          score: matchScore,
        });
      }
    });

    // Сортируем товары по релевантности
    productMatches.sort((a, b) => b.score - a.score);

    // Сортируем и ограничиваем результаты
    // Сначала товары (чтобы не вытеснялись лимитом), затем группы, подкатегории, категории
    const sorted: SearchSuggestion[] = [
      ...productMatches.map(({ score, ...rest }) => rest),
      ...suggestions.filter(s => s.type === 'group'),
      ...suggestions.filter(s => s.type === 'subcategory'),
      ...suggestions.filter(s => s.type === 'category'),
    ].slice(0, limit);

    return sorted;
  }, [query, allProducts, catalog, limit]);
}
