import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useRef } from 'react';

const Contacts = () => {
  const placemarkRef = useRef<any>(null);
  const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY;

  useEffect(() => {
    // Открываем balloon автоматически при загрузке карты
    const timer = setTimeout(() => {
      if (placemarkRef.current) {
        const placemark = placemarkRef.current;
        try {
          // Пробуем разные способы открытия balloon
          if (placemark.balloon && placemark.balloon.open) {
            placemark.balloon.open();
          } else if (placemark.events) {
            // Триггерим событие click для открытия balloon
            placemark.events.fire('click');
          }
        } catch (error) {
          console.log('Balloon open error:', error);
        }
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

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
            <div className="border border-border rounded p-6 h-96">
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
                    <a href="mailto:Virado@bk.ru" className="text-foreground hover:text-primary transition-colors">
                      Virado@bk.ru
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
          </div>

          {/* Map */}
          <div>
            <div className="rounded border border-border h-96 overflow-hidden">
              <YMaps 
                query={{ 
                  apikey: apiKey,
                  load: 'package.full',
                  lang: 'ru_RU'
                }}
              >
                <Map
                  defaultState={{
                    center: [51.545130, 46.020494],
                    zoom: 16,
                  }}
                  width="100%"
                  height="100%"
                >
                  <Placemark
                    instanceRef={placemarkRef}
                    geometry={[51.545130, 46.020494]}
                    properties={{
                      balloonContentHeader: 'Магазин «СантехникЪ»',
                      balloonContentBody: `
                        <div style="padding: 8px 0;">
                          <div style="margin-bottom: 8px;"><strong>Адрес:</strong><br/>г. Саратов, ул. Большая Горная, 290</div>
                          <div style="margin-bottom: 8px;"><strong>Телефон:</strong><br/><a href="tel:+78452477477" style="color: #0066cc; text-decoration: none;">8 (8452) 47-74-77</a></div>
                          <div style="margin-bottom: 8px;"><strong>Email:</strong><br/><a href="mailto:Virado@bk.ru" style="color: #0066cc; text-decoration: none;">Virado@bk.ru</a></div>
                          <div><strong>Режим работы:</strong><br/>Ежедневно: 08:00 — 19:00</div>
                        </div>
                      `,
                    }}
                    options={{
                      preset: 'islands#blueIcon',
                      iconColor: '#0066cc',
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
