import type {
  CatalogFileData,
  CatalogCategory,
  CatalogSubcategoryNormalized,
  ProductGroupNormalized,
  CatalogProduct,
} from '@/types/catalog';

// Импорт JSON файлов из папки src/data/catalog
import latunnyeAksialnyeFitingi from '@/data/catalog/latunnye-aksialnye-fitingi.json';
import naruzhnayaKanalizaciya from '@/data/catalog/naruzhnaya-kanalizaciya.json';
import trubyPeXPeRT from '@/data/catalog/truby-pe-x-pe-rt.json';
import vnutrennieVodostoki from '@/data/catalog/vnutrennie-vodostoki.json';
import vnutrennyayaKanalizaciya from '@/data/catalog/vnutrennyaya-kanalizaciya.json';

/**
 * Генерирует slug из строки (транслитерация кириллицы)
 */
export function generateSlug(text: string): string {
  const transliterationMap: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
    ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
    А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo',
    Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M',
    Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U',
    Ф: 'F', Х: 'H', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Sch',
    Ъ: '', Ы: 'Y', Ь: '', Э: 'E', Ю: 'Yu', Я: 'Ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => transliterationMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Нормализует данные каталога из JSON файлов
 */
export function normalizeCatalogData(): CatalogCategory[] {
  try {
    const catalogFilesData: CatalogFileData[] = [
      latunnyeAksialnyeFitingi as CatalogFileData,
      naruzhnayaKanalizaciya as CatalogFileData,
      trubyPeXPeRT as CatalogFileData,
      vnutrennieVodostoki as CatalogFileData,
      vnutrennyayaKanalizaciya as CatalogFileData,
    ];

    const sinikonSlug = 'sinikon';

    // Преобразуем существующие категории в подкатегории SINIKON
    // Подкатегории оригинальных категорий объединяются в группы товаров
    const sinikonSubcategories: CatalogSubcategoryNormalized[] = catalogFilesData.map((fileData) => {
      const originalCategorySlug = generateSlug(fileData.name);
      const subcategorySlug = originalCategorySlug; // Используем slug оригинальной категории

      // Объединяем все группы товаров из всех подкатегорий оригинальной категории
      const allProductGroups: ProductGroupNormalized[] = [];

      fileData.subcategories.forEach((subcategory) => {
        subcategory.productGroups.forEach((group) => {
          const groupSlug = group.seo_slug || generateSlug(group.groupName);

          // Трансформируем items в CatalogProduct
          const items: CatalogProduct[] = group.items.map((item) => {
            // Объединяем commonSpecs и характеристики item
            const specs: Record<string, any> = {
              ...group.commonSpecs,
              ...item,
            };

            return {
              article: item.article,
              groupId: groupSlug,
              categorySlug: sinikonSlug,
              subcategorySlug,
              groupSlug,
              specs,
              ...item,
            };
          });

          allProductGroups.push({
            id: groupSlug,
            groupName: group.groupName,
            slug: groupSlug,
            categorySlug: sinikonSlug,
            subcategorySlug,
            commonSpecs: group.commonSpecs,
            items,
            descriptionShort: group.description_short,
            descriptionFull: group.description_full,
            seoSlug: group.seo_slug,
            seoTitle: group.seo_title,
            seoMetaDescription: group.seo_meta_description,
            imageUrl: group.commonSpecs.image_url,
          });
        });
      });

      return {
        id: subcategorySlug,
        name: fileData.name,
        slug: subcategorySlug,
        categorySlug: sinikonSlug,
        imageUrl: fileData.image_url,
        productGroups: allProductGroups,
      };
    });

    // Создаём категорию SINIKON
    const sinikonCategory: CatalogCategory = {
      id: sinikonSlug,
      name: 'SINIKON',
      slug: sinikonSlug,
      imageUrl: '/images/main_categories/sinikon.png',
      subcategories: sinikonSubcategories,
    };

    return [sinikonCategory];
  } catch (error) {
    console.error('Ошибка нормализации данных каталога:', error);
    throw error;
  }
}

/**
 * Кэшированные нормализованные данные
 */
let cachedCatalogData: CatalogCategory[] | null = null;

/**
 * Получает нормализованные данные каталога (с кэшированием)
 */
export function getCatalogData(): CatalogCategory[] {
  try {
    if (!cachedCatalogData) {
      cachedCatalogData = normalizeCatalogData();
    }
    return cachedCatalogData;
  } catch (error) {
    console.error('Ошибка загрузки данных каталога:', error);
    return [];
  }
}

/**
 * Получает категорию по slug
 */
export function getCategoryBySlug(slug: string): CatalogCategory | undefined {
  return getCatalogData().find((cat) => cat.slug === slug);
}

/**
 * Получает подкатегорию по slug категории и подкатегории
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): CatalogSubcategoryNormalized | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug);
}

/**
 * Получает группу товаров по slug
 */
export function getProductGroupBySlug(
  categorySlug: string,
  subcategorySlug: string,
  groupSlug: string
): ProductGroupNormalized | undefined {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
  return subcategory?.productGroups.find((group) => group.slug === groupSlug);
}

/**
 * Получает товар по артикулу
 */
export function getProductByArticle(article: string): CatalogProduct | undefined {
  const categories = getCatalogData();

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      for (const group of subcategory.productGroups) {
        const product = group.items.find((item) => item.article === article);
        if (product) {
          return product;
        }
      }
    }
  }

  return undefined;
}

/**
 * Получает все товары из каталога (плоский список)
 */
export function getAllProducts(): CatalogProduct[] {
  const categories = getCatalogData();
  const products: CatalogProduct[] = [];

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      for (const group of subcategory.productGroups) {
        products.push(...group.items);
      }
    }
  }

  return products;
}
