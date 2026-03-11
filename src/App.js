import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="App min-h-screen flex flex-col bg-[#FDFBF7]">
          <BrowserRouter>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
                <Route path="/contacto" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </BrowserRouter>
          <Toaster 
            position="top-center" 
            richColors 
            toastOptions={{
              style: {
                fontFamily: 'Manrope, sans-serif',
              },
            }}
          />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
