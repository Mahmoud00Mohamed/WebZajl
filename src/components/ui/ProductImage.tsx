import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnhancedImage from "./EnhancedImage";
import { ZoomIn, X } from "lucide-react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  showZoom?: boolean;
  priority?: boolean;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  enableBlurUp?: boolean;
  threshold?: number;
  rootMargin?: string;
  fallbackSrc?: string;
  placeholderSize?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "",
  showZoom = true,
  priority = false,
  aspectRatio = "square",
  width = 400,
  height = 400,
  sizes,
  quality = 75,
  enableBlurUp = true,
  threshold = 0.1,
  rootMargin = "100px",
  fallbackSrc,
  placeholderSize,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  return (
    <>
      <div
        className={`relative overflow-hidden group ${aspectRatioClasses[aspectRatio]} ${className}`}
      >
        {/* Main Image */}
        <EnhancedImage
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          priority={priority}
          width={width}
          height={height}
          sizes={sizes}
          aspectRatio={aspectRatio}
          quality={quality}
          enableBlurUp={enableBlurUp}
          threshold={threshold}
          rootMargin={rootMargin}
          fallbackSrc={fallbackSrc}
          placeholderSize={placeholderSize || Math.min(width || 40, 40)}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom Button */}
        {showZoom && imageLoaded && (
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-white transform-gpu hover:scale-110 active:scale-95"
          >
            <ZoomIn size={16} className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsZoomed(false)}
          >
            <div
              className="relative max-w-4xl max-h-full animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            >
              <EnhancedImage
                src={src}
                alt={alt}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                priority={true}
                width={1200}
                height={1200}
                aspectRatio="auto"
                quality={100}
                enableBlurUp={false}
                showPlaceholder={true}
                placeholderSize={60}
              />

              {/* Close Button */}
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductImage;
