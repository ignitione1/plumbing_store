import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Truck, Shield, Phone, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useProduct, useProducts, useCategories } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/products/ProductCard';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const product = useProduct(id || '');
  const allProducts = useProducts();
  const categories = useCategories();

  if (!product) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Button asChild>
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const category = categories.find(c => c.id === product.category);
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container-main py-4">
          <nav className="text-sm text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            {category && (
              <>
                <span>/</span>
                <Link 
                  to={`/catalog?category=${category.id}`} 
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground truncate max-w-xs">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8 md:py-12">
        {/* Back button */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад в каталог
          </Link>
        </Button>

        {/* Product details */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Image */}
          <div className="bg-card rounded-lg border border-border p-8 relative">
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm">
                -{discount}%
              </Badge>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>

            {/* Stock */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="badge-stock badge-stock-available text-sm">
                  В наличии
                </span>
              ) : (
                <span className="badge-stock badge-stock-unavailable text-sm">
                  Под заказ
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl md:text-4xl font-bold text-foreground">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="btn-accent flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Добавить в корзину
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="h-5 w-5 mr-2" />
                Заказать звонок
              </Button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Доставка по Саратову</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Гарантия качества</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-semibold mb-3">Характеристики</h2>
              <dl className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="section-title mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Product;
