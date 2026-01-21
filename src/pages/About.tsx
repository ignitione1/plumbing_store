import { CheckCircle, Users, Award, Target } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ContactCTA } from '@/components/home/ContactCTA';

const advantages = [
  {
    icon: Award,
    title: 'Качество',
    description: 'Работаем только с проверенными поставщиками и предлагаем сертифицированную продукцию',
  },
  {
    icon: Users,
    title: 'Опыт',
    description: 'Более 10 лет на рынке сантехники Саратова. Знаем особенности каждого продукта',
  },
  {
    icon: Target,
    title: 'Сервис',
    description: 'Профессиональные консультации и помощь в подборе оптимального решения',
  },
  {
    icon: CheckCircle,
    title: 'Гарантия',
    description: 'Официальная гарантия на все товары от производителя',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              О магазине «Сантехникъ»
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Мы — специализированный магазин сантехнической продукции в Саратове. 
              Работаем на рынке более 10 лет, предоставляя нашим клиентам широкий 
              выбор качественной продукции для систем водоснабжения и отопления.
            </p>
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="section-title mb-6">Наша миссия</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Магазин «Сантехникъ» основан с целью обеспечить жителей Саратова 
                и области качественной сантехнической продукцией по доступным ценам. 
                Мы понимаем, насколько важно иметь надёжные инженерные системы в доме.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Наша команда состоит из опытных специалистов, которые помогут вам 
                разобраться в технических характеристиках и подобрать оптимальное 
                решение для любой задачи — будь то ремонт квартиры или строительство 
                частного дома.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы ценим каждого клиента и стремимся к долгосрочному сотрудничеству, 
                поэтому гарантируем честные цены, качественный товар и 
                профессиональный сервис.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Лет работы</div>
              </div>
              <div className="bg-muted rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Товаров</div>
              </div>
              <div className="bg-muted rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Брендов</div>
              </div>
              <div className="bg-muted rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">1500+</div>
                <div className="text-sm text-muted-foreground">Клиентов</div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div>
            <h2 className="section-title text-center mb-12">Почему выбирают нас</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-lg border border-border p-6 text-center card-hover"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default About;
