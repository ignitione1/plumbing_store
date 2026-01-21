import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const Contacts = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-main py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Контакты</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8">
        <h1 className="text-2xl font-medium text-foreground mb-6">Контакты</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div>
            <div className="border border-border rounded p-6 mb-6">
              <h2 className="font-medium text-foreground mb-4 uppercase text-sm">Магазин «СантехникЪ»</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <a href="tel:+78452477477" className="text-foreground hover:text-primary transition-colors">
                      8 (8452) 47-74-77
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href="mailto:a477477@yandex.ru" className="text-foreground hover:text-primary transition-colors">
                      a477477@yandex.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Адрес</div>
                    <div className="text-foreground">г. Саратов, ул. Большая Горная, 290, 410005</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Режим работы</div>
                    <div className="text-foreground">
                      Ежедневно: 08:00 — 19:00
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="border border-border rounded p-6">
              <h2 className="font-medium text-foreground mb-4 uppercase text-sm">Напишите нам</h2>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Ваше имя</label>
                  <input type="text" className="search-input w-full" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Телефон</label>
                  <input type="tel" className="search-input w-full" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Сообщение</label>
                  <textarea className="search-input w-full h-24 resize-none" placeholder="Ваш вопрос..." />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Отправить
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="bg-muted rounded border border-border h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Карта</p>
                <p className="text-xs">г. Саратов, ул. Большая Горная, 290</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
