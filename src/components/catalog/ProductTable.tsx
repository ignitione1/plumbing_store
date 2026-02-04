import { Link } from 'react-router-dom';
import type { CatalogProduct } from '@/types/catalog';
import { translateSpecKey } from '@/lib/specTranslations';

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
          key !== 'subcategorySlug' && key !== 'groupSlug' && key !== 'specs' &&
          key !== 'image_url' && key !== 'imageUrl') {
        allKeys.add(key);
      }
    });
  });

  const displayKeys = Array.from(allKeys).filter(key => {
    // Исключаем служебные поля
    if (key === 'image_url' || key === 'imageUrl') {
      return false;
    }
    const value = products[0][key];
    return value !== null && value !== undefined && typeof value !== 'object';
  });

  // Сортируем товары по артикулу по алфавиту
  const sortedProducts = [...products].sort((a, b) => 
    a.article.localeCompare(b.article, 'ru', { numeric: true })
  );

  // Проверяем, есть ли артикулы с * или **
  const hasStarNotation = sortedProducts.some(product => 
    product.article.includes('*')
  );

  // Проверяем, есть ли товары с * и wall_thickness_mm (усиленные фитинги)
  const hasReinforcedFittings = sortedProducts.some(product => 
    product.article.includes('*') && product.wall_thickness_mm
  );

  // Определяем текст сноски
  const footnoteText = hasReinforcedFittings
    ? '* - усиленные фитинги с толщиной стенки 3.4 мм'
    : hasStarNotation
    ? 'Обозначения: * - левая, ** - правая'
    : null;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-center py-3 px-4 font-medium text-foreground">Артикул</th>
              {displayKeys.map((key) => (
                <th key={key} className="text-center py-3 px-4 font-medium text-foreground">
                  {translateSpecKey(key)}
                </th>
              ))}
              <th className="text-center py-3 px-4 font-medium text-foreground">Действие</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.article} className="border-b border-border hover:bg-muted/30">
                <td className="text-center py-3 px-4">
                  <Link
                    to={`/product/${encodeURIComponent(product.article)}`}
                    className="text-primary hover:underline font-mono text-sm"
                  >
                    {product.article}
                  </Link>
                </td>
                {displayKeys.map((key) => (
                  <td key={key} className="text-center py-3 px-4 text-sm text-foreground">
                    {Array.isArray(product[key])
                      ? product[key].join(', ')
                      : String(product[key] ?? '-')}
                  </td>
                ))}
                <td className="text-center py-3 px-4">
                  <Link
                    to={`/product/${encodeURIComponent(product.article)}`}
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
      {footnoteText && (
        <div className="mt-4 text-sm text-muted-foreground">
          <p>{footnoteText}</p>
        </div>
      )}
    </div>
  );
}
