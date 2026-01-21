import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Трубы и фитинги',
    subtitle: 'Полипропилен, металлопластик, нержавеющая сталь',
    link: '/catalog?category=pipes',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Радиаторы отопления',
    subtitle: 'Биметаллические, алюминиевые, стальные',
    link: '/catalog?category=radiators',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Водонагреватели',
    subtitle: 'Накопительные и проточные',
    link: '/catalog?category=boilers',
    image: '/placeholder.svg',
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
    <section className="relative bg-secondary overflow-hidden">
      <div className="container-main">
        <div className="relative py-8 md:py-12 min-h-[320px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
              } transition-opacity duration-500`}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-4xl font-medium text-foreground mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="btn-primary inline-block"
                  >
                    Подробнее
                  </Link>
                </div>
                <div className="hidden lg:flex justify-end">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-64 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
