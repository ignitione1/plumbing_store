import { Link } from 'react-router-dom';
import { Truck, CreditCard, Banknote, Building2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';

const Delivery = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-main py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Доставка и оплата</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8">
        <h1 className="text-2xl font-medium text-foreground mb-6">Доставка и оплата</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery */}
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Способы доставки</h2>
            
            <div className="space-y-4">
              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Доставка по Саратову</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Доставка по городу в течение 24 часов
                    </p>
                    <p className="text-sm text-muted-foreground">Стоимость доставки уточняйте у менеджера</p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Доставка по области</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Доставка в населённые пункты Саратовской области
                    </p>
                    <p className="text-sm text-muted-foreground">Стоимость доставки уточняйте у менеджера</p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Самовывоз</h3>
                    <p className="text-sm text-muted-foreground">
                      Забрать заказ из магазина по адресу: г. Саратов, ул. Большая Горная, 290
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded">
              <h3 className="font-medium text-foreground mb-2 text-sm uppercase">Условия доставки</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Доставка в рабочие дни с 10:00 до 18:00</li>
                <li>• Подъём на этаж — уточняйте у менеджера</li>
                <li>• Стоимость доставки рассчитывается индивидуально</li>
              </ul>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Способы оплаты</h2>
            
            <div className="space-y-4">
              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <Banknote className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Наличные</h3>
                    <p className="text-sm text-muted-foreground">
                      Оплата наличными при получении товара в магазине или курьеру
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Банковская карта</h3>
                    <p className="text-sm text-muted-foreground">
                      Оплата картой Visa, MasterCard, МИР в магазине
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded p-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Безналичный расчёт</h3>
                    <p className="text-sm text-muted-foreground">
                      Для юридических лиц и ИП — оплата по счёту
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded">
              <h3 className="font-medium text-foreground mb-2 text-sm uppercase">Для юридических лиц</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Работаем с организациями и ИП. Предоставляем полный пакет документов.
              </p>
              <a href="tel:+78452477477" className="text-sm text-primary hover:underline">
                Позвоните для оформления: 8 (8452) 47-74-77
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Delivery;
