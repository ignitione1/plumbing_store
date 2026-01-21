import { CategoryCard } from '@/components/products/CategoryCard';
import { useCategories } from '@/hooks/useProducts';

export function CategoriesSection() {
  const categories = useCategories();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="section-title">Каталог продукции</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Выберите интересующую категорию товаров
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CategoryCard
                id={category.id}
                name={category.name}
                icon={category.icon}
                productCount={category.productCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
