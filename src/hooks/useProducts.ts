import { useMemo } from 'react';
import productsData from '@/data/products.json';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  brand: string;
  inStock: boolean;
  specs: Record<string, string>;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export function useProducts(categoryFilter?: string) {
  const products = useMemo(() => {
    let filtered = productsData.products as Product[];
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }
    return filtered;
  }, [categoryFilter]);

  return products;
}

export function useProduct(id: string) {
  return useMemo(() => {
    return (productsData.products as Product[]).find(p => p.id === id);
  }, [id]);
}

export function useCategories() {
  const categories = productsData.categories as Category[];
  const products = productsData.products as Product[];

  return useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      productCount: products.filter(p => p.category === cat.id).length,
    }));
  }, [categories, products]);
}
