import { Link } from 'react-router-dom';
import type { CatalogProduct } from '@/types/catalog';

interface ProductTableProps {
  products: CatalogProduct[];
  categorySlug: string;
}

export function ProductTable({ products, categorySlug }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 border border-border rounded">
        <p className="text-muted-foreground">Товары не найдены</p>
      </div>
    );
  }

  // Получаем все уникальные ключи характеристик для заголовков таблицы
  const allKeys = new Set<string>();
  products.forEach((product) => {
    Object.keys(product).forEach((key) => {
      if (key !== 'article' && key !== 'groupId' && key !== 'categorySlug' && 
          key !== 'subcategorySlug' && key !== 'groupSlug' && key !== 'specs') {
        allKeys.add(key);
      }
    });
  });

  const displayKeys = Array.from(allKeys).filter(key => {
    const value = products[0][key];
    return value !== null && value !== undefined && typeof value !== 'object';
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-foreground">Артикул</th>
            {displayKeys.map((key) => (
              <th key={key} className="text-left py-3 px-4 font-medium text-foreground">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </th>
            ))}
            <th className="text-left py-3 px-4 font-medium text-foreground">Действие</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.article} className="border-b border-border hover:bg-muted/30">
              <td className="py-3 px-4">
                <Link
                  to={`/product/${product.article}`}
                  className="text-primary hover:underline font-mono text-sm"
                >
                  {product.article}
                </Link>
              </td>
              {displayKeys.map((key) => (
                <td key={key} className="py-3 px-4 text-sm text-foreground">
                  {Array.isArray(product[key])
                    ? product[key].join(', ')
                    : String(product[key] ?? '-')}
                </td>
              ))}
              <td className="py-3 px-4">
                <Link
                  to={`/product/${product.article}`}
                  className="text-sm text-primary hover:underline"
                >
                  Подробнее
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
