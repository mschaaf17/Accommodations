import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="">
        &copy;{new Date().getFullYear()} by MSchaaf1
      </div>
    </footer>
  );
};

export default Footer;
