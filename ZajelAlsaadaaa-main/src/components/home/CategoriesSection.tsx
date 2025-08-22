// src/components/home/CategoriesSection.tsx
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import categories from "../../data/categories.json";
import ProductImage from "../ui/ProductImage";
import { useImagePreloader } from "../../hooks/useImagePreloader";

interface Category {
  id: string;
  nameKey: string;
  imageUrl: string;
}

const CategoriesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);

  // Preload category images
  const categoryImages = React.useMemo(
    () => categories.slice(0, 8).map((category) => category.imageUrl),
    []
  );
  useImagePreloader(categoryImages, { priority: true });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRtl ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: isRtl ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-800">
            {t("home.categories.title")}
          </h2>
          <div className="items-center gap-2 hidden md:flex">
            <Link
              to="/categories"
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {t("home.categories.viewMore")}
            </Link>
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={isRtl ? "التمرير لليمين" : "Scroll left"}
            >
              {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={isRtl ? "التمرير لليسار" : "Scroll right"}
            >
              {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          <Link
            to="/categories"
            className="text-primary hover:text-primary-dark font-medium md:hidden transition-colors"
          >
            {t("home.categories.viewMore")}
          </Link>
        </div>

        {/* Categories Grid */}
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
            {categories.map((category: Category, index) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-[calc(50%-4px)] sm:w-[calc(50%-4px)] md:w-48 snap-center touch-manipulation"
              >
                <Link to={`/category/${category.id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden group">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                      <ProductImage
                        src={category.imageUrl}
                        alt={t(category.nameKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={192}
                        height={192}
                        aspectRatio="square"
                        sizes="(max-width: 640px) calc(50vw - 20px), 192px"
                        quality={75}
                        priority={index < 3}
                        showZoom={false}
                        placeholderSize={28}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <h3 className="text-lg font-semibold text-white text-center">
                          {t(category.nameKey)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(CategoriesSection);
