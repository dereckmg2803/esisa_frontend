import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Instagram, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import CartSheet from './CartSheet';

// Logo del guacamayo
const LOGO_URL = "https://customer-assets.emergentagent.com/job_sisa-store/artifacts/mg58no54_image.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const cartCount = getCartCount();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/catalogo', label: t('catalog') },
    { to: '/contacto', label: t('contact') },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="glass sticky top-0 z-50 border-b border-[#E9C46A]/30 shadow-sm" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group" data-testid="logo-link">
            <img
              src="/logo.png"
              alt="Glenia y Macondo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="font-syne text-lg md:text-xl font-bold">
                <span className="text-[#006D77]">Glenia</span>
                <span className="text-[#D94E36]"> y </span>
                <span className="text-[#E9C46A]">Macondo</span>
              </span>
              <span className="font-caveat text-xs md:text-sm text-[#D94E36] -mt-1 hidden sm:block">
                Libros y artesanía colombiana
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-manrope text-sm font-medium transition-all hover:text-[#D94E36] relative ${isActive(link.to) ? 'text-[#D94E36]' : 'text-stone-700'
                  }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D94E36] to-[#E9C46A] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-stone-700 hover:text-[#006D77] hover:bg-[#006D77]/10 rounded-full px-3"
              data-testid="language-toggle"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </Button>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-700 hover:text-[#E1306C] transition-colors rounded-full hover:bg-pink-50"
              data-testid="instagram-link"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Cart */}
            <CartSheet>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 text-stone-700 hover:text-[#D94E36] hover:bg-[#D94E36]/10 rounded-full"
                data-testid="cart-button"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="cart-badge" data-testid="cart-count">
                    {cartCount}
                  </span>
                )}
              </Button>
            </CartSheet>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#E9C46A]/30" data-testid="mobile-nav">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-manrope text-sm font-medium transition-all ${isActive(link.to)
                      ? 'bg-gradient-to-r from-[#D94E36]/10 to-[#E9C46A]/10 text-[#D94E36] border-l-4 border-[#D94E36]'
                      : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  data-testid={`mobile-nav-link-${link.to.replace('/', '') || 'inicio'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile cultural touch */}
            <div className="mt-4 pt-4 border-t border-[#E9C46A]/20 text-center">
              <p className="font-caveat text-lg text-[#D94E36]">
                "¡Eche, bienvenido!"
              </p>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
