import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs';
import { ProductTable } from '@/components/catalog/ProductTable';
import { useCategory, useSubcategory, useProductGroup } from '@/hooks/useCatalog';

export default function ProductGroupPage() {
  const { categorySlug, subcategorySlug, groupSlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
    groupSlug: string;
  }>();

  const category = useCategory(categorySlug || '');
  const subcategory = useSubcategory(categorySlug || '', subcategorySlug || '');
  const group = useProductGroup(
    categorySlug || '',
    subcategorySlug || '',
    groupSlug || ''
  );

  // Key для принудительного перерисовывания при изменении параметров
  const pageKey = `${categorySlug}-${subcategorySlug}-${groupSlug}`;

  if (!category || !subcategory || !group) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="text-xl font-medium mb-4">Группа товаров не найдена</h1>
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
    { label: subcategory.name, to: `/catalog/${category.slug}/${subcategory.slug}` },
    { label: group.groupName },
  ];

  return (
    <Layout key={pageKey}>
      <Breadcrumbs items={breadcrumbs} />

      <div className="container-main py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
          {group.groupName}
        </h1>

        {group.descriptionFull && (
          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">{group.descriptionFull}</p>
          </div>
        )}

        {group.items.length > 0 ? (
          <ProductTable products={group.items} categorySlug={category.slug} />
        ) : (
          <div className="text-center py-12 border border-border rounded">
            <p className="text-muted-foreground">Товары не найдены</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
