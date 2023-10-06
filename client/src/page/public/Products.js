import React from "react";
import { Breadcrumbs, ProductSiderBar, TopProduct } from "components";

const Products = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Danh sách sản phẩm"} />
          <span className="text-xl uppercase font-semibold">Sản phẩm</span>
        </div>
      </div>
      <div className="w-main mx-auto py-20 grid grid-cols-10">
        <ProductSiderBar />
        <div className="col-span-8">
          <TopProduct />
        </div>
      </div>
    </div>
  );
};

export default Products;
