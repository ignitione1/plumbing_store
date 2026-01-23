/**
 * Словарь переводов английских ключей характеристик на русский язык
 */
export const specTranslations: Record<string, string> = {
  // Размеры и габариты
  tube_size_mm: 'Размер трубы, мм',
  tube_sizes_mm: 'Размеры труб, мм',
  length_mm: 'Длина, мм',
  length1_mm: 'Длина 1, мм',
  length2_mm: 'Длина 2, мм',
  length_range_mm: 'Диапазон длины, мм',
  length_m_options: 'Варианты длины, м',
  diameter_mm: 'Диаметр, мм',
  diameters_mm: 'Диаметры, мм',
  d1_mm: 'D1, мм',
  d2_mm: 'D2, мм',
  de_mm: 'Наружный диаметр (De), мм',
  inner_diameter_mm: 'Внутренний диаметр, мм',
  outer_diameter_mm: 'Наружный диаметр, мм',
  height_mm: 'Высота, мм',
  heights_mm: 'Высоты, мм',
  h1_mm: 'H1, мм',
  h2_mm: 'H2, мм',
  side_length_mm: 'Боковая длина, мм',
  wall_thickness_mm: 'Толщина стенки, мм',
  
  // Резьба и соединения
  thread: 'Резьба',
  sw_size: 'Размер под ключ',
  
  // Упаковка
  pack_qty: 'Количество в упаковке',
  pack_qty_box: 'Количество в коробке',
  pack_qty_pallet: 'Количество на паллете',
  
  // Вес
  weight_kg: 'Вес, кг',
  
  // Углы
  angle: 'Угол',
  angle_deg: 'Угол, град',
  
  // Цвет
  color: 'Цвет',
  seal_color: 'Цвет уплотнения',
  
  // Модель и вариант
  model: 'Модель',
  variant: 'Вариант',
  
  // Название
  name: 'Название',
  
  // Мощность
  power_w: 'Мощность, Вт',
  
  // Решетка
  grate_size_mm: 'Размер решетки, мм',
  grate_material: 'Материал решетки',
  
  // Тип
  type: 'Тип',
};

/**
 * Переводит ключ характеристики на русский язык
 * @param key - Английский ключ характеристики
 * @returns Русский перевод или форматированный ключ, если перевода нет
 */
export function translateSpecKey(key: string): string {
  // Если есть прямой перевод, возвращаем его
  if (specTranslations[key]) {
    return specTranslations[key];
  }
  
  // Если ключ содержит подчеркивания, пытаемся найти частичный перевод
  const parts = key.split('_');
  const translatedParts = parts.map(part => {
    // Проверяем, есть ли перевод для части ключа
    const fullKey = parts.join('_');
    if (specTranslations[fullKey]) {
      return specTranslations[fullKey];
    }
    return part;
  });
  
  // Если нашли хотя бы один перевод, возвращаем его
  if (translatedParts.some(part => specTranslations[part])) {
    return translatedParts
      .map(part => specTranslations[part] || part)
      .join(' ');
  }
  
  // Иначе форматируем ключ: заменяем подчеркивания на пробелы и делаем первую букву заглавной
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}
