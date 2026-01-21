import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contacts = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container-main">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь 
            с выбором сантехники и ответить на ваши вопросы.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="section-title mb-8">Наши контакты</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <a 
                      href="tel:+78452123456" 
                      className="text-lg text-primary hover:underline"
                    >
                      +7 (8452) 12-34-56
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Звоните в рабочее время
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a 
                      href="mailto:info@santehnik-saratov.ru" 
                      className="text-lg text-primary hover:underline"
                    >
                      info@santehnik-saratov.ru
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ответим в течение рабочего дня
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адрес магазина</h3>
                    <p className="text-lg">г. Саратов, ул. Большая Горная</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Удобная парковка для клиентов
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-lg border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Режим работы</h3>
                    <div className="space-y-1">
                      <p>Понедельник — Пятница: 9:00 — 18:00</p>
                      <p>Суббота: 10:00 — 15:00</p>
                      <p className="text-muted-foreground">Воскресенье: выходной</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="section-title mb-8">Напишите нам</h2>
              
              <form className="bg-card rounded-lg border border-border p-6 md:p-8">
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Иванов" 
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (___) ___-__-__" 
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@mail.ru" 
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Опишите ваш вопрос или запрос..." 
                      rows={5}
                      className="mt-1.5"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-accent" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить сообщение
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12">
            <h2 className="section-title mb-6">Как нас найти</h2>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Карта будет отображена здесь</p>
                <p className="text-sm">г. Саратов, ул. Большая Горная</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
