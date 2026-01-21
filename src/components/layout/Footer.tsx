import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">С</span>
              </div>
              <span className="text-xl font-bold">Сантехникъ</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Магазин сантехнической продукции в Саратове. 
              Широкий ассортимент, профессиональные консультации, 
              гарантия качества.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Каталог товаров
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  О магазине
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=pipes" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Трубы и фитинги
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=valves" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Запорная арматура
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=radiators" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Радиаторы
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=boilers" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">
                  Водонагреватели
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+78452123456" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  +7 (8452) 12-34-56
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:info@santehnik-saratov.ru" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  info@santehnik-saratov.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80">
                  г. Саратов, ул. Большая Горная
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80">
                  Пн-Пт: 9:00-18:00<br />
                  Сб: 10:00-15:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Магазин «Сантехникъ». Все права защищены.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
