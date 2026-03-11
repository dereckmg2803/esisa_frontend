import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronRight, Minus, Plus, Share2 } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();
  const { t, getProductName, getProductDescription, language } = useLanguage();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/products/${slug}`);
        setProduct(res.data);
        if (res.data.sizes?.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
        if (res.data.colors?.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error(language === 'es' ? 'Por favor selecciona una talla' : 'Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(
      language === 'es' 
        ? `${getProductName(product)} añadido al carrito` 
        : `${getProductName(product)} added to cart`
    );
  };

  const generateWhatsAppMessage = () => {
    const name = getProductName(product);
    let message = language === 'es'
      ? `¡Hola! Me interesa este producto:\n\n*${name}*\nPrecio: ${formatPrice(product.price)}`
      : `Hello! I'm interested in this product:\n\n*${name}*\nPrice: ${formatPrice(product.price)}`;
    
    if (selectedSize) message += `\n${t('size')}: ${selectedSize}`;
    if (selectedColor) message += `\n${t('color')}: ${selectedColor}`;
    message += `\n${t('quantity')}: ${quantity}`;
    message += language === 'es' ? '\n\n¿Podrían darme más información?' : '\n\nCould you give me more information?';
    
    return encodeURIComponent(message);
  };

  const whatsappLink = product ? `https://wa.me/573233094729?text=${generateWhatsAppMessage()}` : '#';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-syne text-2xl text-stone-800">
            {language === 'es' ? 'Producto no encontrado' : 'Product not found'}
          </h2>
          <Link to="/catalogo">
            <Button className="btn-caribbean mt-4">{t('continueShopping')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryNames = {
    ropa: { es: 'Ropa', en: 'Clothing' },
    accesorios: { es: 'Accesorios', en: 'Accessories' },
    bolsos: { es: 'Bolsos', en: 'Bags' },
    libros: { es: 'Libros', en: 'Books' }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="product-detail-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm font-manrope flex-wrap">
            <Link to="/" className="text-stone-500 hover:text-[#D94E36]">{t('home')}</Link>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <Link to="/catalogo" className="text-stone-500 hover:text-[#D94E36]">{t('catalog')}</Link>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <Link 
              to={`/catalogo?category=${product.category}`} 
              className="text-stone-500 hover:text-[#D94E36]"
            >
              {categoryNames[product.category]?.[language] || product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <span className="text-[#006D77] font-medium truncate max-w-[200px]">
              {getProductName(product)}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={getProductName(product)}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === index ? 'border-[#D94E36]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badge */}
            {product.badge && (
              <span className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${
                product.badge === 'Nuevo' ? 'badge-nuevo' :
                product.badge === 'Oferta' ? 'badge-oferta' :
                product.badge === 'Destacado' ? 'badge-destacado' :
                product.badge === 'Popular' ? 'badge-popular' :
                product.badge === 'Artesanal' ? 'badge-artesanal' :
                product.badge === 'Clásico' ? 'badge-clasico' : 'badge-nuevo'
              }`}>
                {product.badge}
              </span>
            )}

            {/* Title */}
            <h1 className="font-syne text-3xl md:text-4xl font-bold text-stone-800" data-testid="product-title">
              {getProductName(product)}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-syne text-3xl font-bold text-[#D94E36]" data-testid="product-price">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <span className="font-manrope text-xl text-stone-400 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
              {product.original_price && (
                <span className="px-2 py-1 bg-[#D94E36]/10 text-[#D94E36] text-sm font-semibold rounded">
                  {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-syne font-semibold text-stone-800 mb-2">{t('description')}</h3>
              <p className="font-manrope text-stone-600 leading-relaxed" data-testid="product-description">
                {getProductDescription(product)}
              </p>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-syne font-semibold text-stone-800 mb-3">{t('size')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-manrope font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#006D77] text-white'
                          : 'bg-white border border-stone-300 text-stone-700 hover:border-[#006D77]'
                      }`}
                      data-testid={`size-option-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-syne font-semibold text-stone-800 mb-3">{t('color')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg font-manrope font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-[#006D77] text-white'
                          : 'bg-white border border-stone-300 text-stone-700 hover:border-[#006D77]'
                      }`}
                      data-testid={`color-option-${color}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-syne font-semibold text-stone-800 mb-3">{t('quantity')}</h3>
              <div className="flex items-center gap-4 bg-white border border-stone-300 rounded-lg p-2 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                  data-testid="decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-manrope font-semibold text-lg w-8 text-center" data-testid="quantity-value">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                  data-testid="increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#006D77] hover:bg-[#005a63] text-white font-manrope text-lg py-6"
                data-testid="add-to-cart-btn"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('addToCart')}
              </Button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-caribbean w-full text-center flex items-center justify-center gap-2 py-4"
                data-testid="whatsapp-btn"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('askWhatsApp')}
              </a>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Guardar' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  className="border-stone-300 text-stone-600 hover:bg-stone-100"
                  onClick={() => {
                    navigator.share?.({
                      title: getProductName(product),
                      url: window.location.href
                    }).catch(() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success(language === 'es' ? 'Enlace copiado' : 'Link copied');
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 pt-4 border-t border-stone-200">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-manrope text-sm text-stone-600">
                {product.in_stock ? t('inStock') : t('outOfStock')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
