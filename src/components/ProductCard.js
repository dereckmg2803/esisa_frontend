import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { toast } from 'sonner';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { t, getProductName, language } = useLanguage();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(price);
  };

  const getBadgeClass = (badge) => {
    const badgeMap = {
      'Nuevo': 'badge-nuevo',
      'Oferta': 'badge-oferta',
      'Destacado': 'badge-destacado',
      'Popular': 'badge-popular',
      'Artesanal': 'badge-artesanal',
      'Clásico': 'badge-clasico',
    };
    return badgeMap[badge] || 'badge-nuevo';
  };

  const getBadgeText = (badge) => {
    if (language === 'en') {
      const translations = {
        'Nuevo': 'New',
        'Oferta': 'Sale',
        'Destacado': 'Featured',
        'Popular': 'Popular',
        'Artesanal': 'Handmade',
        'Clásico': 'Classic',
      };
      return translations[badge] || badge;
    }
    return badge;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultSize = product.sizes?.[0] || null;
    const defaultColor = product.colors?.[0] || null;
    
    addToCart(product, 1, defaultSize, defaultColor);
    toast.success(
      language === 'es' 
        ? `${getProductName(product)} añadido al carrito` 
        : `${getProductName(product)} added to cart`
    );
  };

  return (
    <div 
      className={`product-card-artisan group animate-fade-in-up stagger-${(index % 4) + 1}`}
      data-testid={`product-card-${product.id}`}
    >
      <Link to={`/producto/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-[#FDF6E3]">
          <img
            src={product.images[0]}
            alt={getProductName(product)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-lg ${getBadgeClass(product.badge)}`}>
              {getBadgeText(product.badge)}
            </span>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <Button
              size="sm"
              className="bg-white text-stone-800 hover:bg-[#E9C46A] hover:text-stone-900 font-semibold shadow-xl"
              data-testid={`view-product-${product.id}`}
            >
              <Eye className="w-4 h-4 mr-1" />
              {t('viewProduct')}
            </Button>
          </div>
          
          {/* Decorative corner flower */}
          <div className="absolute bottom-2 right-2 text-2xl opacity-30 group-hover:opacity-60 transition-opacity">
            🌺
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-gradient-to-b from-white to-[#FFFBF5]">
          <h3 className="font-syne font-semibold text-stone-800 text-sm md:text-base line-clamp-2 min-h-[2.5rem] group-hover:text-[#006D77] transition-colors">
            {getProductName(product)}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-syne font-bold text-[#D94E36] text-lg">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="font-manrope text-xs text-stone-400 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full mt-3 bg-[#006D77] hover:bg-[#005a63] text-white font-manrope text-sm rounded-full shadow-md hover:shadow-lg transition-all"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t('addToCart')}
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
