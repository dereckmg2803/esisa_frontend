import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

const CartSheet = ({ children }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { t, getProductName, language } = useLanguage();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(price);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items.map(item => {
      const name = getProductName(item);
      let details = `- ${name} x${item.quantity} (${formatPrice(item.price * item.quantity)})`;
      if (item.selectedSize) details += ` | Talla: ${item.selectedSize}`;
      if (item.selectedColor) details += ` | Color: ${item.selectedColor}`;
      return details;
    }).join('\n');

    const message = language === 'es' 
      ? `¡Hola! Me interesa comprar los siguientes productos:\n\n${itemsList}\n\nTotal: ${formatPrice(getCartTotal())}\n\n¿Podrían darme más información?`
      : `Hello! I'm interested in buying the following products:\n\n${itemsList}\n\nTotal: ${formatPrice(getCartTotal())}\n\nCould you give me more information?`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/573233094729?text=${generateWhatsAppMessage()}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-[#FDFBF7]" data-testid="cart-sheet">
        <SheetHeader>
          <SheetTitle className="font-syne text-2xl text-[#006D77] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            {t('yourCart')}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] gap-4" data-testid="empty-cart">
            <ShoppingBag className="w-16 h-16 text-stone-300" />
            <p className="font-manrope text-stone-500">{t('emptyCart')}</p>
            <SheetTrigger asChild>
              <Link to="/catalogo">
                <Button className="btn-caribbean" data-testid="continue-shopping-btn">
                  {t('continueShopping')}
                </Button>
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 h-[50vh] pr-4 mt-4">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex gap-4 p-3 bg-white rounded-xl shadow-sm"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.images[0]}
                      alt={getProductName(item)}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-syne font-semibold text-stone-800 truncate">
                        {getProductName(item)}
                      </h4>
                      <div className="text-xs text-stone-500 mt-1">
                        {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span> | </span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                      <p className="font-manrope font-bold text-[#D94E36] mt-1">
                        {formatPrice(item.price)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-stone-100 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors"
                            data-testid={`decrease-qty-${item.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-manrope text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors"
                            data-testid={`increase-qty-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-manrope text-stone-600">{t('subtotal')}</span>
                <span className="font-syne text-xl font-bold text-stone-800">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <div className="grid gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-caribbean text-center flex items-center justify-center gap-2"
                  data-testid="checkout-whatsapp-btn"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('checkout')} - WhatsApp
                </a>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-stone-300 text-stone-600 hover:bg-stone-100"
                  data-testid="clear-cart-btn"
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
