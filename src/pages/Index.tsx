import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CatalogSection } from '@/components/home/CatalogSection';
import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';

const Index = () => {
  const products = useProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <Layout>
      <HeroBanner />
      <CatalogSection />

      {/* Featured products */}
      <section className="py-8 md:py-12 bg-secondary">
        <div className="container-main">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Популярные товары</h2>
            <Link to="/catalog" className="text-sm text-primary hover:underline uppercase font-medium">
              Все товары
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="py-8 md:py-12">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-border rounded">
              <div className="text-3xl font-medium text-foreground mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">товаров в каталоге</div>
            </div>
            <div className="text-center p-6 border border-border rounded">
              <div className="text-3xl font-medium text-foreground mb-2">10 лет</div>
              <div className="text-sm text-muted-foreground">на рынке Саратова</div>
            </div>
            <div className="text-center p-6 border border-border rounded">
              <div className="text-3xl font-medium text-foreground mb-2">1500+</div>
              <div className="text-sm text-muted-foreground">довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
