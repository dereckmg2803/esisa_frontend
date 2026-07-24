import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    // Navigation
    home: "Inicio",
    catalog: "Catálogo",
    categories: "Categorías",
    contact: "Contacto",
    cart: "Carrito",
    search: "Buscar productos...",
    
    // Hero
    heroTitle: "Libros y Artesanía Colombiana",
    heroSubtitle: "Descubre la magia del Caribe colombiano en cada pieza artesanal",
    heroButton: "Ver Catálogo",
    
    // Categories
    exploreCategories: "Explora Nuestras Categorías",
    viewAll: "Ver Todo",
    
    // Products
    featuredProducts: "Productos Destacados",
    allProducts: "Todos los Productos",
    viewProduct: "Ver Producto",
    addToCart: "Añadir al Carrito",
    buyNow: "Comprar Ahora",
    askWhatsApp: "Preguntar por WhatsApp",
    outOfStock: "Agotado",
    inStock: "Disponible",
    size: "Talla",
    color: "Color",
    quantity: "Cantidad",
    description: "Descripción",
    
    // Cart
    yourCart: "Tu Carrito",
    emptyCart: "Tu carrito está vacío",
    continueShopping: "Continuar Comprando",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Finalizar Compra",
    removeItem: "Eliminar",
    
    // Contact
    contactUs: "Contáctanos",
    leaveInfo: "Déjanos tu Información",
    name: "Nombre",
    email: "Correo Electrónico",
    phone: "Teléfono (Opcional)",
    message: "Mensaje",
    send: "Enviar",
    sendSuccess: "¡Mensaje enviado con éxito!",
    sendError: "Error al enviar el mensaje",
    
    // Footer
    aboutUs: "Sobre Nosotros",
    aboutText: "La tienda de Macondo trae la magia del Caribe colombiano a Australia. Cada producto cuenta una historia de arte, tradición y pasión por nuestra cultura.",
    quickLinks: "Enlaces Rápidos",
    followUs: "Síguenos",
    rights: "Todos los derechos reservados",
    
    // Misc
    new: "Nuevo",
    sale: "Oferta",
    featured: "Destacado",
    popular: "Popular",
    handmade: "Artesanal",
    classic: "Clásico",
    currency: "AUD",
    language: "Idioma",
  },
  en: {
    // Navigation
    home: "Home",
    catalog: "Catalog",
    categories: "Categories",
    contact: "Contact",
    cart: "Cart",
    search: "Search products...",
    
    // Hero
    heroTitle: "Colombian Books & Crafts",
    heroSubtitle: "Discover the magic of the Colombian Caribbean in every handcrafted piece",
    heroButton: "View Catalog",
    
    // Categories
    exploreCategories: "Explore Our Categories",
    viewAll: "View All",
    
    // Products
    featuredProducts: "Featured Products",
    allProducts: "All Products",
    viewProduct: "View Product",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    askWhatsApp: "Ask on WhatsApp",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    size: "Size",
    color: "Color",
    quantity: "Quantity",
    description: "Description",
    
    // Cart
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Checkout",
    removeItem: "Remove",
    
    // Contact
    contactUs: "Contact Us",
    leaveInfo: "Leave Your Information",
    name: "Name",
    email: "Email",
    phone: "Phone (Optional)",
    message: "Message",
    send: "Send",
    sendSuccess: "Message sent successfully!",
    sendError: "Error sending message",
    
    // Footer
    aboutUs: "About Us",
    aboutText: "La tienda de Macondo brings the magic of the Colombian Caribbean to Australia. Each product tells a story of art, tradition, and passion for our culture.",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    rights: "All rights reserved",
    
    // Misc
    new: "New",
    sale: "Sale",
    featured: "Featured",
    popular: "Popular",
    handmade: "Handmade",
    classic: "Classic",
    currency: "AUD",
    language: "Language",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('macondo-language');
    return saved || 'es';
  });

  useEffect(() => {
    localStorage.setItem('macondo-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const getProductName = (product) => {
    return language === 'es' ? product.name_es : product.name_en;
  };

  const getProductDescription = (product) => {
    return language === 'es' ? product.description_es : product.description_en;
  };

  const getCategoryName = (category) => {
    return language === 'es' ? category.name_es : category.name_en;
  };

  const getCategoryDescription = (category) => {
    return language === 'es' ? category.description_es : category.description_en;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t,
      getProductName,
      getProductDescription,
      getCategoryName,
      getCategoryDescription
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
