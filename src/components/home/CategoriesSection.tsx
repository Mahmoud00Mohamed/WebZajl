import React, { useRef, useEffect, useCallback, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const categoryImages = React.useMemo(
    () => categories.slice(0, 8).map((category) => category.imageUrl),
    []
  );
  useImagePreloader(categoryImages, { priority: true });

  const handle3dScrollEffect = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (window.innerWidth >= 768) {
      (Array.from(scrollContainer.children) as HTMLElement[]).forEach(
        (card) => {
          card.style.transform = "";
        }
      );
      return;
    }

    const containerViewportCenter =
      scrollContainer.getBoundingClientRect().left +
      scrollContainer.offsetWidth / 2;

    (Array.from(scrollContainer.children) as HTMLElement[]).forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = cardCenter - containerViewportCenter;

      const maxDistance = scrollContainer.offsetWidth / 2;
      const ratio = Math.min(Math.max(distance / maxDistance, -1), 1);

      const scale = 1 - Math.abs(ratio) * 0.35;
      const rotateY = ratio * -35;

      card.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && window.innerWidth < 768) {
      const cardWidth = 144 + 12;
      const middleIndex = Math.floor(categories.length / 2);
      const scrollPosition =
        middleIndex * cardWidth -
        scrollContainer.offsetWidth / 2 +
        cardWidth / 2;
      scrollContainer.scrollLeft = isRtl ? -scrollPosition : scrollPosition;
    }
  }, [isRtl]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      handle3dScrollEffect();
      scrollContainer.addEventListener("scroll", handle3dScrollEffect, {
        passive: true,
      });
      window.addEventListener("resize", handle3dScrollEffect);
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handle3dScrollEffect);
      }
      window.removeEventListener("resize", handle3dScrollEffect);
      window.removeEventListener("resize", handleResize);
    };
  }, [handle3dScrollEffect]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 192 + 8 : 144 + 12; // card width + gap
      scrollRef.current.scrollBy({
        left: isRtl
          ? direction === "left"
            ? cardWidth
            : -cardWidth
          : direction === "left"
          ? -cardWidth
          : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevDirection = isRtl ? "right" : "left";
  const nextDirection = isRtl ? "left" : "right";

  return (
    <section className="py-0 bg-white">
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight">
            {t("home.categories.title")}
          </h2>
          <p className="mt-2.5  text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed">
            {isRtl
              ? "استكشف مجموعتنا المتنوعة من الهدايا حسب الفئة."
              : "Explore our diverse collection of gifts by category."}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll(prevDirection)}
            className="hidden md:flex items-center justify-center absolute top-[40%] -translate-y-1/2 bg-white/90 text-stone-600 rounded-full w-9 h-9 shadow ring-1 ring-stone-200 z-10 -left-8"
            aria-label={t("common.scrollLeft")}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(nextDirection)}
            className="hidden md:flex items-center justify-center absolute top-[40%] -translate-y-1/2 bg-white/90 text-stone-600 rounded-full w-9 h-9 shadow ring-1 ring-stone-200 z-10 -right-8"
            aria-label={t("common.scrollRight")}
          >
            <ChevronRight size={18} />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-x-3 pb-4 snap-x snap-mandatory scroll-smooth 
                         px-[calc(50%-4.5rem)] sm:px-[calc(50%-4.5rem)] md:px-4 
                         md:gap-x-2"
            style={{
              perspective: "1000px",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: isMobile ? "none" : "thin",
              scrollbarColor: isMobile ? "transparent" : "#8A2BE2 transparent",
            }}
          >
            {categories.map((category: Category, index) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-36 sm:w-36 md:w-48 snap-center touch-manipulation"
              >
                <Link to={`/category/${category.id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-[box-shadow,border-color] duration-300 overflow-hidden group">
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                      <ProductImage
                        src={category.imageUrl}
                        alt={t(category.nameKey)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={144}
                        height={144}
                        aspectRatio="square"
                        sizes="(max-width: 767px) 144px, 192px"
                        quality={75}
                        priority={index < 3}
                        showZoom={false}
                        placeholderSize={28}
                        fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=400"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                        <h3 className="text-base font-semibold text-white text-center">
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
