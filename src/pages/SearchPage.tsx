import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs';
import { ProductTable } from '@/components/catalog/ProductTable';
import { useAllCatalogProducts, useCatalog } from '@/hooks/useCatalog';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const allProducts = useAllCatalogProducts();
  const catalog = useCatalog();

  // Получаем информацию о категориях, подкатегориях и группах для поиска
  const categoryInfo = useMemo(() => {
    const groupMap = new Map<string, string>();
    const categoryMap = new Map<string, string>();
    const subcategoryMap = new Map<string, string>();
    
    catalog.forEach(category => {
      categoryMap.set(category.slug, category.name);
      category.subcategories.forEach(subcategory => {
        subcategoryMap.set(`${category.slug}/${subcategory.slug}`, subcategory.name);
        subcategory.productGroups.forEach(group => {
          groupMap.set(`${category.slug}/${subcategory.slug}/${group.slug}`, group.groupName);
        });
      });
    });
    
    return { groupMap, categoryMap, subcategoryMap };
  }, [catalog]);

  // Поиск по товарам
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    
    return allProducts.filter(product => {
      // Поиск по артикулу
      if (product.article.toLowerCase().includes(searchQuery)) {
        return true;
      }

      // Поиск по названию категории
      const categoryName = categoryInfo.categoryMap.get(product.categorySlug);
      if (categoryName && categoryName.toLowerCase().includes(searchQuery)) {
        return true;
      }

      // Поиск по названию подкатегории
      const subcategoryName = categoryInfo.subcategoryMap.get(
        `${product.categorySlug}/${product.subcategorySlug}`
      );
      if (subcategoryName && subcategoryName.toLowerCase().includes(searchQuery)) {
        return true;
      }

      // Поиск по названию группы товаров
      const groupName = categoryInfo.groupMap.get(
        `${product.categorySlug}/${product.subcategorySlug}/${product.groupSlug}`
      );
      if (groupName && groupName.toLowerCase().includes(searchQuery)) {
        return true;
      }

      // Поиск по всем полям товара
      for (const [key, value] of Object.entries(product)) {
        // Пропускаем служебные поля
        if (['groupId', 'categorySlug', 'subcategorySlug', 'groupSlug', 'specs'].includes(key)) {
          continue;
        }

        // Ищем в строковых значениях
        if (typeof value === 'string' && value.toLowerCase().includes(searchQuery)) {
          return true;
        }

        // Ищем в массивах
        if (Array.isArray(value)) {
          const arrayStr = value.join(' ').toLowerCase();
          if (arrayStr.includes(searchQuery)) {
            return true;
          }
        }
      }

      // Поиск в specs отдельно
      if (product.specs && typeof product.specs === 'object') {
        for (const [specKey, specValue] of Object.entries(product.specs)) {
          if (typeof specValue === 'string' && specValue.toLowerCase().includes(searchQuery)) {
            return true;
          }
          if (Array.isArray(specValue)) {
            const arrayStr = specValue.join(' ').toLowerCase();
            if (arrayStr.includes(searchQuery)) {
              return true;
            }
          }
        }
      }

      return false;
    });
  }, [allProducts, query, categoryInfo]);

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Поиск' },
        ]}
      />

      <div className="container-main py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
          {query ? `Результаты поиска: "${query}"` : 'Поиск по сайту'}
        </h1>

        {!query ? (
          <div className="text-center py-12 border border-border rounded">
            <p className="text-muted-foreground">Введите запрос для поиска</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <p className="text-muted-foreground mb-4">
              Найдено товаров: {searchResults.length}
            </p>
            <ProductTable 
              products={searchResults} 
              categorySlug={searchResults[0]?.categorySlug || ''} 
            />
          </div>
        ) : (
          <div className="text-center py-12 border border-border rounded">
            <p className="text-muted-foreground mb-4">
              По запросу "{query}" ничего не найдено
            </p>
            <Link to="/catalog" className="text-sm text-primary hover:underline">
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
