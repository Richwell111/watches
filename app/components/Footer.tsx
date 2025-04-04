import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="text-[#495057] text-sm text-center px-4 md:px-12 py-4 md:py-6 ">
        Made by Richwell Antwi &copy; {currentYear} . All rights reserved.
      </p>
     
    </footer>
  );
};

export default Footer;
