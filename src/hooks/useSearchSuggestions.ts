import { useMemo } from 'react';
import { useAllCatalogProducts, useCatalog } from '@/hooks/useCatalog';
import type { CatalogProduct } from '@/types/catalog';

export interface SearchSuggestion {
  type: 'product' | 'category' | 'subcategory' | 'group';
  title: string;
  subtitle?: string;
  url: string;
  article?: string;
}

export function useSearchSuggestions(query: string, limit: number = 7): SearchSuggestion[] {
  const allProducts = useAllCatalogProducts();
  const catalog = useCatalog();

  return useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Создаем мапы для быстрого поиска
    const categoryMap = new Map<string, { name: string; slug: string }>();
    const subcategoryMap = new Map<string, { name: string; slug: string; categorySlug: string }>();
    const groupMap = new Map<string, { name: string; slug: string; categorySlug: string; subcategorySlug: string }>();

    catalog.forEach(category => {
      categoryMap.set(category.slug, { name: category.name, slug: category.slug });
      category.subcategories.forEach(subcategory => {
        const key = `${category.slug}/${subcategory.slug}`;
        subcategoryMap.set(key, {
          name: subcategory.name,
          slug: subcategory.slug,
          categorySlug: category.slug,
        });
        subcategory.productGroups.forEach(group => {
          const groupKey = `${category.slug}/${subcategory.slug}/${group.slug}`;
          groupMap.set(groupKey, {
            name: group.groupName,
            slug: group.slug,
            categorySlug: category.slug,
            subcategorySlug: subcategory.slug,
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
        });
      }
    });

    // Поиск по группам товаров
    groupMap.forEach((group, key) => {
      if (group.name.toLowerCase().includes(searchQuery)) {
        const categoryName = categoryMap.get(group.categorySlug)?.name || '';
        suggestions.push({
          type: 'group',
          title: group.name,
          subtitle: categoryName,
          url: `/catalog/${group.categorySlug}/${group.subcategorySlug}/${group.slug}`,
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
        if (['groupId', 'categorySlug', 'subcategorySlug', 'groupSlug', 'specs', 'article'].includes(key)) {
          continue;
        }

        if (typeof value === 'string' && value.toLowerCase().includes(searchQuery)) {
          const fieldScore = value.toLowerCase().startsWith(searchQuery) ? 35 : 25;
          if (matchScore < fieldScore) {
            matchScore = fieldScore;
            matchText = value;
          }
        }
      }

      if (matchScore > 0) {
        productMatches.push({
          type: 'product',
          title: matchText || product.article,
          subtitle: group?.name || '',
          url: `/product/${product.article}`,
          article: product.article,
          score: matchScore,
        });
      }
    });

    // Сортируем товары по релевантности
    productMatches.sort((a, b) => b.score - a.score);

    // Сортируем и ограничиваем результаты
    // Сначала категории, потом подкатегории, потом группы, потом товары
    const sorted: SearchSuggestion[] = [
      ...suggestions.filter(s => s.type === 'category'),
      ...suggestions.filter(s => s.type === 'subcategory'),
      ...suggestions.filter(s => s.type === 'group'),
      ...productMatches.map(({ score, ...rest }) => rest),
    ].slice(0, limit);

    return sorted;
  }, [query, allProducts, catalog, limit]);
}
