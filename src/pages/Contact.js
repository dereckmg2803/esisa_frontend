import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const message = language === 'es'
  ? 'Hola Glenia y Macondo 👋 Estuve viendo su página web y me gustaría conocer más sobre sus productos artesanales. ¿Podrían brindarme más información?'
  : 'Hello Glenia y Macondo 👋 I was browsing your website and I would love to learn more about your handmade products. Could you please provide me with more information?';

const whatsappLink = `https://wa.me/61424161743?text=${encodeURIComponent(message)}`;
const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success(t('sendSuccess'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('sendError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]" data-testid="contact-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D94E36] to-[#F4A261] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <span className="font-caveat text-2xl text-white/90">💌 {language === 'es' ? '¡Escríbenos!' : 'Write to us!'}</span>
          <h1 className="font-syne text-4xl md:text-5xl font-bold mt-2">
            {t('contactUs')}
          </h1>
          <p className="font-manrope text-white/90 mt-4 max-w-xl mx-auto">
            {language === 'es'
              ? '¿Tienes alguna pregunta o quieres hacer un pedido? Estamos aquí para ayudarte.'
              : 'Have a question or want to place an order? We\'re here to help.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="font-syne text-2xl font-bold text-[#006D77] mb-6">
              {t('leaveInfo')}
            </h2>

            {submitted ? (
              <div className="text-center py-12" data-testid="success-message">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-syne text-xl font-bold text-stone-800">
                  {language === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                </h3>
                <p className="font-manrope text-stone-600 mt-2">
                  {language === 'es'
                    ? 'Te responderemos lo antes posible.'
                    : 'We\'ll get back to you as soon as possible.'}
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="btn-teal mt-6"
                >
                  {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="font-manrope font-medium text-stone-700">
                    {t('name')} *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1.5 border-stone-300 focus:border-[#006D77] focus:ring-[#006D77]"
                    placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-manrope font-medium text-stone-700">
                    {t('email')} *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1.5 border-stone-300 focus:border-[#006D77] focus:ring-[#006D77]"
                    placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="font-manrope font-medium text-stone-700">
                    {t('phone')}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1.5 border-stone-300 focus:border-[#006D77] focus:ring-[#006D77]"
                    placeholder="+61 XXX XXX XXX"
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-manrope font-medium text-stone-700">
                    {t('message')} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1.5 border-stone-300 focus:border-[#006D77] focus:ring-[#006D77] resize-none"
                    placeholder={language === 'es'
                      ? '¿En qué podemos ayudarte? Cuéntanos sobre los productos que te interesan...'
                      : 'How can we help you? Tell us about the products you\'re interested in...'}
                    data-testid="input-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-caribbean py-6 text-lg"
                  data-testid="submit-btn"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {language === 'es' ? 'Enviando...' : 'Sending...'}
                    </span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('send')}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-syne text-2xl font-bold text-[#006D77] mb-6">
                {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006D77]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#006D77]" />
                  </div>
                  <div>
                    <h3 className="font-syne font-semibold text-stone-800">
                      {language === 'es' ? 'Ubicación' : 'Location'}
                    </h3>
                    <p className="font-manrope text-stone-600 mt-1">
                      Australia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006D77]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#006D77]" />
                  </div>
                  <div>
                    <h3 className="font-syne font-semibold text-stone-800">WhatsApp</h3>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-manrope text-[#D94E36] hover:underline mt-1 block"
                    >
                      +61 424 161 743
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl p-6 md:p-8 text-white">
              <h3 className="font-syne text-xl font-bold mb-3">
                {language === 'es' ? '¿Prefieres WhatsApp?' : 'Prefer WhatsApp?'}
              </h3>
              <p className="font-manrope text-white/90 mb-4">
                {language === 'es'
                  ? 'Escríbenos directamente y te responderemos al instante.'
                  : 'Write to us directly and we\'ll respond instantly.'}
              </p>
              <a
                href="https://wa.me/61424161743"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#25D366] font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                data-testid="whatsapp-contact-btn"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {language === 'es' ? 'Chatear Ahora' : 'Chat Now'}
              </a>
            </div>

            {/* Cultural Touch */}
            <div className="bg-[#E9C46A]/20 rounded-2xl p-6 border border-[#E9C46A]/30">
              <p className="font-caveat text-2xl text-[#D94E36] text-center">
                "¡Eche, escríbenos y hablamos!"
              </p>
              <p className="font-manrope text-sm text-stone-500 text-center mt-2">
                {language === 'es'
                  ? '- Así decimos en el Caribe colombiano'
                  : '- That\'s how we say it in the Colombian Caribbean'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
