import React from "react";
import {
  PhoneIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ShareIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-100 bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6 text-sm text-gray-500">
          {/* Links */}
          <div className="flex gap-8">
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              კონტაქტი
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              კონფიდენციალურობა
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <DocumentTextIcon className="h-4 w-4" />
              მომსახურების პირობები
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100"></div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} ფასდაკლებები. ყველა უფლება დაცულია.
            </p>

            <div className="flex gap-5 text-gray-400">
              <a href="#" className="hover:text-emerald-600 transition-colors">
                <GlobeAltIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                <ShareIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                <AtSymbolIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
