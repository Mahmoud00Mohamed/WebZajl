import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import Logo from "../ui/Logo";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              {t("footer.aboutDescription")}
            </p>
            <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.delivery")}
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.returns")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-primary mt-0.5 mr-2 rtl:ml-2 rtl:mr-0"
                />
                <span className="text-gray-600">{t("footer.location")}</span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="text-primary mr-2 rtl:ml-2 rtl:mr-0"
                />
                <span className="text-gray-600">+20 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={18}
                  className="text-primary mr-2 rtl:ml-2 rtl:mr-0"
                />
                <span className="text-gray-600">info@zajilalsaadah.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
