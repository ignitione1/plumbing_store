import type { CatalogProduct } from '@/types/catalog';
import { translateSpecKey } from '@/lib/specTranslations';

interface ProductSpecsProps {
  product: CatalogProduct;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = product.specs || {};

  // Исключаем служебные поля
  const excludeKeys = ['article', 'groupId', 'categorySlug', 'subcategorySlug', 'groupSlug', 'specs', 'image_url', 'imageUrl', 'type'];
  
  const displaySpecs = Object.entries(specs).filter(([key]) => !excludeKeys.includes(key));

  if (displaySpecs.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-medium text-foreground mb-4 uppercase text-sm">Характеристики</h2>
      <dl className="space-y-2">
        {displaySpecs.map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-border text-sm">
            <dt className="text-muted-foreground">
              {translateSpecKey(key)}
            </dt>
            <dd className="text-foreground font-medium">
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
