import { useState, FormEvent, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search, Package, Folder, Layers } from 'lucide-react';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';

const navigation = [
  { name: 'Каталог', href: '/catalog' },
  { name: 'О магазине', href: '/about' },
  { name: 'Доставка и оплата', href: '/delivery' },
  { name: 'Контакты', href: '/contacts' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const suggestions = useSearchSuggestions(searchQuery, 7);

  // Закрываем подсказки при клике вне области поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSuggestions]);

  // Показываем подсказки при вводе
  useEffect(() => {
    setShowSuggestions(searchQuery.length >= 2 && suggestions.length > 0);
    setFocusedIndex(-1);
  }, [searchQuery, suggestions]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchQuery('');
      setSearchOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (url: string) => {
    navigate(url);
    setSearchQuery('');
    setSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
      }
    } else if (e.key === 'ArrowUp') {
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
      }
    } else if (e.key === 'Enter') {
      if (showSuggestions && suggestions.length > 0 && focusedIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[focusedIndex].url);
      }
      // Если Enter нажат без выбранной подсказки, форма обработает это через handleSearch
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'category':
        return <Folder className="h-4 w-4" />;
      case 'subcategory':
      case 'group':
        return <Layers className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 border-b border-border">
      <div className="container-main">
        {/* Top row: Logo, Search, Phone */}
        <div className="hidden lg:flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">С</span>
              </div>
              <div>
                <span className="text-2xl font-medium text-foreground tracking-tight">САНТЕХНИКЪ</span>
              </div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div ref={searchContainerRef} className="relative">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className="search-input pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(searchQuery.length >= 2 && suggestions.length > 0)}
                onKeyDown={handleKeyDown}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.type}-${suggestion.url}-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion.url)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-accent transition-colors ${
                        index === focusedIndex ? 'bg-accent' : ''
                      }`}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <div className="mt-0.5 text-muted-foreground flex-shrink-0">
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {suggestion.title}
                        </div>
                        {suggestion.subtitle && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {suggestion.subtitle}
                          </div>
                        )}
                        {suggestion.article && (
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">
                            {suggestion.article}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>

          {/* Phone */}
          <a 
            href="tel:+78452477477" 
            className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>8 (8452) 47-74-77</span>
          </a>
        </div>

        {/* Navigation row */}
        <nav className="hidden lg:block border-t border-border">
          <ul className="flex items-center gap-8 py-3">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile header */}
        <div className="flex lg:hidden items-center justify-between py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">С</span>
            </div>
            <span className="text-lg font-medium text-foreground">САНТЕХНИКЪ</span>
          </Link>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="lg:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className="search-input w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(searchQuery.length >= 2 && suggestions.length > 0)}
                onKeyDown={handleKeyDown}
                autoFocus
              />

              {/* Mobile suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`mobile-${suggestion.type}-${suggestion.url}-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion.url)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-accent transition-colors ${
                        index === focusedIndex ? 'bg-accent' : ''
                      }`}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <div className="mt-0.5 text-muted-foreground flex-shrink-0">
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {suggestion.title}
                        </div>
                        {suggestion.subtitle && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {suggestion.subtitle}
                          </div>
                        )}
                        {suggestion.article && (
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">
                            {suggestion.article}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border py-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`block py-2 px-3 rounded text-sm font-medium uppercase ${
                      location.pathname === item.href 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              <a 
                href="tel:+78452477477" 
                className="flex items-center gap-2 px-3 text-foreground font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>8 (8452) 47-74-77</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
