import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import { imageCache } from "./components/ui/ImageCache";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BottomNavigation from "./components/layout/BottomNavigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const DeliveryPage = lazy(() => import("./pages/DeliveryPage"));
const OccasionsPage = lazy(() => import("./pages/OccasionsPage"));
const BrandsPage = lazy(() => import("./pages/BrandsPage"));
const SpecialGiftsPage = lazy(() => import("./pages/SpecialGiftsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const GiftAssistantPage = lazy(() => import("./pages/GiftAssistantPage"));

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Cleanup image cache on unmount
  useEffect(() => {
    return () => {
      imageCache.clearCache();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <ToastProvider>
      <FavoritesProvider>
        <CartProvider>
          <div
            className={`min-h-screen flex flex-col ${
              i18n.language === "ar" ? "font-sans-ar" : "font-sans-en"
            } overflow-x-hidden`}
            style={{ scrollBehavior: "smooth" }}
          >
            <Header />
            <main className="flex-grow pb-16 md:pb-0">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                }
              >
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
                  <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                  />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/packages" element={<PackagesPage />} />
                  <Route
                    path="/gift-assistant"
                    element={<GiftAssistantPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
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
