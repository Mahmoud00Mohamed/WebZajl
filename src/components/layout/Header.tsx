import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  ShoppingBasket,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Bell,
  Heart,
  Package,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import i18n from "i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import Logo from "../ui/Logo";

const Header = () => {
  const { t } = useTranslation();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Add this line to define isRtl
  const isRtl = i18n.language === "ar";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white">
      {/* Top announcement bar */}
      <div className="bg-purple-600 text-white py-2 text-center">
        <p className="text-sm sm:text-base font-bold tracking-wide">
          {t("home.hero.expressDelivery")}
        </p>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-gray-100"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-grow max-w-lg mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("header.search")}
                className="w-full bg-gray-50 border border-transparent py-2 px-4 pl-10 rounded-full text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:border-purple-500 focus:bg-white focus:shadow-md"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Delivery location */}
            <div className="hidden lg:flex items-center group">
              <div className="flex items-center bg-purple-100 rounded-full px-3 py-1.5 text-purple-600">
                <MapPin size={18} className="mr-1.5 rtl:ml-1.5" />
                <span className="text-sm font-bold mr-1.5 rtl:ml-1.5">
                  {t("header.deliveryTo")}
                </span>
                <select className="text-sm border-none focus:ring-0 p-0 text-gray-800 font-bold bg-transparent">
                  <option>Riyadh</option>
                  <option>Jeddah</option>
                  <option>Dammam</option>
                </select>
              </div>
            </div>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            <Link
              to="/notifications"
              className="hidden md:flex items-center text-gray-600 transition-colors relative group"
            >
              <Bell size={20} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
              <span className="hidden lg:inline text-sm font-bold">
                {t("bottomNav.notifications")}
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></span>
            </Link>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="relative hidden md:flex items-center text-gray-600 transition-colors group"
            >
              <Heart size={20} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
              <span className="hidden lg:inline text-sm font-bold">
                {t("bottomNav.favorites")}
              </span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 left-2 rtl:left-auto rtl:right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </Link>

            {/* Packages */}
            <Link
              to="/packages"
              className="hidden md:flex items-center text-gray-600 transition-colors group"
            >
              <Package size={20} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
              <span className="hidden lg:inline text-sm font-bold">
                {t("bottomNav.packages")}
              </span>
            </Link>

            {/* Login */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-gray-600 transition-colors group"
                >
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover mr-2 rtl:ml-2 rtl:mr-0"
                    />
                  ) : (
                    <User size={20} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                  )}
                  <span className="text-sm font-bold">{user?.name}</span>
                  {user && !user.isPhoneVerified && (
                    <div
                      className="w-2 h-2 bg-yellow-500 rounded-full ml-2 rtl:mr-2 rtl:ml-0"
                      title={
                        isRtl
                          ? "يتطلب التحقق من الهاتف"
                          : "Phone verification required"
                      }
                    ></div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {user && !user.isPhoneVerified && (
                      <>
                        <Link
                          to="/auth/phone-setup"
                          className="block px-4 py-2 text-sm text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors border-b border-yellow-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {isRtl
                            ? "أكمل التحقق من الهاتف"
                            : "Complete Phone Verification"}
                        </Link>
                      </>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t("header.profile")}
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t("header.orders")}
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {t("header.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden sm:flex items-center text-gray-600 transition-colors group"
              >
                <User size={20} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                <span className="text-sm font-bold">{t("header.login")}</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-600 transition-colors group"
            >
              <ShoppingBasket size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 rtl:-left-2 rtl:right-auto bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-3 md:hidden relative">
          <input
            type="text"
            placeholder={t("header.search")}
            className="w-full bg-gray-50 border border-transparent py-2 px-4 pl-10 rounded-full text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:border-purple-500 focus:bg-white focus:shadow-md"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-gray-100">
        <div className="container-custom">
          <ul className="hidden md:flex items-center space-x-6 rtl:space-x-reverse py-3 text-gray-600">
            <li className="group relative">
              <Link
                to="/categories"
                className="flex items-center transition-colors font-bold"
              >
                {t("navigation.categories")}
                <ChevronDown
                  size={18}
                  className="ml-1 rtl:mr-1 rtl:ml-0 group-hover:rotate-180 transition-transform"
                />
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/occasions"
                className="flex items-center transition-colors font-bold"
              >
                {t("navigation.occasions")}
                <ChevronDown
                  size={18}
                  className="ml-1 rtl:mr-1 rtl:ml-0 group-hover:rotate-180 transition-transform"
                />
              </Link>
            </li>
            <li className="group relative">
              <Link
                to="/brands"
                className="flex items-center transition-colors font-bold"
              >
                {t("navigation.brands")}
                <ChevronDown
                  size={18}
                  className="ml-1 rtl:mr-1 rtl:ml-0 group-hover:rotate-180 transition-transform"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/special-gifts"
                className="text-purple-600 transition-colors font-bold"
              >
                {t("navigation.specialGifts")}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-600 transition-colors font-bold"
              >
                {i18n.language === "ar" ? "جميع المنتجات" : "All Products"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 bg-gray-900/80 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          const sideMenu = document.querySelector(".mobile-menu-container");
          if (!sideMenu || !sideMenu.contains(e.target as Node)) {
            setIsMenuOpen(false);
          }
        }}
      >
        <div
          className={`mobile-menu-container fixed inset-y-0 ${
            i18n.language === "ar" ? "right-0" : "left-0"
          } w-64 bg-white shadow-xl transition-transform duration-300 transform ${
            isMenuOpen
              ? "translate-x-0"
              : i18n.language === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Logo small />
              <button onClick={toggleMenu}>
                <X size={24} />
              </button>
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/categories"
                  className="block py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.categories")}
                </Link>
              </li>
              <li>
                <Link
                  to="/occasions"
                  className="block py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.occasions")}
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="block py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.brands")}
                </Link>
              </li>
              <li>
                <Link
                  to="/special-gifts"
                  className="block py-2 text-purple-600 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("navigation.specialGifts")}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {i18n.language === "ar" ? "جميع المنتجات" : "All Products"}
                </Link>
              </li>
              <li className="pt-4 border-t border-gray-100">
                <Link
                  to="/notifications"
                  className="flex items-center py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("bottomNav.notifications")}
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="flex items-center py-2 text-gray-600 transition-colors relative font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("bottomNav.favorites")}
                  {favoritesCount > 0 && (
                    <span className="ml-2 rtl:mr-2 rtl:ml-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="flex items-center py-2 text-gray-600 transition-colors font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("bottomNav.packages")}
                </Link>
              </li>
              {!isAuthenticated && (
                <li className="pt-4 border-t border-gray-100">
                  <Link
                    to="/auth/login"
                    className="flex items-center py-2 text-gray-600 transition-colors font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("header.login")}
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <>
                  <li className="pt-4 border-t border-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-gray-600 transition-colors font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                      {user?.name || t("header.profile")}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center py-2 text-red-600 transition-colors font-bold w-full text-left"
                    >
                      {t("header.logout")}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
