import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import { imageCache } from "./components/ui/ImageCache";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BottomNavigation from "./components/layout/BottomNavigation";

// ✅ استيراد الصفحات بشكل مباشر (بدون lazy)
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import DeliveryPage from "./pages/DeliveryPage";
import OccasionsPage from "./pages/OccasionsPage";
import BrandsPage from "./pages/BrandsPage";
import SpecialGiftsPage from "./pages/SpecialGiftsPage";
import NotificationsPage from "./pages/NotificationsPage";
import FavoritesPage from "./pages/FavoritesPage";
import PackagesPage from "./pages/PackagesPage";
import NotFoundPage from "./pages/NotFoundPage";
import GiftAssistantPage from "./pages/GiftAssistantPage";

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    return () => {
      imageCache.clearCache();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // ✅ غيّر behavior لتجربة أفضل
  }, [location.pathname]);

  return (
    <ToastProvider>
      <FavoritesProvider>
        <CartProvider>
          <div
            className={`min-h-screen flex flex-col ${
              i18n.language === "ar" ? "font-sans-ar" : "font-sans-en"
            } overflow-x-hidden`}
          >
            <Header />
            <main className="flex-grow pb-16 md:pb-0">
              {/* ✅ حذف Suspense */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/occasions" element={<OccasionsPage />} />
                <Route path="/occasion/:slug" element={<OccasionsPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/special-gifts" element={<SpecialGiftsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/gift-assistant" element={<GiftAssistantPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <BottomNavigation />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;
