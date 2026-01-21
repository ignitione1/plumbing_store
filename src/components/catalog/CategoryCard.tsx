import { Link } from 'react-router-dom';
import type { CatalogCategory } from '@/types/catalog';
import { getCategoryImageUrl } from '@/lib/imageUtils';

interface CategoryCardProps {
  category: CatalogCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const productCount = category.subcategories.reduce(
    (total, sub) =>
      total +
      sub.productGroups.reduce((sum, group) => sum + group.items.length, 0),
    0
  );

  return (
    <Link
      to={`/catalog/${category.slug}`}
      className="category-card block overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-square bg-muted/30 flex items-center justify-center p-6">
        <img
          src={getCategoryImageUrl(category.imageUrl)}
          alt={category.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-base md:text-lg font-medium text-foreground text-center leading-snug">
          {category.name}
        </h3>
        {productCount > 0 && (
          <p className="text-sm text-muted-foreground text-center mt-3">
            {productCount} {productCount === 1 ? 'товар' : productCount < 5 ? 'товара' : 'товаров'}
          </p>
        )}
      </div>
    </Link>
  );
}
