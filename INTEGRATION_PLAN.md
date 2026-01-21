# План интеграции каталога товаров

## Анализ структуры valtec.ru

### Иерархия навигации
```
Каталог → Системы полипропиленовых трубопроводов → Полипропиленовые трубы → Конкретный товар
```

### Страница категории
- Заголовок категории
- Краткое описание применения
- Список товаров: название, артикул, ключевые параметры (диаметр, размеры)
- Фильтры/сортировка (для MVP можно упростить)

### Страница товара
- Полное название + артикул
- Описание применения и характеристик
- Таблица вариантов (размеры, модификации)
- Технические характеристики
- Документы (паспорта, сертификаты) — опционально для MVP
- Хлебные крошки

## Соответствие данных из catalog/ структуре valtec

### Текущая структура JSON файлов
```
name (категория верхнего уровня)
└── subcategories[] (подкатегория)
    └── productGroups[] (группа товаров = "тип товара")
        ├── commonSpecs (общие характеристики группы)
        ├── items[] (конкретные варианты)
        ├── description_short
        ├── description_full
        ├── seo_slug
        ├── seo_title
        └── seo_meta_description
```

### Соответствие
- `name` → Категория верхнего уровня (как "Системы полипропиленовых трубопроводов")
- `subcategories[].name` → Подкатегория (как "Полипропиленовые трубы")
- `productGroups[].groupName` → Группа/тип товара (как "Трубы однораструбные Ø110")
- `productGroups[].items[]` → Варианты товара (разные размеры/модификации)

## Ограничения для MVP

✅ **Нужно:**
- Иерархическая структура каталога (как у valtec)
- Страницы категорий, подкатегорий, групп товаров
- Страницы товаров с характеристиками
- Хлебные крошки
- SEO-поля (slug, title, description)

❌ **Не нужно (пока):**
- Цены (убрать из UI)
- Наличие товаров (убрать бейджи "В наличии")
- Изображения (можно placeholder или скрыть)
- Фильтры/сортировка (можно добавить позже)
- Старые тестовые товары (удалить)

## Структура роутинга

```
/ → Главная
/catalog → Список всех категорий
/catalog/:categorySlug → Страница категории
/catalog/:categorySlug/:subcategorySlug → Страница подкатегории
/catalog/:categorySlug/:subcategorySlug/:groupSlug → Страница группы товаров
/product/:article → Страница товара (по артикулу)
```

### Примеры URL
- `/catalog/sistemy-vnutrenney-kanalizacii`
- `/catalog/sistemy-vnutrenney-kanalizacii/truby-i-fitingi-iz-polipropilena-sinikon-standart`
- `/catalog/sistemy-vnutrenney-kanalizacii/truby-i-fitingi-iz-polipropilena-sinikon-standart/truby-odnorastrubnye-o110`
- `/product/500081`

## План трансформации данных

### 1. Создание маппинга категорий

**Файл:** `src/lib/catalogMapper.ts`

Функции:
- `generateCategorySlug(name: string)` → slug для категории
- `generateSubcategorySlug(name: string)` → slug для подкатегории
- `generateGroupSlug(groupName: string)` → slug для группы
- `normalizeCatalogData()` → загрузка и нормализация всех JSON из `catalog/`

### 2. Генерация ID для товаров

- Использовать `article` как основной идентификатор
- Для URL: `/product/:article`
- Создать функцию `getProductById(article: string)`

### 3. Объединение характеристик

На странице товара:
- Показать `commonSpecs` из группы
- Добавить характеристики конкретного `item`
- Объединить в единый объект `specs`

### 4. SEO оптимизация

- Использовать `seo_slug` для URL
- `seo_title` для `<title>`
- `seo_meta_description` для `<meta name="description">`

## Структура компонентов

### Pages
```
pages/
  Catalog.tsx → Список всех категорий
  Category.tsx → Страница категории/подкатегории
  ProductGroup.tsx → Страница группы товаров (таблица вариантов)
  Product.tsx → Страница конкретного товара
```

### Components
```
components/
  catalog/
    CategoryList.tsx → Список категорий
    CategoryCard.tsx → Карточка категории
    SubcategoryList.tsx → Список подкатегорий
    ProductGroupCard.tsx → Карточка группы товаров
    ProductTable.tsx → Таблица товаров в группе
    ProductSpecs.tsx → Характеристики товара
    Breadcrumbs.tsx → Хлебные крошки
```

### Hooks
```
hooks/
  useCatalog.ts → Загрузка всех категорий
  useCategory.ts → Получение категории по slug
  useSubcategory.ts → Получение подкатегории
  useProductGroup.ts → Получение группы товаров
  useProduct.ts → Получение товара по артикулу
```

## Пошаговый план реализации

### Этап 1: Подготовка данных
- [ ] Создать `src/lib/catalogMapper.ts` для трансформации данных
- [ ] Создать функции генерации slug из названий
- [ ] Загрузить все JSON из `catalog/` и нормализовать
- [ ] Создать типы TypeScript для новой структуры

### Этап 2: Обновление типов
- [ ] Создать интерфейсы:
  - `CatalogCategory`
  - `CatalogSubcategory`
  - `ProductGroup`
  - `CatalogProduct`
- [ ] Обновить существующие типы при необходимости

### Этап 3: Создание хуков
- [ ] `useCatalog()` → все категории
- [ ] `useCategory(slug)` → категория по slug
- [ ] `useSubcategory(categorySlug, subcategorySlug)` → подкатегория
- [ ] `useProductGroup(categorySlug, subcategorySlug, groupSlug)` → группа
- [ ] `useProduct(article)` → товар по артикулу

### Этап 4: Обновление роутинга
- [ ] Добавить маршруты в `App.tsx`:
  - `/catalog`
  - `/catalog/:categorySlug`
  - `/catalog/:categorySlug/:subcategorySlug`
  - `/catalog/:categorySlug/:subcategorySlug/:groupSlug`
  - `/product/:article`
- [ ] Обновить существующие маршруты

### Этап 5: Создание компонентов
- [ ] `Breadcrumbs.tsx` → хлебные крошки
- [ ] `CategoryList.tsx` → список категорий
- [ ] `CategoryCard.tsx` → карточка категории
- [ ] `SubcategoryList.tsx` → список подкатегорий
- [ ] `ProductGroupCard.tsx` → карточка группы
- [ ] `ProductTable.tsx` → таблица товаров
- [ ] `ProductSpecs.tsx` → характеристики товара

### Этап 6: Создание страниц
- [ ] `pages/Catalog.tsx` → список всех категорий
- [ ] `pages/Category.tsx` → страница категории/подкатегории
- [ ] `pages/ProductGroup.tsx` → страница группы товаров
- [ ] Обновить `pages/Product.tsx` → страница товара

### Этап 7: Обновление навигации
- [ ] Обновить `Header.tsx` → добавить ссылку на каталог
- [ ] Обновить `Footer.tsx` → обновить ссылки на категории
- [ ] Обновить `CatalogSection.tsx` на главной → использовать новые категории

### Этап 8: Очистка
- [ ] Удалить старые тестовые товары из `src/data/products.json`
- [ ] Удалить или обновить старые компоненты, если не используются
- [ ] Убрать поля цен из UI компонентов
- [ ] Убрать бейджи наличия товаров

### Этап 9: SEO
- [ ] Добавить мета-теги на страницы категорий
- [ ] Добавить мета-теги на страницы товаров
- [ ] Использовать `seo_title` и `seo_meta_description`

### Этап 10: Тестирование
- [ ] Проверить все маршруты
- [ ] Проверить хлебные крошки
- [ ] Проверить навигацию между страницами
- [ ] Проверить отображение данных

## Структура данных (пример)

### Нормализованная структура категории
```typescript
interface CatalogCategory {
  id: string; // slug
  name: string;
  slug: string;
  subcategories: CatalogSubcategory[];
}

interface CatalogSubcategory {
  id: string; // slug
  name: string;
  slug: string;
  categorySlug: string;
  productGroups: ProductGroup[];
}

interface ProductGroup {
  id: string; // slug
  groupName: string;
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  commonSpecs: Record<string, any>;
  items: CatalogProduct[];
  descriptionShort: string;
  descriptionFull: string;
  seoSlug: string;
  seoTitle: string;
  seoMetaDescription: string;
  imageUrl?: string;
}

interface CatalogProduct {
  article: string; // ID товара
  groupId: string;
  categorySlug: string;
  subcategorySlug: string;
  groupSlug: string;
  specs: Record<string, any>; // commonSpecs + item specs
  // все поля из item
}
```

## Примечания

- Все цены убрать из UI (пока не нужны)
- Изображения добавить позже (использовать placeholder)
- Наличие товаров не отображать (пока не подключена база)
- Старые тестовые товары удалить полностью
- Структура должна быть максимально похожа на valtec.ru

## Следующие шаги после MVP

- Добавить изображения товаров
- Подключить базу данных для цен и наличия
- Добавить фильтры и сортировку
- Добавить поиск по каталогу
- Добавить документы (PDF, паспорта, сертификаты)
- Добавить сравнение товаров
- Добавить избранное
