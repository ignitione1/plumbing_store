import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search } from 'lucide-react';

const navigation = [
  { name: 'Каталог', href: '/catalog' },
  { name: 'О магазине', href: '/about' },
  { name: 'Доставка и оплата', href: '/delivery' },
  { name: 'Где купить', href: '/contacts' },
  { name: 'Контакты', href: '/contacts' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

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
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className="search-input pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Phone */}
          <a 
            href="tel:+78452123456" 
            className="flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>8 (8452) 12-34-56</span>
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
            <input
              type="text"
              placeholder="Поиск по сайту"
              className="search-input w-full"
              autoFocus
            />
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
                href="tel:+78452123456" 
                className="flex items-center gap-2 px-3 text-foreground font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>8 (8452) 12-34-56</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
