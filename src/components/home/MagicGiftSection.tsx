import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Wand2, ArrowRight, ArrowLeft } from "lucide-react";

const MagicGiftSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="container-custom px-4 sm:px-6">
        <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10 text-center overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full mb-6 shadow-md">
              <Wand2 size={32} className="text-white" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-purple-800 leading-tight mb-4">
              {t("home.magicGift.title", {
                defaultValue: isRtl
                  ? "مساعد اختيار الهدية المثالية"
                  : "Perfect Gift Selection Assistant",
              })}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base max-w-xs sm:max-w-md md:max-w-lg mx-auto leading-relaxed mb-8">
              {t("home.magicGift.description", {
                defaultValue: isRtl
                  ? "دعنا نساعدك في العثور على الهدية المثالية من خلال تحليل ذكي لاحتياجاتك وتفضيلاتك"
                  : "Let us help you find the perfect gift through intelligent analysis of your needs and preferences",
              })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="text-purple-600 font-semibold text-sm">
                  {t("home.magicGift.features.smartAnalysis", {
                    defaultValue: isRtl ? "تحليل ذكي" : "Smart Analysis",
                  })}
                </div>
                <div className="text-gray-600 text-xs leading-relaxed">
                  {t("home.magicGift.features.smartAnalysisDesc", {
                    defaultValue: isRtl
                      ? "بناءً على المناسبة والعلاقة"
                      : "Based on occasion & relationship",
                  })}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="text-purple-600 font-semibold text-sm">
                  {t("home.magicGift.features.personalized", {
                    defaultValue: isRtl
                      ? "اقتراحات مخصصة"
                      : "Personalized Suggestions",
                  })}
                </div>
                <div className="text-gray-600 text-xs leading-relaxed">
                  {t("home.magicGift.features.personalizedDesc", {
                    defaultValue: isRtl
                      ? "حسب الميزانية والاهتمامات"
                      : "Based on budget & interests",
                  })}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="text-purple-600 font-semibold text-sm">
                  {t("home.magicGift.features.instant", {
                    defaultValue: isRtl ? "نتائج فورية" : "Instant Results",
                  })}
                </div>
                <div className="text-gray-600 text-xs leading-relaxed">
                  {t("home.magicGift.features.instantDesc", {
                    defaultValue: isRtl
                      ? "احصل على اقتراحات فورية"
                      : "Get suggestions instantly",
                  })}
                </div>
              </div>
            </div>

            <Link
              to="/gift-assistant"
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md text-base transition-all duration-300 hover:from-purple-700 hover:to-purple-900 hover:shadow-lg hover:scale-105"
            >
              {t("home.magicGift.startNow", {
                defaultValue: isRtl ? "ابدأ الآن" : "Start Now",
              })}
              {isRtl ? (
                <ArrowLeft size={18} className="mr-2" />
              ) : (
                <ArrowRight size={18} className="ml-2" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MagicGiftSection);
