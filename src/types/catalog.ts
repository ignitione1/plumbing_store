// Типы для новой структуры каталога из папки catalog/

export interface CatalogItem {
  article: string;
  [key: string]: any; // Динамические характеристики товара
}

export interface ProductGroupCommonSpecs {
  type?: string;
  image_url?: string;
  [key: string]: any; // Дополнительные общие характеристики
}

export interface ProductGroup {
  groupName: string;
  commonSpecs: ProductGroupCommonSpecs;
  items: CatalogItem[];
  description_short: string;
  description_full: string;
  seo_slug: string;
  seo_title: string;
  seo_meta_description: string;
}

export interface CatalogSubcategory {
  name: string;
  image_url?: string;
  productGroups: ProductGroup[];
}

export interface CatalogFileData {
  name: string;
  image_url?: string;
  subcategories: CatalogSubcategory[];
}

// Нормализованные типы для использования в приложении

export interface CatalogCategory {
  id: string; // slug
  name: string;
  slug: string;
  imageUrl?: string;
  subcategories: CatalogSubcategoryNormalized[];
}

export interface CatalogSubcategoryNormalized {
  id: string; // slug
  name: string;
  slug: string;
  categorySlug: string;
  imageUrl?: string;
  productGroups: ProductGroupNormalized[];
}

export interface ProductGroupNormalized {
  id: string; // slug
  groupName: string;
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  commonSpecs: ProductGroupCommonSpecs;
  items: CatalogProduct[];
  descriptionShort: string;
  descriptionFull: string;
  seoSlug: string;
  seoTitle: string;
  seoMetaDescription: string;
  imageUrl?: string;
}

export interface CatalogProduct {
  article: string; // ID товара
  groupId: string;
  categorySlug: string;
  subcategorySlug: string;
  groupSlug: string;
  specs: Record<string, any>; // commonSpecs + item specs объединенные
  // Все поля из item
  [key: string]: any;
}
