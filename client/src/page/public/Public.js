import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, TopFooter, TopHeader } from "components";

const Public = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 77) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [77]);
  return (
    <div>
      <header id="header-product" className="shadow-md">
        <TopHeader />
        <Header fixed={isFixed} />
      </header>
      <main id="main-product" className="w-full">
        <Outlet />
      </main>
      <footer id="footer-product" className="w-full">
        <TopFooter />
        <Footer />
      </footer>
    </div>
  );
};

export default Public;
