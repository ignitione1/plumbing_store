import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export function FeaturedProducts() {
  const products = useProducts();
  const featuredProducts = products.filter(p => p.oldPrice).slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="section-title">Специальные предложения</h2>
            <p className="section-subtitle">
              Товары со скидками и акции этой недели
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/catalog">
              Все товары
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
