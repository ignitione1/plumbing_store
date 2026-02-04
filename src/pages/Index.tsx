import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CatalogSection } from '@/components/home/CatalogSection';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      <CatalogSection />

      {/* Info section */}
      <section className="py-8 md:py-12">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-border rounded">
              <div className="text-3xl font-medium text-foreground mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">товаров в каталоге</div>
            </div>
            <div className="text-center p-6 border border-border rounded">
              <div className="text-3xl font-medium text-foreground mb-2">16 лет</div>
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
