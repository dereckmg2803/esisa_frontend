import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('macondo-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('macondo-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, {
        ...product,
        quantity,
        selectedSize,
        selectedColor
      }];
    });
  };

  const removeFromCart = (productId, selectedSize = null, selectedColor = null) => {
    setItems(prev => prev.filter(
      item => !(item.id === productId && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor)
    ));
  };

  const updateQuantity = (productId, quantity, selectedSize = null, selectedColor = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setItems(prev => prev.map(item => {
      if (item.id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
