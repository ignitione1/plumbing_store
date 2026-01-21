import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-main relative">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
              Магазин сантехники в Саратове
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Качественная сантехника для вашего дома
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Широкий ассортимент труб, фитингов, радиаторов, смесителей и оборудования 
              от ведущих производителей. Профессиональные консультации и доставка по городу.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/catalog">
                  Перейти в каталог
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contacts">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features bar */}
        <div className="pb-8 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Гарантия качества</h3>
                <p className="text-sm text-primary-foreground/70">Только сертифицированная продукция</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Доставка по городу</h3>
                <p className="text-sm text-primary-foreground/70">Быстрая доставка по Саратову</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Headphones className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Консультации</h3>
                <p className="text-sm text-primary-foreground/70">Помощь в подборе товаров</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
