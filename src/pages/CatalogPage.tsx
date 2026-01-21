import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs';
import { CategoryList } from '@/components/catalog/CategoryList';

export default function CatalogPage() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог' },
        ]}
      />

      <div className="container-main py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-6">Каталог товаров</h1>
        <CategoryList />
      </div>
    </Layout>
  );
}
