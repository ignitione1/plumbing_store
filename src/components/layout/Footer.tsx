import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container-main py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">С</span>
              </div>
              <span className="text-xl font-medium text-foreground">САНТЕХНИКЪ</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Магазин сантехнической продукции в Саратове. 
              Широкий ассортимент, гарантия качества.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Каталог товаров
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  О магазине
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Все категории
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+78452477477" className="text-muted-foreground hover:text-primary transition-colors">
                  8 (8452) 47-74-77
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:Virado@bk.ru" className="text-muted-foreground hover:text-primary transition-colors">
                  Virado@bk.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  г. Саратов, ул. Большая Горная, 290
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Магазин «СантехникЪ». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
