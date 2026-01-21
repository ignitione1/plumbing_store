import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs';
import { SubcategoryList } from '@/components/catalog/SubcategoryList';
import { ProductGroupCard } from '@/components/catalog/ProductGroupCard';
import { useCategory, useSubcategory } from '@/hooks/useCatalog';

export default function CategoryPage() {
  const location = useLocation();
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug?: string;
  }>();

  // Всегда вызываем хуки в одном порядке
  const category = useCategory(categorySlug || '');
  const subcategory = useSubcategory(categorySlug || '', subcategorySlug || '');

  // Key для принудительного перерисовывания при изменении параметров
  const pageKey = `${categorySlug}-${subcategorySlug || ''}`;

  // Принудительное обновление при изменении location
  useEffect(() => {
    // Пустой эффект для отслеживания изменений маршрута
  }, [location.pathname]);

  if (!category) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="text-xl font-medium mb-4">Категория не найдена</h1>
          <Link to="/catalog" className="text-primary hover:underline">
            Вернуться в каталог
          </Link>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { label: 'Главная', to: '/' },
    { label: 'Каталог', to: '/catalog' },
    { label: category.name, to: `/catalog/${category.slug}` },
  ];

  // Если открыта подкатегория (проверяем наличие subcategorySlug)
  if (subcategorySlug && subcategory) {
    breadcrumbs.push({ label: subcategory.name });

    return (
      <Layout key={pageKey}>
        <Breadcrumbs items={breadcrumbs} />

        <div className="container-main py-8">
          <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-6">
            {subcategory.name}
          </h1>

          {subcategory.productGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategory.productGroups.map((group) => (
                <ProductGroupCard
                  key={group.id}
                  group={group}
                  categorySlug={category.slug}
                  subcategorySlug={subcategory.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-border rounded">
              <p className="text-muted-foreground">Товары не найдены</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Если открыта только категория
  return (
    <Layout key={pageKey}>
      <Breadcrumbs items={breadcrumbs} />

      <div className="container-main py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-6">
          {category.name}
        </h1>

        <SubcategoryList
          subcategories={category.subcategories}
          categorySlug={category.slug}
        />
      </div>
    </Layout>
  );
}
