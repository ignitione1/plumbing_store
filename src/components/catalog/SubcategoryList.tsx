import { Link } from 'react-router-dom';
import type { CatalogSubcategoryNormalized } from '@/types/catalog';
import { getSubcategoryImageUrl } from '@/lib/imageUtils';

interface SubcategoryListProps {
  subcategories: CatalogSubcategoryNormalized[];
  categorySlug: string;
}

export function SubcategoryList({ subcategories, categorySlug }: SubcategoryListProps) {
  if (subcategories.length === 0) {
    return null;
  }

  // Сортируем подкатегории по названию по алфавиту
  const sortedSubcategories = [...subcategories].sort((a, b) => 
    a.name.localeCompare(b.name, 'ru')
  );

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-foreground mb-4">Подкатегории</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedSubcategories.map((subcategory) => {
          const productCount = subcategory.productGroups.reduce(
            (sum, group) => sum + group.items.length,
            0
          );

          return (
            <Link
              key={subcategory.id}
              to={`/catalog/${categorySlug}/${subcategory.slug}`}
              className="border border-border rounded overflow-hidden hover:border-primary/30 transition-colors block"
            >
              {/* Image */}
              <div className="aspect-video bg-muted/30 flex items-center justify-center p-4">
                <img
                  src={getSubcategoryImageUrl(subcategory.imageUrl)}
                  alt={subcategory.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-2">{subcategory.name}</h3>
                {productCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {productCount} {productCount === 1 ? 'товар' : productCount < 5 ? 'товара' : 'товаров'}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
