import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-main py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">О магазине</span>
          </nav>
        </div>
      </div>

      <div className="container-main py-8">
        <h1 className="text-2xl font-medium text-foreground mb-6">Официальный дилер Sinikon в Саратове</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                Магазин «Сантехникъ» — специализированный центр инженерной сантехники.
              </p>

              <p className="mb-4 leading-relaxed">
                Работаем с 2010 года.
                Основное направление — системные решения для водоснабжения, отопления и внутренней канализации.
              </p>

              <p className="mb-4 leading-relaxed">
                Являемся официальным дилером Sinikon и поддерживаем полный ассортимент продукции на складе.
              </p>

              <h2 className="text-lg font-medium text-foreground mt-8 mb-4">Основные направления</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Системы внутренней канализации Sinikon</li>
                <li>Насосное оборудование</li>
                <li>Гидроаккумуляторы и расширительные баки</li>
                <li>Комплектующие для обвязки</li>
                <li>Запорная арматура и фитинги</li>
              </ul>

              <p className="mb-4 leading-relaxed mt-6">
                Ассортимент ориентирован на частных клиентов, монтажников и строительные компании.
              </p>

              <div className="pt-8 mt-8">
                <h2 className="text-lg font-medium text-foreground mb-4">Почему выбирают нас</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Официальный дилер Sinikon</li>
                  <li>Работаем с 2010 года</li>
                  <li>Профессиональный ассортимент</li>
                  <li>Постоянное наличие на складе</li>
                  <li>Подбор оборудования под систему</li>
                  <li>Работаем без выходных</li>
                </ul>
              </div>

              <div className="pt-8 mt-8">
                <h2 className="text-lg font-medium text-foreground mb-4">Гарантии</h2>
                <p className="mb-4 leading-relaxed">
                  Мы работаем с официальными поставщиками и предоставляем гарантию производителя на реализуемую продукцию.
                </p>
              </div>

              <div className="border-t border-border pt-8 mt-8">
                <h2 className="text-lg font-medium text-foreground mb-4">Режим работы</h2>
                <div className="bg-muted/50 rounded p-4">
                  <p className="font-medium mb-2">Понедельник — Воскресенье</p>
                  <p className="text-lg font-medium text-primary mb-2">08:00 – 19:00</p>
                  <p className="text-sm text-primary font-medium">Без выходных</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="border border-border rounded p-6">
              <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Компания в цифрах</h3>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">16+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">оригинальная продукция Sinikon</div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">5</div>
                  <div className="text-sm text-muted-foreground">основных направлений</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-foreground">1500+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>

            <div className="border border-border rounded p-6 mt-6">
              <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Реквизиты</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">ООО «Вирадо»</p>
                </div>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">ОГРН:</span> 1106453006879</p>
                  <p><span className="text-muted-foreground">ИНН:</span> 6453113652 / КПП 645201001</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground mt-3">Адрес:</p>
                  <p>410005, Саратовская обл., г. Саратов,</p>
                  <p>ул. Большая Горная, д. 290</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground mt-3">Контакты:</p>
                  <p><span className="text-muted-foreground">Телефон:</span> 8 (8452) 477-477</p>
                  <p><span className="text-muted-foreground">Email:</span> virado@bk.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
