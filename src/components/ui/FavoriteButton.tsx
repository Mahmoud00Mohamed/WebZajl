import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

interface FavoriteButtonProps {
  product: {
    id: number;
    nameEn: string;
    nameAr: string;
    price: number;
    imageUrl: string;
    categoryId?: string;
    occasionId?: string;
    isBestSeller?: boolean;
    isSpecialGift?: boolean;
  };
  className?: string;
  size?: number;
  showLabel?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  className = "",
  size = 18,
  showLabel = false,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showSuccess, showInfo } = useToast();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const isProductFavorite = isFavorite(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isProductFavorite) {
        removeFromFavorites(product.id);
        showInfo(
          isRtl ? "تم الحذف من المفضلة" : "Removed from Favorites",
          isRtl
            ? `تم حذف ${product.nameAr} من المفضلة`
            : `${product.nameEn} removed from favorites`
        );
      } else {
        addToFavorites(product);
        showSuccess(
          isRtl ? "تم الإضافة للمفضلة" : "Added to Favorites",
          isRtl
            ? `تم إضافة ${product.nameAr} إلى المفضلة`
            : `${product.nameEn} added to favorites`,
          {
            label: isRtl ? "عرض المفضلة" : "View Favorites",
            onClick: () => (window.location.href = "/favorites"),
          }
        );
      }
    } catch (error) {
      console.error("خطأ في تبديل المفضلة:", error);
    }
  };

  return (
    <motion.button
      onClick={handleToggleFavorite}
      className={`flex items-center justify-center transition-all duration-300 ${
        isProductFavorite
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-500"
      } ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={
        isProductFavorite
          ? isRtl
            ? "حذف من المفضلة"
            : "Remove from favorites"
          : isRtl
          ? "إضافة للمفضلة"
          : "Add to favorites"
      }
    >
      <motion.div
        animate={isProductFavorite ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={size}
          fill={isProductFavorite ? "currentColor" : "none"}
          className="transition-all duration-300"
        />
      </motion.div>

      {showLabel && (
        <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm font-medium">
          {isProductFavorite
            ? isRtl
              ? "مفضل"
              : "Favorited"
            : isRtl
            ? "أضف للمفضلة"
            : "Add to Favorites"}
        </span>
      )}
    </motion.button>
  );
};

export default FavoriteButton;
