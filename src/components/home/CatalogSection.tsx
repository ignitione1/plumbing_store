import { CategoryCard } from '@/components/products/CategoryCard';
import { useCategories } from '@/hooks/useProducts';

export function CatalogSection() {
  const categories = useCategories();

  return (
    <section className="py-8 md:py-12">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
