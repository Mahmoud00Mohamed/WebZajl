import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import EnhancedImage from "../ui/EnhancedImage";
import { usePreloadCriticalImages } from "../../hooks/useImagePreloader";
import heroOccasions from "../../data/heroOccasions.json";
import promotionalSlides from "../../data/promotionalSlides.json";

interface Occasion {
  nameKey: string;
  id: string;
  nameAr: string;
  nameEn: string;
  date: string;
  images: string[];
  celebratoryMessageAr: string;
  celebratoryMessageEn: string;
  priority: number;
  isActive: boolean;
}

interface PromotionalSlide {
  id: string;
  type: "promotion";
  image: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
  link: string;
  gradient: string;
  isActive: boolean;
  priority: number;
  startDate: string;
  endDate: string;
}

const HeroSlider: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isOccasionActive, setIsOccasionActive] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeOccasions = useMemo(() => {
    return (heroOccasions as Occasion[])
      .filter((occasion) => occasion.isActive)
      .sort((a, b) => a.priority - b.priority);
  }, []);

  const activePromotions = useMemo(() => {
    const now = new Date().getTime();
    return (promotionalSlides as PromotionalSlide[])
      .filter((slide) => {
        if (!slide.isActive) return false;
        const startDate = new Date(slide.startDate).getTime();
        const endDate = new Date(slide.endDate).getTime();
        return now >= startDate && now <= endDate;
      })
      .sort((a, b) => a.priority - b.priority);
  }, []);

  const nearestOccasion = useMemo(() => {
    return activeOccasions.reduce((nearest, occasion) => {
      const occasionDate = new Date(occasion.date).getTime();
      const now = Date.now();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (occasionDate < now - oneDayInMs) return nearest;
      if (!nearest || occasionDate < new Date(nearest.date).getTime()) {
        return occasion;
      }
      return nearest;
    }, null as Occasion | null);
  }, [activeOccasions]);

  const allSlides = useMemo(() => {
    const occasionSlides = nearestOccasion
      ? nearestOccasion.images.map((image, index) => ({
          id: `occasion-${index}`,
          type: "occasion" as const,
          image,
          occasion: nearestOccasion,
        }))
      : [];

    const promoSlides = activePromotions.map((slide) => ({
      id: slide.id,
      type: "promotion" as const,
      image: slide.image,
      promotion: slide,
    }));

    if (occasionSlides.length > 0) {
      return [occasionSlides[0], ...promoSlides, ...occasionSlides.slice(1)];
    }

    return promoSlides;
  }, [nearestOccasion, activePromotions]);

  // Preload hero images for instant display
  const heroImages = React.useMemo(() => {
    return allSlides.slice(0, 3).map((slide) => slide.image);
  }, [allSlides]);
  usePreloadCriticalImages(heroImages);

  const extendedSlides = useMemo(
    () => [...allSlides, allSlides[0]],
    [allSlides]
  );

  const updateCountdown = useCallback(() => {
    if (!nearestOccasion) return;
    const now = new Date();
    const occasionDate = new Date(nearestOccasion.date);
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const occasionDateOnly = new Date(
      occasionDate.getFullYear(),
      occasionDate.getMonth(),
      occasionDate.getDate()
    );
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const diff = occasionDate.getTime() - now.getTime();

    const isToday =
      nowDate.getTime() === occasionDateOnly.getTime() ||
      (nowDate.getTime() > occasionDateOnly.getTime() &&
        nowDate.getTime() <= occasionDateOnly.getTime() + oneDayInMs);
    setIsOccasionActive(isToday);

    if (!isToday) {
      setTimeLeft({
        days: Math.floor(diff / oneDayInMs),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }
  }, [nearestOccasion]);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentSlide((prev) => (prev + 1) % extendedSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [extendedSlides.length]);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleTransitionEnd = () => {
      if (currentSlide === allSlides.length) {
        setTransitionEnabled(false);
        setCurrentSlide(0);
      }
    };
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
    }
    return () => {
      if (slider) {
        slider.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [currentSlide, allSlides.length]);

  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => setTransitionEnabled(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  const currentSlideData = allSlides[currentSlide] || allSlides[0];

  if (allSlides.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {isOccasionActive && currentSlideData?.type === "occasion" && (
        <div className="absolute inset-0 overflow-hidden">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            tweenDuration={8000}
            colors={["#d8b4fe", "#c084fc", "#a855f7", "#7e22ce"]}
          />
        </div>
      )}

      <div className="container-custom">
        <div className="relative h-[360px] sm:h-[460px] md:h-[560px] overflow-hidden rounded-3xl shadow-xl border border-purple-100/30">
          <motion.div
            ref={sliderRef}
            className="flex h-full w-full will-change-transform"
            animate={{
              x: isArabic
                ? currentSlide * 100 + "%"
                : -currentSlide * 100 + "%",
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="w-full h-full flex-none bg-cover bg-center relative"
              >
                <EnhancedImage
                  src={slide.image}
                  alt={
                    slide.type === "occasion"
                      ? t(slide.occasion?.nameKey || "")
                      : (isArabic
                          ? slide.promotion?.titleAr
                          : slide.promotion?.titleEn) || ""
                  }
                  className="w-full h-full object-cover"
                  priority={index === 0}
                  quality={100}
                  sizes="100vw"
                  aspectRatio="auto"
                  showPlaceholder={true}
                  placeholderSize={60}
                  enableBlurUp={true}
                  fallbackSrc="https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1200"
                />
                <div
                  className={`absolute inset-0 ${
                    slide.type === "promotion"
                      ? `bg-gradient-to-t from-purple-900/40 to-transparent`
                      : "bg-purple-100/15"
                  } rounded-3xl`}
                />
              </div>
            ))}
          </motion.div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "bg-purple-700 scale-125"
                    : "bg-purple-300/60"
                }`}
              />
            ))}
          </div>

          {/* Countdown timer */}
          {!isOccasionActive &&
            nearestOccasion &&
            currentSlideData?.type === "occasion" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute bottom-4 ${
                  isArabic ? "right-4" : "left-4"
                } flex space-x-3 rtl:space-x-reverse text-white p-3 bg-purple-800/90 backdrop-blur-lg rounded-xl shadow-lg`}
              >
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold">{timeLeft.days}</div>
                  <div className="text-xs uppercase opacity-80">
                    {t("home.counter.days")}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold">{timeLeft.hours}</div>
                  <div className="text-xs uppercase opacity-80">
                    {t("home.counter.hours")}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-semibold">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs uppercase opacity-80">
                    {t("home.counter.minutes")}
                  </div>
                </div>
              </motion.div>
            )}

          {/* Slide content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <AnimatePresence mode="wait">
              {currentSlideData?.type === "occasion" &&
              currentSlideData.occasion ? (
                <motion.div
                  key="occasion"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="max-w-3xl mx-auto"
                >
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">
                    {isArabic
                      ? currentSlideData.occasion.nameAr
                      : currentSlideData.occasion.nameEn}
                  </h2>
                  {isOccasionActive ? (
                    <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto opacity-90 tracking-wide">
                      {isArabic
                        ? currentSlideData.occasion.celebratoryMessageAr
                        : currentSlideData.occasion.celebratoryMessageEn}
                    </p>
                  ) : (
                    <p className="text-base md:text-lg mb-6 max-w-xl mx-auto opacity-90 tracking-wide">
                      {t("home.hero.expressDelivery")}
                    </p>
                  )}
                  <Link
                    to={`/occasion/${currentSlideData.occasion.id}`}
                    className="inline-flex items-center bg-purple-700 text-white px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg"
                  >
                    {t("home.hero.giftNow")}
                  </Link>
                </motion.div>
              ) : currentSlideData?.type === "promotion" &&
                currentSlideData.promotion ? (
                <motion.div
                  key="promotion"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="max-w-3xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                    className="bg-purple-700/90 text-white rounded-full px-5 py-1.5 mb-3 inline-block text-xs font-semibold uppercase tracking-wider"
                  >
                    {isArabic ? "عرض خاص" : "Special Offer"}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-serif font-bold mb-3 tracking-tight"
                  >
                    {isArabic
                      ? currentSlideData.promotion.titleAr
                      : currentSlideData.promotion.titleEn}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    className="text-base md:text-lg mb-6 max-w-xl mx-auto opacity-90 tracking-wide"
                  >
                    {isArabic
                      ? currentSlideData.promotion.subtitleAr
                      : currentSlideData.promotion.subtitleEn}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                  >
                    <Link
                      to={currentSlideData.promotion.link}
                      className="inline-flex items-center bg-white text-purple-700 px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg"
                    >
                      {isArabic
                        ? currentSlideData.promotion.buttonTextAr
                        : currentSlideData.promotion.buttonTextEn}
                      <motion.span
                        animate={{ x: isArabic ? [-3, 0] : [0, 3] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                        className={`${isArabic ? "mr-1.5" : "ml-1.5"} text-sm`}
                      >
                        {isArabic ? "←" : "→"}
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? allSlides.length - 1 : currentSlide - 1
              )
            }
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isArabic ? "right-4" : "left-4"
            } w-12 h-12 bg-purple-700/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
          >
            <span className="text-xl">{isArabic ? "→" : "←"}</span>
          </button>

          <button
            onClick={() =>
              setCurrentSlide((currentSlide + 1) % allSlides.length)
            }
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isArabic ? "left-4" : "right-4"
            } w-12 h-12 bg-purple-700/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
          >
            <span className="text-xl">{isArabic ? "←" : "→"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSlider);
