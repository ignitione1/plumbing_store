import { Truck, CreditCard, Banknote, Building2, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ContactCTA } from '@/components/home/ContactCTA';

const deliveryOptions = [
  {
    icon: Truck,
    title: 'Доставка по Саратову',
    description: 'Доставка по городу в течение 24 часов. При заказе от 5000 ₽ — бесплатно.',
    price: 'от 300 ₽',
  },
  {
    icon: MapPin,
    title: 'Доставка по области',
    description: 'Доставка в населённые пункты Саратовской области. Сроки обсуждаются индивидуально.',
    price: 'от 500 ₽',
  },
  {
    icon: Building2,
    title: 'Самовывоз',
    description: 'Забрать заказ можно из нашего магазина по адресу: г. Саратов, ул. Большая Горная.',
    price: 'Бесплатно',
  },
];

const paymentOptions = [
  {
    icon: Banknote,
    title: 'Наличные',
    description: 'Оплата наличными при получении товара в магазине или курьеру.',
  },
  {
    icon: CreditCard,
    title: 'Банковская карта',
    description: 'Оплата картой Visa, MasterCard, МИР в магазине или онлайн.',
  },
  {
    icon: Building2,
    title: 'Безналичный расчёт',
    description: 'Для юридических лиц и ИП — оплата по счёту. Предоставляем все документы.',
  },
];

const Delivery = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Доставка и оплата</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Мы предлагаем удобные способы доставки и оплаты для физических 
            и юридических лиц.
          </p>
        </div>
      </section>

      {/* Delivery section */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="mb-16">
            <h2 className="section-title mb-4">Способы доставки</h2>
            <p className="section-subtitle mb-8">
              Выберите удобный для вас способ получения заказа
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {deliveryOptions.map((option, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-lg border border-border p-6 card-hover"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <option.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {option.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery conditions */}
          <div className="bg-muted/50 rounded-lg p-6 md:p-8 mb-16">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Условия доставки
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span>Бесплатная доставка по Саратову при заказе от 5 000 ₽</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span>Доставка осуществляется в рабочие дни с 10:00 до 18:00</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span>Крупногабаритные товары доставляются отдельным транспортом</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span>Подъём на этаж — по договорённости (бесплатно до 3 этажа)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span>При получении проверьте комплектность и целостность товара</span>
              </li>
            </ul>
          </div>

          {/* Payment section */}
          <div>
            <h2 className="section-title mb-4">Способы оплаты</h2>
            <p className="section-subtitle mb-8">
              Выберите удобный способ оплаты
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {paymentOptions.map((option, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-lg border border-border p-6 card-hover"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <option.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For business */}
          <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Для юридических лиц</h3>
                <p className="text-primary-foreground/80 mb-4">
                  Работаем с организациями и индивидуальными предпринимателями. 
                  Предоставляем полный пакет документов: счёт, накладную, 
                  счёт-фактуру, акт выполненных работ.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>Работа по договору</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>Отсрочка платежа</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>Специальные цены для оптовых заказов</span>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <div className="inline-block bg-primary-foreground/10 rounded-lg p-6">
                  <p className="text-sm mb-2">Для оформления заказа</p>
                  <a 
                    href="tel:+78452123456" 
                    className="text-2xl font-bold hover:text-accent transition-colors"
                  >
                    +7 (8452) 12-34-56
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Delivery;
