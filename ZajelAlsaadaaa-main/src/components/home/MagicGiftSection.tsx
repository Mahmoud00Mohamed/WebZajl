import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Wand2, ArrowRight, ArrowLeft } from "lucide-react";

const MagicGiftSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 md:p-12 text-center overflow-hidden border border-purple-100">
          {/* خلفية متحركة */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10">
            {/* أيقونة المساعد الذكي */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-lg">
              <Wand2 size={40} className="text-white" />
            </div>

            {/* عنوان محدث */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              {isRtl
                ? "مساعد اختيار الهدية المثالية"
                : "Perfect Gift Selection Assistant"}
            </h2>

            {/* وصف محدث */}
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              {isRtl
                ? "دعنا نساعدك في العثور على الهدية المثالية من خلال تحليل ذكي لاحتياجاتك وتفضيلاتك"
                : "Let us help you find the perfect gift through intelligent analysis of your needs and preferences"}
            </p>

            {/* مميزات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-purple-600 font-semibold text-sm">
                  {isRtl ? "تحليل ذكي" : "Smart Analysis"}
                </div>
                <div className="text-gray-600 text-xs">
                  {isRtl
                    ? "بناءً على المناسبة والعلاقة"
                    : "Based on occasion & relationship"}
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-pink-600 font-semibold text-sm">
                  {isRtl ? "اقتراحات مخصصة" : "Personalized Suggestions"}
                </div>
                <div className="text-gray-600 text-xs">
                  {isRtl
                    ? "حسب الميزانية والاهتمامات"
                    : "Based on budget & interests"}
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-indigo-600 font-semibold text-sm">
                  {isRtl ? "نتائج فورية" : "Instant Results"}
                </div>
                <div className="text-gray-600 text-xs">
                  {isRtl
                    ? "احصل على اقتراحات فورية"
                    : "Get suggestions instantly"}
                </div>
              </div>
            </div>

            {/* زر العمل المحدث */}
            <Link
              to="/gift-assistant"
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg text-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105"
            >
              {isRtl ? "ابدأ الآن" : "Start Now"}
              {isRtl ? (
                <ArrowLeft size={20} className="mr-2" />
              ) : (
                <ArrowRight size={20} className="ml-2" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MagicGiftSection);
