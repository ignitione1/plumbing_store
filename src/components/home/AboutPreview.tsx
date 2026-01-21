import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const advantages = [
  'Более 5000 наименований товаров',
  'Сертифицированная продукция',
  'Консультации специалистов',
  'Гарантия на все товары',
  'Доставка по Саратову',
  'Гибкая система скидок',
];

export function AboutPreview() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="section-title mb-4">
              Магазин «Сантехникъ» — ваш надёжный партнёр
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Мы предлагаем широкий ассортимент сантехнической продукции для частных 
              домов, квартир и коммерческих объектов. Наши специалисты помогут подобрать 
              оптимальное решение для любых инженерных систем.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-sm text-foreground">{advantage}</span>
                </div>
              ))}
            </div>

            <Button asChild>
              <Link to="/about">
                Подробнее о магазине
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-primary-foreground/80 text-sm">Лет на рынке</div>
            </div>
            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground text-sm">Товаров в каталоге</div>
            </div>
            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1500+</div>
              <div className="text-muted-foreground text-sm">Довольных клиентов</div>
            </div>
            <div className="bg-accent text-accent-foreground rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24ч</div>
              <div className="text-accent-foreground/80 text-sm">Доставка по городу</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
