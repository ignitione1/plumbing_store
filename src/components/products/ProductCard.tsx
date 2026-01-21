import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  brand: string;
  inStock: boolean;
  category: string;
}

export function ProductCard({
  id,
  title,
  price,
  oldPrice,
  image,
  brand,
  inStock,
}: ProductCardProps) {
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <div className="bg-card rounded-lg border border-border card-hover overflow-hidden group">
      {/* Image container */}
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            -{discount}%
          </Badge>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {brand}
        </p>

        {/* Title */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-foreground leading-tight mb-3 line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {title}
          </h3>
        </Link>

        {/* Stock status */}
        <div className="mb-3">
          {inStock ? (
            <span className="badge-stock badge-stock-available">
              В наличии
            </span>
          ) : (
            <span className="badge-stock badge-stock-unavailable">
              Под заказ
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            {price.toLocaleString('ru-RU')} ₽
          </span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 btn-primary" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
}
