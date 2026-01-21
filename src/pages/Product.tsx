import { useParams, Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useProduct, useProducts, useCategories } from '@/hooks/useProducts';
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
          <h1 className="text-xl font-medium mb-4">Товар не найден</h1>
          <Link to="/catalog" className="text-primary hover:underline">Вернуться в каталог</Link>
        </div>
      </Layout>
    );
  }

  const category = categories.find(c => c.id === product.category);
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-main py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <Link to={`/catalog?category=${category.id}`} className="hover:text-primary transition-colors">
                  {category.name}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container-main py-6">
        {/* Product details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-muted/30 rounded border border-border p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>
            <h1 className="text-2xl font-medium text-foreground mb-4">{product.title}</h1>

            {/* Stock */}
            <div className="mb-4">
              {product.inStock ? (
                <span className="badge-stock badge-in-stock">В наличии</span>
              ) : (
                <span className="badge-stock badge-out-of-stock">Под заказ</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-medium text-foreground">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button className="btn-primary">
                Добавить в корзину
              </button>
              <a href="tel:+78452123456" className="btn-outline flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Заказать звонок
              </a>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-medium text-foreground mb-2 uppercase text-sm">Описание</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-medium text-foreground mb-2 uppercase text-sm">Характеристики</h2>
              <dl className="space-y-1">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border text-sm">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="section-title mb-6">Похожие товары</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
