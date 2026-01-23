import { CategoryCard } from './CategoryCard';
import { useCatalog } from '@/hooks/useCatalog';

export function CategoryList() {
  const categories = useCatalog();

  // Сортируем категории по названию по алфавиту
  const sortedCategories = [...categories].sort((a, b) => 
    a.name.localeCompare(b.name, 'ru')
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {sortedCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
