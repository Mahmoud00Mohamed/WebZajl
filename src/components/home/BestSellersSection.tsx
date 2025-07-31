import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { getBestSellers } from "../../data";
import ProductImage from "../ui/ProductImage";
import { useImagePreloader } from "../../hooks/useImagePreloader";

const BestSellersSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = React.useMemo(() => getBestSellers(), []);

  const bestSellerImages = React.useMemo(
    () => bestSellers.slice(0, 6).map((product) => product.imageUrl),
    [bestSellers]
  );
  useImagePreloader(bestSellerImages, { priority: true });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRtl ? 280 : -280,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRtl ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
      },
    }),
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Crown size={24} className="text-amber-300" />
            <h2 className="section-title text-3xl font-serif text-gray-900 mb-0">
              {t("home.bestSellers.title")}
            </h2>
          </div>
          <div className="items-center gap-2 hidden md:flex">
            <Link
              to="/best-sellers"
              className="view-more flex items-center text-primary hover:text-primary-dark font-medium text-lg transition-colors"
            >
              <span>{t("home.bestSellers.viewMore")}</span>
              {isRtl ? (
                <ChevronLeft size={18} className="ml-2" />
              ) : (
                <ChevronRight size={18} className="ml-2" />
              )}
            </Link>
            <button
              onClick={scrollLeft}
              className="btn btn-secondary p-2 rounded-lg"
              aria-label={isRtl ? "التمرير لليمين" : "Scroll left"}
            >
              {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              onClick={scrollRight}
              className="btn btn-secondary p-2 rounded-lg"
              aria-label={isRtl ? "التمرير لليسار" : "Scroll right"}
            >
              {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          <Link
            to="/best-sellers"
            className="view-more flex items-center text-primary hover:text-primary-dark font-medium text-lg md:hidden transition-colors"
          >
            <span>{t("home.bestSellers.viewMore")}</span>
            {isRtl ? (
              <ChevronLeft size={18} className="ml-2" />
            ) : (
              <ChevronRight size={18} className="ml-2" />
            )}
          </Link>
        </div>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-x-2 pb-4 snap-x snap-mandatory scroll-smooth px-4"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              scrollbarColor: "#8A2BE2 transparent",
            }}
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex-shrink-0 w-[calc(50%-4px)] sm:w-[calc(50%-4px)] md:w-56 h-60 md:h-72 snap-center touch-manipulation"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                      <ProductImage
                        src={product.imageUrl}
                        alt={
                          i18n.language === "ar"
                            ? product.nameAr
                            : product.nameEn
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={224}
                        height={224}
                        aspectRatio="square"
                        sizes="(max-width: 640px) calc(50vw - 20px), (max-width: 768px) calc(50vw - 20px), 224px"
                        quality={75}
                        priority={index < 2}
                        showZoom={false}
                        placeholderSize={32}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto z-10">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold py-1.5 px-2.5 rounded-lg flex items-center gap-1 shadow-md"
                        >
                          <Crown size={10} />
                          {t("home.bestSellers.bestSeller")}
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-3 text-start flex-grow flex flex-col justify-between">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 md:line-clamp-2 mb-0">
                        {i18n.language === "ar"
                          ? product.nameAr
                          : product.nameEn}
                      </h3>
                      <div className="flex items-center justify-start">
                        <p className="text-lg font-bold text-amber-600">
                          {product.price}{" "}
                          {i18n.language === "ar" ? "ر.س" : "SAR"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BestSellersSection);
