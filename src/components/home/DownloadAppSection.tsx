// src/components/home/DownloadAppSection.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Gift, Zap, Smartphone, Apple } from "lucide-react";
import ProductImage from "../ui/ProductImage";

const DownloadAppSection: React.FC = () => {
  const { t } = useTranslation();

  const features = React.useMemo(
    () => [
      {
        icon: <Gift size={24} className="text-primary" />,
        text: t("home.downloadApp.features.feature1"),
      },
      {
        icon: <Zap size={24} className="text-primary" />,
        text: t("home.downloadApp.features.feature2"),
      },
      {
        icon: <Smartphone size={24} className="text-primary" />,
        text: t("home.downloadApp.features.feature3"),
      },
    ],
    [t]
  );

  const downloadButtons = React.useMemo(
    () => [
      {
        href: "https://www.apple.com/app-store/",
        icon: <Apple size={24} className="text-white" />,
        platform: t("home.downloadApp.iosPlatform"),
        label: t("home.downloadApp.downloadOn"),
        storeName: "App Store",
        bgColor: "bg-gray-900 hover:bg-gray-800",
      },
      {
        href: "https://play.google.com/store",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
          >
            <path d="M3.063 3.627A1.947 1.947 0 0 0 3 4.02v15.96c0 .72.405 1.384 1.055 1.723l7.89-9.683-7.882-9.393zm.742 16.028l7.878-9.677 2.47 2.945-10.348 6.732zm10.612-6.918l-2.6-3.102L21.001 4.02c.374.218.666.548.832.941L12.42 12.74zm1.553-1.356l6.53-6.55c.147.366.227.78.227 1.23v15.13c0 .63-.166 1.21-.453 1.71l-6.304-6.55 6.57-6.57-6.57-6.57z" />
          </svg>
        ),
        platform: t("home.downloadApp.androidPlatform"),
        label: t("home.downloadApp.getItOn"),
        storeName: "Google Play",
        bgColor: "bg-green-600 hover:bg-green-700",
      },
    ],
    [t]
  );

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t("home.downloadApp.title")}
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
              {t("home.downloadApp.description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center md:items-start group"
                >
                  <div className="p-3 bg-blue-100 rounded-lg mb-2">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {downloadButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center ${button.bgColor} text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md`}
                >
                  <div className="mr-3 rtl:ml-3 rtl:mr-0">{button.icon}</div>
                  <div className="text-left rtl:text-right">
                    <div className="text-xs opacity-80">{button.label}</div>
                    <div className="text-lg font-bold">{button.storeName}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="relative max-w-xs">
              <div className="absolute -inset-4 bg-primary/20 rounded-lg transform rotate-6"></div>
              <ProductImage
                src="https://images.pexels.com/photos/12759222/pexels-photo-12759222.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt={t("home.downloadApp.title")}
                className="relative w-full h-auto rounded-lg shadow-md"
                width={300}
                height={600}
                aspectRatio="portrait"
                sizes="(max-width: 768px) 300px, 400px"
                quality={90}
                priority={false}
                showZoom={false}
                placeholderSize={40}
                fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(DownloadAppSection);
