import React from "react";
import {
  Collection,
  Introduce,
  NewProduct,
  ProductStandOut,
  SplideProduct,
} from "components";
import { title_head } from "ultils/helpers";

const Home = () => {
  title_head();
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
      <div className="my-20">
        <Introduce />
      </div>
    </div>
  );
};

export default Home;
