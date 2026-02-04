import { Link } from 'react-router-dom';
import type { ProductGroupNormalized } from '@/types/catalog';
import { getProductGroupImageUrl } from '@/lib/imageUtils';

interface ProductGroupCardProps {
  group: ProductGroupNormalized;
  categorySlug: string;
  subcategorySlug: string;
}

export function ProductGroupCard({ group, categorySlug, subcategorySlug }: ProductGroupCardProps) {
  return (
    <Link
      to={`/catalog/${categorySlug}/${subcategorySlug}/${group.slug}`}
      className="border border-border rounded overflow-hidden hover:border-primary/30 transition-colors block bg-white"
    >
      {/* Image */}
      <div className="aspect-video bg-white flex items-center justify-center p-4">
        <img
          src={getProductGroupImageUrl(group.imageUrl)}
          alt={group.groupName}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-2">{group.groupName}</h3>
        {group.descriptionShort && (
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {group.descriptionShort}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {group.items.length} {group.items.length === 1 ? 'вариант' : group.items.length < 5 ? 'варианта' : 'вариантов'}
        </p>
      </div>
    </Link>
  );
}
