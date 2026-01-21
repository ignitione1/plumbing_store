import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Каталог товаров',
    subtitle: 'Широкий ассортимент сантехнической продукции',
    link: '/catalog',
    image: '/images/banners/3.png',
  },
  {
    id: 2,
    title: 'Качественная сантехника',
    subtitle: 'Трубы, фитинги и инженерное оборудование',
    link: '/catalog',
    image: '/images/banners/3321png.png',
  },
  {
    id: 3,
    title: 'Профессиональные решения',
    subtitle: 'Для водоснабжения, отопления и канализации',
    link: '/catalog',
    image: '/images/banners/32221png.png',
  },
  {
    id: 4,
    title: 'Широкий выбор',
    subtitle: 'Более 5000 наименований в каталоге',
    link: '/catalog',
    image: '/images/banners/321png.png',
  },
  {
    id: 5,
    title: 'Надежные поставщики',
    subtitle: 'Только сертифицированная продукция',
    link: '/catalog',
    image: '/images/banners/32.png',
  },
];

export function HeroBanner() {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative bg-background border-b border-border">
      <div className="container-main py-6">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              } transition-opacity duration-500`}
            >
              <div className="relative w-full h-[240px] md:h-[320px] rounded overflow-hidden bg-muted/30">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end">
                  <div className="w-full px-6 md:px-8 pb-20 md:pb-24">
                    <div className="max-w-xl">
                      <h2 className="text-xl md:text-2xl font-medium mb-2 text-white leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-base text-white/90">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={slide.link}
                    className="absolute bottom-6 md:bottom-8 left-6 md:left-8 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded font-medium text-sm md:text-base transition-colors shadow-lg z-10"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/3 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-10"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/3 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-10"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-border'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
