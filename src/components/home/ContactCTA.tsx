import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container-main">
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">
                Нужна консультация?
              </h2>
              <p className="text-muted-foreground mb-6">
                Наши специалисты готовы помочь с выбором сантехники, 
                расчётом материалов и ответить на все ваши вопросы.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-accent">
                  <a href="tel:+78452123456">
                    <Phone className="h-5 w-5 mr-2" />
                    Позвонить
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contacts">
                    Написать нам
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <a href="tel:+78452123456" className="font-semibold text-foreground hover:text-primary transition-colors">
                    +7 (8452) 12-34-56
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:info@santehnik-saratov.ru" className="font-semibold text-foreground hover:text-primary transition-colors">
                    info@santehnik-saratov.ru
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <span className="font-semibold text-foreground">
                    г. Саратов, ул. Большая Горная
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
