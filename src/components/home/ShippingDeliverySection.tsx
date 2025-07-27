import React from "react";
import { useTranslation } from "react-i18next";
import { Truck, Clock, MapPin, Shield, CheckCircle } from "lucide-react";
import ProductImage from "../ui/ProductImage";

const ShippingDeliverySection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const features = React.useMemo(
    () => [
      {
        icon: <Clock size={24} className="text-blue-600" />,
        titleKey: "home.shipping.features.sameDay.title",
        descriptionKey: "home.shipping.features.sameDay.description",
      },
      {
        icon: <MapPin size={24} className="text-green-600" />,
        titleKey: "home.shipping.features.nationwide.title",
        descriptionKey: "home.shipping.features.nationwide.description",
      },
      {
        icon: <Shield size={24} className="text-yellow-600" />,
        titleKey: "home.shipping.features.secure.title",
        descriptionKey: "home.shipping.features.secure.description",
      },
      {
        icon: <CheckCircle size={24} className="text-purple-600" />,
        titleKey: "home.shipping.features.tracking.title",
        descriptionKey: "home.shipping.features.tracking.description",
      },
    ],
    []
  );

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRtl ? "lg:order-2" : "lg:order-1"}`}>
            <div className="flex items-center mb-4">
              <Truck
                size={32}
                className="text-indigo-700 mr-3 rtl:ml-3 rtl:mr-0"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {t("home.shipping.title")}
              </h2>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {t("home.shipping.description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-3 rtl:space-x-reverse bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow-md border border-blue-200">
              <div className="flex items-center mb-2">
                <Clock
                  size={20}
                  className="text-blue-600 mr-2 rtl:ml-2 rtl:mr-0"
                />
                <span className="font-semibold text-blue-800">
                  {t("home.shipping.specialOffer.title")}
                </span>
              </div>
              <p className="text-blue-700 text-sm">
                {t("home.shipping.specialOffer.description")}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={`${isRtl ? "lg:order-1" : "lg:order-2"} relative`}>
            <div className="relative w-full aspect-video md:h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 border border-gray-300 rounded-lg shadow-lg z-10"></div>
              <ProductImage
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={t("home.shipping.title")}
                className="w-full h-full object-cover rounded-lg relative z-0"
                width={1260}
                height={750}
                aspectRatio="auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                priority={false}
                showZoom={false}
                placeholderSize={50}
                fallbackSrc="https://images.pexels.com/photos/1058775/pexels-photo-1058775.jpeg?auto=compress&cs=tinysrgb&w=800"
              />

              {/* Floating delivery badge - remains on top */}
              <div className="absolute -top-4 -right-4 rtl:-left-4 rtl:right-auto bg-white rounded-lg p-4 shadow-md border border-gray-200 z-20">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-800">
                    {t("home.shipping.badge")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ShippingDeliverySection);
