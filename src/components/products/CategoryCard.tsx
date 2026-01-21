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

export function CategoryCard({ id, name, icon, productCount }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Droplets;

  return (
    <Link
      to={`/catalog?category=${id}`}
      className="group bg-card rounded-lg border border-border p-6 card-hover flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      {productCount !== undefined && (
        <p className="text-sm text-muted-foreground">
          {productCount} товаров
        </p>
      )}
    </Link>
  );
}
