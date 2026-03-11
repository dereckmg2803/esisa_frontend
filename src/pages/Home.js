import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo del guacamayo
const LOGO_URL = "https://customer-assets.emergentagent.com/job_sisa-store/artifacts/mg58no54_image.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, getCategoryName, getCategoryDescription, language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API}/categories`),
          axios.get(`${API}/featured-products`)
        ]);
        setCategories(catRes.data);
        setFeaturedProducts(prodRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const expressions = ['¡Eche!', '¡Apué!', '¡Añoñi!', '¡Sisa!'];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section with Tropical Design */}
      <section className="hero-section relative" data-testid="hero-section">
        {/* Background layers */}
        <div className="hero-bg" />
        <div className="hero-palms" />
        <div className="hero-flowers-left" />
        <div className="hero-flowers-right" />
        
        {/* Decorative floating expressions */}
        <div className="absolute top-24 left-8 md:left-16 animate-float z-10">
          <span className="font-caveat text-3xl md:text-4xl text-[#D94E36] drop-shadow-lg">¡Eche!</span>
        </div>
        <div className="absolute top-40 right-8 md:right-20 animate-float z-10" style={{ animationDelay: '1.5s' }}>
          <span className="font-caveat text-2xl md:text-3xl text-[#006D77] drop-shadow-lg">¡Sisa!</span>
        </div>
        <div className="absolute bottom-48 left-12 animate-float z-10 hidden md:block" style={{ animationDelay: '0.8s' }}>
          <span className="font-caveat text-2xl text-[#E9C46A] drop-shadow-lg">¡Apué!</span>
        </div>

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-36 z-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[#006D77] text-sm font-manrope font-medium mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#E9C46A]" />
                {language === 'es' ? 'Artesanía desde Colombia a Australia' : 'Crafts from Colombia to Australia'}
              </span>
              
              {/* Logo with brand name */}
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
                <img 
                  src={LOGO_URL} 
                  alt="Glenia y Macondo Logo" 
                  className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl animate-float"
                  style={{ animationDuration: '4s' }}
                />
                <div>
                  <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold">
                    <span className="text-[#006D77]">Glenia</span>
                    <span className="text-[#D94E36]"> y </span>
                    <span className="text-[#E9C46A] drop-shadow-md">Macondo</span>
                  </h1>
                </div>
              </div>
              
              <p className="font-caveat text-2xl md:text-3xl text-[#D94E36] mb-4">
                {t('heroTitle')}
              </p>
              
              <p className="font-manrope text-base md:text-lg text-stone-700 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/catalogo">
                  <Button className="btn-caribbean text-base md:text-lg px-6 md:px-8 py-5 md:py-6" data-testid="hero-cta-btn">
                    {language === 'es' ? 'Apué, Explora el Catálogo' : 'Explore Catalog'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/573233094729"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full shadow-lg" data-testid="hero-whatsapp-btn">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {language === 'es' ? 'Compra por WhatsApp' : 'Buy on WhatsApp'}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right side - Featured product showcase (hidden on mobile) */}
            <div className="hidden lg:block relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative frame */}
                <div className="absolute inset-0 border-4 border-dashed border-[#E9C46A]/50 rounded-3xl transform rotate-3" />
                <div className="absolute inset-0 border-4 border-dashed border-[#D94E36]/30 rounded-3xl transform -rotate-2" />
                
                {/* Product image placeholder - could be replaced with actual featured product */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
                      alt="Artesanía Colombiana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-xl text-[#D94E36] text-center">
                    "Cada pieza cuenta una historia"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDF6E3] to-transparent" />
      </section>

      {/* Tropical Divider */}
      <div className="tropical-divider bg-[#FDF6E3]">
        <div className="tropical-divider-content">
          <span className="animate-sway">🌺</span>
          <span className="animate-flutter" style={{ animationDelay: '0.5s' }}>🦜</span>
          <span className="animate-sway" style={{ animationDelay: '1s' }}>🌴</span>
          <span className="animate-flutter" style={{ animationDelay: '1.5s' }}>🌸</span>
          <span className="animate-sway" style={{ animationDelay: '2s' }}>🌻</span>
          <span className="animate-flutter" style={{ animationDelay: '2.5s' }}>🦋</span>
          <span className="animate-sway" style={{ animationDelay: '3s' }}>🌺</span>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 md:py-20 artisan-bg vueltiao-pattern" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-3xl animate-flutter">🌺</span>
              <span className="font-caveat text-2xl text-[#D94E36]">
                {language === 'es' ? 'Descubre' : 'Discover'}
              </span>
              <span className="text-3xl animate-flutter" style={{ animationDelay: '0.5s' }}>🌺</span>
            </div>
            <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold text-[#006D77]">
              {t('exploreCategories')}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/catalogo?category=${category.slug}`}
                  className={`category-card aspect-[3/4] animate-fade-in-up stagger-${index + 1}`}
                  data-testid={`category-card-${category.slug}`}
                >
                  <img
                    src={category.image}
                    alt={getCategoryName(category)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="font-syne text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                      {getCategoryName(category)}
                    </h3>
                    <p className="font-manrope text-sm text-white/90 mt-1 line-clamp-2">
                      {getCategoryDescription(category)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Colombian Flag Wave Divider */}
      <div className="colombia-wave" />

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-[#FFFBF5]" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🦜</span>
                <span className="font-caveat text-xl text-[#D94E36]">
                  {language === 'es' ? 'Lo Mejor de Colombia' : 'Best of Colombia'}
                </span>
              </div>
              <h2 className="font-syne text-3xl md:text-4xl font-bold text-[#006D77]">
                {t('featuredProducts')}
              </h2>
            </div>
            <Link to="/catalogo">
              <Button className="btn-teal" data-testid="view-all-products-btn">
                {t('viewAll')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cultural Expressions Banner */}
      <section className="expressions-banner py-8 md:py-12" data-testid="cultural-banner">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {expressions.map((expr, index) => (
              <span 
                key={index} 
                className={`font-caveat text-3xl md:text-5xl text-white drop-shadow-lg animate-float`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {expr}
              </span>
            ))}
          </div>
          <p className="font-manrope text-white/95 mt-6 text-base md:text-lg">
            {language === 'es' 
              ? 'Expresiones del Caribe colombiano que llenan de alegría cada día'
              : 'Colombian Caribbean expressions that fill every day with joy'}
          </p>
        </div>
      </section>

      {/* Tropical Divider */}
      <div className="tropical-divider">
        <div className="tropical-divider-content">
          <span className="animate-flutter">🌴</span>
          <span className="animate-sway">🌸</span>
          <span className="animate-flutter">🦋</span>
          <span className="animate-sway">🌻</span>
          <span className="animate-flutter">🌴</span>
        </div>
      </div>

      {/* About Section with Artisan Feel */}
      <section className="py-16 md:py-24 artisan-bg" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🦜</span>
                <span className="font-caveat text-xl text-[#D94E36]">
                  {language === 'es' ? 'Nuestra Historia' : 'Our Story'}
                </span>
              </div>
              <h2 className="font-syne text-3xl md:text-4xl font-bold text-[#006D77] mb-6">
                {language === 'es' ? 'Arte y Cultura del Caribe' : 'Caribbean Art & Culture'}
              </h2>
              <p className="font-manrope text-stone-700 leading-relaxed mb-4">
                {language === 'es'
                  ? 'Glenia y Macondo nace del amor por la cultura colombiana y el deseo de compartirla con la comunidad latina en Australia. Cada producto es una pieza de arte que cuenta la historia de nuestras raíces: los colores vibrantes del Carnaval de Barranquilla, los patrones ancestrales de las mochilas wayuu, y la magia literaria de Gabriel García Márquez.'
                  : 'Glenia y Macondo was born from the love for Colombian culture and the desire to share it with the Latin community in Australia. Each product is a piece of art that tells the story of our roots: the vibrant colors of the Barranquilla Carnival, the ancestral patterns of wayuu bags, and the literary magic of Gabriel García Márquez.'}
              </p>
              <p className="font-manrope text-stone-700 leading-relaxed mb-6">
                {language === 'es'
                  ? 'Trabajamos directamente con artesanos colombianos para traerte piezas únicas y auténticas que celebran nuestra herencia cultural.'
                  : 'We work directly with Colombian artisans to bring you unique and authentic pieces that celebrate our cultural heritage.'}
              </p>
              <Link to="/catalogo">
                <Button className="btn-caribbean" data-testid="explore-catalog-btn">
                  {language === 'es' ? 'Explorar Catálogo' : 'Explore Catalog'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              {/* Decorative frame around image */}
              <div className="absolute -inset-4 border-4 border-dashed border-[#E9C46A]/40 rounded-3xl transform rotate-2" />
              <div className="absolute -inset-2 border-4 border-dashed border-[#D94E36]/30 rounded-3xl transform -rotate-1" />
              
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
                  alt="Colombian Crafts"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with cultural quote */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating quote */}
              <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-4 md:p-5 rounded-xl shadow-xl border-l-4 border-[#D94E36]">
                <p className="font-caveat text-xl md:text-2xl text-[#D94E36]">"¡Apué, qué belleza!"</p>
                <p className="font-manrope text-xs text-stone-500 mt-1">- Expresión costeña</p>
              </div>
              
              {/* Decorative flowers */}
              <div className="absolute -top-4 -right-4 text-4xl animate-flutter">🌺</div>
              <div className="absolute top-1/2 -right-8 text-3xl animate-sway hidden md:block">🌸</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
