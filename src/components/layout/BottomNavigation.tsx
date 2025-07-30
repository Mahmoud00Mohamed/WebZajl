import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Bell, Heart, Package, LucideIcon } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

// تعريف نوع (Type) محدد لعناصر التنقل
interface NavItem {
  id: string;
  path: string;
  icon: LucideIcon;
  labelKey: string;
  badge?: number;
}

const BottomNavigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  const navItems: NavItem[] = [
    {
      id: "home",
      path: "/",
      icon: Home,
      labelKey: "bottomNav.home",
    },
    {
      id: "categories",
      path: "/categories",
      icon: Grid3X3,
      labelKey: "bottomNav.categories",
    },
    {
      id: "notifications",
      path: "/notifications",
      icon: Bell,
      labelKey: "bottomNav.notifications",
    },
    {
      id: "favorites",
      path: "/favorites",
      icon: Heart,
      labelKey: "bottomNav.favorites",
      badge: favoritesCount,
    },
    {
      id: "packages",
      path: "/packages",
      icon: Package,
      labelKey: "bottomNav.packages",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-xl" // زيادة الظل
      style={{ height: "70px" }}
    >
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex flex-col items-center justify-center flex-1
                relative p-2 rounded-lg
                transition-all duration-300 ease-in-out // مدة الأنيميشن ونوعها
                ${
                  active
                    ? "text-purple-600 bg-purple-50" // لون خلفية خفيف للعنصر النشط
                    : "text-gray-500 hover:text-purple-700 hover:bg-gray-100" // لون الهوفر وخلفية الهوفر
                }
                transform ${
                  active ? "scale-105" : "scale-100"
                } // تأثير تكبير عند التفعيل
              `}
            >
              <div className="relative">
                <Icon size={24} className="transition-transform duration-200" />{" "}
                {/* تكبير الأيقونة أكثر */}
                {item.id === "notifications" && (
                  <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-pulse-fast"></span> // شارة الإشعارات بتأثير نبض أسرع
                )}
                {item.id === "favorites" &&
                  typeof item.badge === "number" &&
                  item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] leading-none rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                      {" "}
                      {/* شارة المفضلة بدون أنيميشن مخصص */}
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
              </div>
              <span
                className={`text-xs mt-1 font-medium truncate transition-colors duration-200
                  ${active ? "text-purple-600" : "text-gray-500"}
                `}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
