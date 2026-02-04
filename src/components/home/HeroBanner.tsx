import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Каталог товаров',
    subtitle: 'Широкий ассортимент сантехнической продукции',
    link: '/catalog',
    image: '/images/banners/каталог.png',
  },
  {
    id: 2,
    title: 'Качественная сантехника',
    subtitle: 'Трубы, фитинги и инженерное оборудование',
    link: '/catalog',
    image: '/images/banners/1769150396.png',
  },
  {
    id: 3,
    title: 'Профессиональные решения',
    subtitle: 'Для водоснабжения, отопления и канализации',
    link: '/catalog',
    image: '/images/banners/для водосн.png',
  },
  {
    id: 4,
    title: 'Широкий выбор',
    subtitle: 'Более 5000 наименований в каталоге',
    link: '/catalog',
    image: '/images/banners/более 5000.png',
  },
  {
    id: 5,
    title: 'Надежные поставщики',
    subtitle: 'Только сертифицированная продукция',
    link: '/catalog',
    image: '/images/banners/ассортимент.png',
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
    <section className="hidden md:block relative bg-background border-b border-border">
      <div className="container-main py-6">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              } transition-opacity duration-500`}
            >
              <div className="relative w-full h-[200px] md:h-[280px] rounded overflow-hidden bg-muted/30 flex">
                {/* Левая часть - текст с отступом для стрелок */}
                <div className="flex-1 flex flex-col justify-center pl-12 md:pl-16 pr-0 py-8 md:py-12 z-10 relative bg-white">
                  {/* Градиент справа для плавного перехода */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/99 to-transparent pointer-events-none" />
                  <div className="max-w-lg relative z-10">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-block px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold text-sm md:text-base transition-colors shadow-lg"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
                
                {/* Правая часть - изображение */}
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  {/* Градиент слева для плавного перехода */}
                  <div className="absolute inset-0 bg-gradient-to-l from-background/0 via-background/15 to-background/40 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows - размещены слева, не перекрывают текст благодаря отступу */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors z-20"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors z-20"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
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
