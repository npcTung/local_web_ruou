import React from "react";
import { Outlet } from "react-router-dom";
import { Header, TopHeader } from "components";

const Public = () => {
  return (
    <div>
      <header id="header" className="shadow-md">
        <TopHeader />
        <Header />
      </header>
      <main id="main-product" className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Public;
