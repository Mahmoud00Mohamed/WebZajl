import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Sparkles,
  Crown,
  Gift,
  Zap,
  Filter,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSpecialGifts } from "../data";
import { useCart } from "../context/CartContext";
import ProductImage from "../components/ui/ProductImage";

interface Product {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  imageUrl: string;
  isSpecialGift: boolean;
  isBestSeller?: boolean;
}

const SpecialGiftsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { addToCart } = useCart();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const specialGifts = getSpecialGifts();
  let filteredProducts = specialGifts;

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      (isRtl ? product.nameAr : product.nameEn)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  if (filterBy !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      switch (filterBy) {
        case "bestseller":
          return product.isBestSeller;
        case "premium":
          return product.price > 300;
        case "affordable":
          return product.price <= 300;
        default:
          return true;
      }
    });
  }

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return isRtl
          ? a.nameAr.localeCompare(b.nameAr)
          : a.nameEn.localeCompare(b.nameEn);
      default:
        return b.isBestSeller ? 1 : -1;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  const filterOptions = [
    { value: "all", labelKey: isRtl ? "الكل" : "All", icon: Gift },
    {
      value: "bestseller",
      labelKey: isRtl ? "الأكثر مبيعاً" : "Best Sellers",
      icon: Sparkles,
    },
    { value: "premium", labelKey: isRtl ? "فاخر" : "Premium", icon: Crown },
    {
      value: "affordable",
      labelKey: isRtl ? "بأسعار معقولة" : "Affordable",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute w-2 h-2 text-white/30"
              >
                <Sparkles size={8} />
              </motion.div>
            ))}
          </div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative container-custom py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 relative"
            >
              <Sparkles size={48} className="text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-white/30 rounded-full border-dashed"
              ></motion.div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              {t("navigation.specialGifts")}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            >
              {isRtl
                ? "اكتشف مجموعتنا الحصرية من الهدايا المميزة التي تترك انطباعاً لا يُنسى"
                : "Discover our exclusive collection of special gifts that leave an unforgettable impression"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 text-white/90"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Crown size={16} />
                <span className="text-sm">
                  {isRtl ? "هدايا فاخرة" : "Luxury Gifts"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles size={16} />
                <span className="text-sm">
                  {isRtl ? "جودة مميزة" : "Premium Quality"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap size={16} />
                <span className="text-sm">
                  {isRtl ? "توصيل سريع" : "Fast Delivery"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={t("header.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFilterBy(option.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      filterBy === option.value
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">
                      {option.labelKey}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              >
                <option value="featured">{isRtl ? "مميز" : "Featured"}</option>
                <option value="price-low">
                  {isRtl ? "السعر: منخفض إلى مرتفع" : "Price: Low to High"}
                </option>
                <option value="price-high">
                  {isRtl ? "السعر: مرتفع إلى منخفض" : "Price: High to Low"}
                </option>
                <option value="name">{isRtl ? "الاسم" : "Name"}</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all shadow-lg"
              >
                <Filter size={18} />
                {isRtl ? "فلتر متقدم" : "Advanced Filter"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-inner"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRtl ? "فلاتر متقدمة" : "Advanced Filters"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {isRtl ? "نطاق السعر" : "Price Range"}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value) || 0,
                            priceRange[1],
                          ])
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                        placeholder="0"
                      />
                      <span className="text-gray-500 font-medium">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value) || 1000,
                          ])
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                        placeholder="1000"
                      />
                      <span className="text-sm text-gray-500">
                        {isRtl ? "ر.س" : "SAR"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isRtl ? "الهدايا المميزة" : "Special Gifts"}
              <span className="text-primary ml-2">
                ({sortedProducts.length})
              </span>
            </h2>
            <p className="text-gray-600">
              {isRtl
                ? "مجموعة حصرية من أفضل الهدايا المختارة بعناية"
                : "An exclusive collection of carefully selected premium gifts"}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filterBy}-${sortBy}-${searchTerm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                    <ProductImage
                      src={product.imageUrl}
                      alt={isRtl ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={300}
                      height={300}
                      aspectRatio="square"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 300px"
                      quality={85}
                      priority={index < 8}
                      showZoom={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white text-xs font-bold py-2 px-3 rounded-full flex items-center gap-1 shadow-lg"
                      >
                        <Sparkles size={12} />
                        {t("home.featuredCollections.specialGift")}
                      </motion.div>
                    </div>
                    {product.isBestSeller && (
                      <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto mt-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 shadow-lg"
                        >
                          <Sparkles size={12} />
                          {t("home.bestSellers.bestSeller")}
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg ${
                          favorites.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 bg-primary text-white rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary-dark transition-all duration-300 shadow-lg"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-3 px-4 rounded-xl font-medium text-center block hover:bg-white transition-all duration-300 shadow-lg"
                      >
                        {isRtl ? "عرض سريع" : "Quick View"}
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-bold text-gray-800 hover:text-primary transition-colors line-clamp-2 mb-3 text-lg">
                        {isRtl ? product.nameAr : product.nameEn}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-primary">
                        {product.price} {isRtl ? "ر.س" : "SAR"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {isRtl ? "هدية مميزة" : "Special Gift"}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {isRtl ? "توصيل مجاني" : "Free Delivery"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <Sparkles size={48} className="text-gray-500" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-gray-300 rounded-full border-dashed"
              ></motion.div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {isRtl ? "لا توجد هدايا مميزة" : "No Special Gifts Found"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {isRtl
                ? "لا توجد هدايا مميزة متاحة حالياً تطابق معايير البحث الخاصة بك."
                : "No special gifts are currently available that match your search criteria."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy("all");
                  setPriceRange([0, 1000]);
                }}
                className="btn btn-secondary"
              >
                {isRtl ? "مسح الفلاتر" : "Clear Filters"}
              </button>
              <Link to="/categories" className="btn btn-primary">
                {t("home.categories.title")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialGiftsPage;
