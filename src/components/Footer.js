import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Logo del guacamayo
const LOGO_URL = "https://customer-assets.emergentagent.com/job_sisa-store/artifacts/mg58no54_image.png";

const Footer = () => {
  const { t, language } = useLanguage();

  const message = language === 'es'
    ? 'Hola La tienda de Macondo. Estuve viendo su página web y me gustaría conocer más sobre sus productos artesanales. ¿Podrían brindarme más información?'
    : 'Hello La tienda de Macondo. I was browsing your website and I would love to learn more about your handmade products. Could you please provide me with more information?';

  const whatsappLink = `https://wa.me/61424161743?text=${encodeURIComponent(message)}`;

  return (
    <footer className="footer-pattern text-white" data-testid="footer">
      {/* Tropical top border */}
      <div className="h-2 bg-gradient-to-r from-[#D94E36] via-[#E9C46A] to-[#006D77]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <img
                src='/logo.png'
                alt="La tienda de Macondo"
                className="w-14 h-14 object-contain transition-transform group-hover:scale-110"
              />
              <div>
                <h3 className="font-syne text-2xl md:text-3xl font-bold text-white">
                  La tienda de Macondo
                </h3>
                <p className="font-caveat text-lg text-[#E9C46A]">
                  Libros y artesanía colombiana
                </p>
              </div>
            </Link>
            <p className="font-manrope text-sm text-white/85 leading-relaxed max-w-md">
              {t('aboutText')}
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/gleniamacondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E1306C] transition-all hover:scale-110"
                data-testid="footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Cultural expression */}
            <div className="mt-6 inline-block bg-white/10 px-4 py-2 rounded-xl">
              <p className="font-caveat text-xl text-[#E9C46A]">
                "¡Eche, gracias por visitarnos!"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne text-lg font-semibold mb-4 text-[#E9C46A] flex items-center gap-2">
              <span>🌺</span>
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo?category=ropa"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  Ropa
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo?category=bolsos"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  Bolsos
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo?category=libros"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  Libros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="font-manrope text-sm text-white/85 hover:text-white hover:pl-2 transition-all"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne text-lg font-semibold mb-4 text-[#E9C46A] flex items-center gap-2">
              <span>🦜</span>
              {t('contactUs')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/85">
                <div className="w-8 h-8 bg-[#E9C46A]/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#E9C46A]" />
                </div>
                <span className="font-manrope text-sm">Australia 🇦🇺</span>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/85 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#25D366]/20 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/40 transition-colors">
                    <Phone className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <span className="font-manrope text-sm">+61 424 161 743</span>
                </a>
              </li>
            </ul>

            {/* Colombian expressions card */}
            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/10">
              <p className="font-caveat text-lg text-[#E9C46A] text-center">
                "¡Apué, qué chimba de tienda!"
              </p>
              <p className="font-manrope text-xs text-white/60 text-center mt-1">
                - Expresión costeña colombiana
              </p>
            </div>
          </div>
        </div>

        {/* Colombian Flag Stripe */}
        <div className="mt-10 mb-8 flex h-3 rounded-full overflow-hidden shadow-lg">
          <div className="flex-[2] bg-[#FCD116]" />
          <div className="flex-1 bg-[#003893]" />
          <div className="flex-1 bg-[#CE1126]" />
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-manrope text-sm text-white/70">
              © {new Date().getFullYear()} La tienda de Macondo. {t('rights')}.
            </p>
            <p className="font-manrope text-sm text-white/70 flex items-center gap-2">
              Hecho con <Heart className="w-4 h-4 text-[#D94E36] fill-current animate-pulse" /> desde Colombia 🇨🇴
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
