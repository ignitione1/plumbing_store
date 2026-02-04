import { useParams, Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumbs } from '@/components/catalog/Breadcrumbs';
import { ProductSpecs } from '@/components/catalog/ProductSpecs';
import { useCatalogProduct, useProductGroup } from '@/hooks/useCatalog';
import { getProductGroupImageUrl } from '@/lib/imageUtils';

export default function Product() {
  const { article } = useParams<{ article: string }>();
  const decodedArticle = article ? decodeURIComponent(article) : '';
  const product = useCatalogProduct(decodedArticle);

  if (!product) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="text-xl font-medium mb-4">Товар не найден</h1>
          <Link to="/catalog" className="text-primary hover:underline">
            Вернуться в каталог
          </Link>
        </div>
      </Layout>
    );
  }

  const group = useProductGroup(
    product.categorySlug,
    product.subcategorySlug,
    product.groupSlug
  );

  // Формируем название товара
  const productTitle = group
    ? `${group.groupName} ${product.article}`
    : `Товар ${product.article}`;

  const breadcrumbs = [
    { label: 'Главная', to: '/' },
    { label: 'Каталог', to: '/catalog' },
    {
      label: 'Категория',
      to: `/catalog/${product.categorySlug}`,
    },
    {
      label: 'Подкатегория',
      to: `/catalog/${product.categorySlug}/${product.subcategorySlug}`,
    },
    {
      label: group?.groupName || 'Группа',
      to: `/catalog/${product.categorySlug}/${product.subcategorySlug}/${product.groupSlug}`,
    },
    { label: product.article },
  ];

  return (
    <Layout>
      <Breadcrumbs items={breadcrumbs} />

      <div className="container-main py-6">
        {/* Product details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image placeholder */}
          <div className="bg-muted/30 rounded border border-border p-8 flex items-center justify-center min-h-[400px]">
            <img
              src={getProductGroupImageUrl(group?.imageUrl, product.article)}
              alt={productTitle}
              className="max-h-80 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'block';
              }}
            />
            <div className="text-center text-muted-foreground hidden">
              <p className="text-sm">Изображение</p>
              <p className="text-xs mt-2">Будет добавлено позже</p>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Артикул: {product.article}
            </p>
            <h1 className="text-2xl font-medium text-foreground mb-4">{productTitle}</h1>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="tel:+78452477477" className="btn-outline flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Заказать звонок
              </a>
            </div>

            {/* Description */}
            {group?.descriptionFull && (
              <div className="mb-6">
                <h2 className="font-medium text-foreground mb-2 uppercase text-sm">Описание</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {group.descriptionFull}
                </p>
              </div>
            )}

            {/* Specifications */}
            <ProductSpecs product={product} />
          </div>
        </div>

        {/* Link to group page */}
        {group && (
          <div className="border-t border-border pt-6">
            <Link
              to={`/catalog/${product.categorySlug}/${product.subcategorySlug}/${product.groupSlug}`}
              className="text-sm text-primary hover:underline"
            >
              ← Все варианты {group.groupName}
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
