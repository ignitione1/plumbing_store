import { useMemo } from 'react';
import {
  getCatalogData,
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductGroupBySlug,
  getProductByArticle,
  getAllProducts,
} from '@/lib/catalogMapper';
import type {
  CatalogCategory,
  CatalogSubcategoryNormalized,
  ProductGroupNormalized,
  CatalogProduct,
} from '@/types/catalog';

/**
 * Хук для получения всех категорий каталога
 */
export function useCatalog(): CatalogCategory[] {
  return useMemo(() => getCatalogData(), []);
}

/**
 * Хук для получения категории по slug
 */
export function useCategory(slug: string): CatalogCategory | undefined {
  return useMemo(() => {
    if (!slug) return undefined;
    return getCategoryBySlug(slug);
  }, [slug]);
}

/**
 * Хук для получения подкатегории по slug
 */
export function useSubcategory(
  categorySlug: string,
  subcategorySlug: string
): CatalogSubcategoryNormalized | undefined {
  return useMemo(() => {
    if (!categorySlug || !subcategorySlug) return undefined;
    return getSubcategoryBySlug(categorySlug, subcategorySlug);
  }, [categorySlug, subcategorySlug]);
}

/**
 * Хук для получения группы товаров по slug
 */
export function useProductGroup(
  categorySlug: string,
  subcategorySlug: string,
  groupSlug: string
): ProductGroupNormalized | undefined {
  return useMemo(() => {
    if (!categorySlug || !subcategorySlug || !groupSlug) return undefined;
    return getProductGroupBySlug(categorySlug, subcategorySlug, groupSlug);
  }, [categorySlug, subcategorySlug, groupSlug]);
}

/**
 * Хук для получения товара по артикулу
 */
export function useCatalogProduct(article: string): CatalogProduct | undefined {
  return useMemo(() => getProductByArticle(article), [article]);
}

/**
 * Хук для получения всех товаров (плоский список)
 */
export function useAllCatalogProducts(): CatalogProduct[] {
  return useMemo(() => getAllProducts(), []);
}
