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
        <h1 className="text-2xl font-medium text-foreground mb-6">О магазине «Сантехникъ»</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                Магазин «Сантехникъ» — это специализированный магазин сантехнической продукции 
                в Саратове. Мы работаем на рынке более 10 лет, предоставляя нашим клиентам 
                широкий выбор качественной продукции для систем водоснабжения и отопления.
              </p>

              <p className="mb-4 leading-relaxed">
                В нашем ассортименте представлены трубы и фитинги, запорная арматура, радиаторы, 
                водонагреватели, смесители, насосы и другое оборудование от ведущих производителей.
              </p>

              <p className="mb-4 leading-relaxed">
                Наши специалисты готовы помочь с подбором оптимального решения для любой задачи — 
                будь то ремонт квартиры или строительство частного дома. Мы гарантируем качество 
                всей продукции и предоставляем официальную гарантию от производителей.
              </p>

              <h2 className="text-lg font-medium text-foreground mt-8 mb-4">Наши преимущества</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Более 5000 наименований товаров в каталоге</li>
                <li>Только сертифицированная продукция</li>
                <li>Профессиональные консультации</li>
                <li>Гарантия на все товары</li>
                <li>Доставка по Саратову и области</li>
                <li>Гибкая система скидок для постоянных клиентов</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="border border-border rounded p-6">
              <h3 className="font-medium text-foreground mb-4 uppercase text-sm">Компания в цифрах</h3>
              <div className="space-y-4">
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">5000+</div>
                  <div className="text-sm text-muted-foreground">товаров в каталоге</div>
                </div>
                <div className="border-b border-border pb-4">
                  <div className="text-2xl font-medium text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">брендов</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-foreground">1500+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
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
