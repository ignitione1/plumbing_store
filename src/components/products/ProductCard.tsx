import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/product/${id}`} className="product-card block">
      {/* Image */}
      <div className="aspect-square bg-muted/30 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {brand}
        </p>

        {/* Title */}
        <h3 className="text-sm font-medium text-foreground leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        {/* Stock */}
        <div className="mb-2">
          {inStock ? (
            <span className="badge-stock badge-in-stock">В наличии</span>
          ) : (
            <span className="badge-stock badge-out-of-stock">Под заказ</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="price">{price.toLocaleString('ru-RU')} ₽</span>
          {oldPrice && (
            <span className="price-old">{oldPrice.toLocaleString('ru-RU')} ₽</span>
          )}
        </div>
      </div>
    </Link>
  );
}
