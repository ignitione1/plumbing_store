import { CategoryCard } from '@/components/catalog/CategoryCard';
import { useCatalog } from '@/hooks/useCatalog';

export function CatalogSection() {
  const categories = useCatalog();

  // Сортируем категории по названию по алфавиту
  const sortedCategories = [...categories].sort((a, b) => 
    a.name.localeCompare(b.name, 'ru')
  );

  return (
    <section className="py-8 md:py-12">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
