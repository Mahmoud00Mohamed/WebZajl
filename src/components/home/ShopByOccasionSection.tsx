// src/components/home/ShopByOccasionSection.tsx
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; // تأكد من استيراد Link
import { ChevronLeft, ChevronRight } from "lucide-react";
import occasions from "../../data/occasions.json";
import ProductImage from "../ui/ProductImage";
import { useImagePreloader } from "../../hooks/useImagePreloader";

const ShopByOccasionSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  // Preload occasion images
  const occasionImages = React.useMemo(
    () => occasions.slice(0, 10).map((occasion) => occasion.imageUrl),
    []
  );
  useImagePreloader(occasionImages, { priority: true });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 120; // Smaller scroll amount for smaller cards
      scrollRef.current.scrollBy({
        left: isRtl
          ? direction === "left"
            ? scrollAmount
            : -scrollAmount
          : direction === "left"
          ? -scrollAmount
          : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-indigo-800 mb-8 font-extrabold">
          {t("home.shopByOccasion.title")}
        </h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hidden snap-x snap-mandatory scroll-smooth justify-center"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {occasions.map((occasion, index) => (
              // هذا هو الجزء الأساسي: مكون <Link> يحيط بكل محتوى الكارت.
              // هذا يضمن أن أي نقرة داخل منطقة الكارت بالكامل ستؤدي إلى الانتقال.
              <Link
                to={`/occasion/${occasion.id}`}
                key={occasion.id}
                className="group flex flex-col items-center flex-shrink-0 w-24 md:w-28 snap-center touch-manipulation transform transition-all duration-500 ease-out animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg p-[3px] flex items-center justify-center transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(45deg, #8A2BE2, #FF69B4, #00BFFF)",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <ProductImage
                      src={occasion.imageUrl}
                      alt={t(occasion.nameKey)}
                      className="w-full h-full object-cover rounded-full"
                      width={96}
                      height={96}
                      aspectRatio="square"
                      sizes="(max-width: 768px) 80px, 96px"
                      quality={85}
                      priority={index < 4}
                      showZoom={false}
                      placeholderSize={24}
                      fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=200"
                    />
                  </div>
                </div>
                <span className="text-gray-700 text-xs md:text-sm font-medium text-center mt-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {t(occasion.nameKey)}
                </span>
              </Link>
            ))}
          </div>

          {showArrows && (
            <>
              <button
                onClick={() => scroll("left")}
                className={`hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full w-9 h-9 shadow-md hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 z-10 ${
                  isRtl ? "-right-4" : "-left-4"
                }`}
                aria-label={t("common.scrollLeft")}
              >
                {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
              <button
                onClick={() => scroll("right")}
                className={`hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full w-9 h-9 shadow-md hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 z-10 ${
                  isRtl ? "-left-4" : "-right-4"
                }`}
                aria-label={t("common.scrollRight")}
              >
                {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ShopByOccasionSection);
