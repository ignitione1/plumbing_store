import { Link } from 'react-router-dom';
import { Droplets, Gauge, Thermometer, Flame, Waves, Cog } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  productCount?: number;
}

const iconMap: Record<string, React.ElementType> = {
  pipe: Droplets,
  valve: Gauge,
  radiator: Thermometer,
  boiler: Flame,
  mixer: Waves,
  pump: Cog,
};

export function CategoryCard({ id, name, icon }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Droplets;

  return (
    <Link
      to={`/catalog?category=${id}`}
      className="category-card flex flex-col items-center"
    >
      <div className="w-full aspect-square flex items-center justify-center bg-muted/50 rounded mb-3">
        <IconComponent className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
      </div>
      <h3 className="category-card-title">{name}</h3>
    </Link>
  );
}
