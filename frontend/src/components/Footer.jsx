import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 py-6 text-center text-sm text-gray-500 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p>
          © {new Date().getFullYear()} ფასდაკლებები — React + Tailwind CSS. 
          ყველა უფლება დაცულია.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-emerald-600 transition-colors">კონტაქტი</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">კონფიდენციალურობა</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">მომსახურების პირობები</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
