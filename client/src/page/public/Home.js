import React from "react";
import {
  Collection,
  NewProduct,
  ProductStandOut,
  SplideProduct,
} from "components";

const Home = () => {
  return (
    <div className="w-full">
      <div className="mt-10">
        <SplideProduct />
      </div>
      <div className="mt-10">
        <Collection />
      </div>
      <div className="mt-20">
        <ProductStandOut />
      </div>
      <div className="mt-20">
        <NewProduct />
      </div>
    </div>
  );
};

export default Home;
