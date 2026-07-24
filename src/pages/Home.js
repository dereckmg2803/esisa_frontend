import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { MessageCircle } from "lucide-react";
import { getCategories, getFeaturedProducts } from '../data/catalog';

const Home = () => {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();
  const { t, getCategoryName, getCategoryDescription, language } = useLanguage();

  const message = language === 'es'
    ? 'Hola La tienda de Macondo. Estuve viendo su página web y me gustaría conocer más sobre sus productos artesanales. ¿Podrían brindarme más información?'
    : 'Hello La tienda de Macondo. I was browsing your website and I would love to learn more about your handmade products. Could you please provide me with more information?';

  const whatsappLink = `https://wa.me/61424161743?text=${encodeURIComponent(message)}`;

  const expressions = ['¡Eche!', '¡Apué!', '¡Añoñi!', '¡Sisa!'];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat"
        }}
      >

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6E3]/90 via-[#FDF6E3]/70 to-transparent" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left max-w-xl">
              {/* no CONTENT
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-[#006D77] text-sm font-medium mb-6 shadow-md">
                <Sparkles className="w-4 h-4 text-[#E9C46A]" />
                {language === 'es'
                  ? 'Artesanía desde Colombia a Australia'
                  : 'Crafts from Colombia to Australia'}
              </span>
 */}
              {/* Logo + brand */}
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
                <img
                  src="/logo.png"
                  alt="La tienda de Macondo Logo"
                  className="w-20 md:w-24 drop-shadow-lg"
                />

                <h1 className="font-syne text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  <span className="text-[#006D77]">La tienda de </span>
                  <span className="text-[#E9C46A]">Macondo</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="font-caveat text-2xl md:text-3xl text-[#D94E36] mb-4">
                {t('heroTitle')}
              </p>

              <p className="text-stone-700 text-lg mb-8 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">

                <Link to="/catalogo">
                  <Button className="bg-[#F4A261] hover:bg-[#E76F51] text-white px-8 py-6 rounded-full text-lg shadow-lg">
                    {language === 'es'
                      ? 'Apué, Explora el Catálogo'
                      : 'Explore Catalog'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-6 rounded-full text-lg shadow-lg flex items-center gap-2">
                    <MessageCircle size={22} />
                    WhatsApp
                  </Button>
                </a>

              </div>

            </div>

          </div>
        </div>

        {/* Fade */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
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
                  ? 'La tienda de Macondo nace del amor por la cultura colombiana y el deseo de compartirla con la comunidad latina en Australia. Cada producto es una pieza de arte que cuenta la historia de nuestras raíces: los colores vibrantes del Carnaval de Barranquilla, los patrones ancestrales de las mochilas wayuu, y la magia literaria de Gabriel García Márquez.'
                  : 'La tienda de Macondo was born from the love for Colombian culture and the desire to share it with the Latin community in Australia. Each product is a piece of art that tells the story of our roots: the vibrant colors of the Barranquilla Carnival, the ancestral patterns of wayuu bags, and the literary magic of Gabriel García Márquez.'}
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
