import React from "react";
import { Breadcrumbs, ProductSiderBar } from "components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSlug } from "ultils/helpers";

const ProductCategory = () => {
  const { category } = useParams();
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs
            product={"Danh sách sản phẩm"}
            category={
              categories?.find((el) => createSlug(el.title) === category).title
            }
          />
          <span className="text-xl uppercase font-semibold">
            {categories?.find((el) => createSlug(el.title) === category).title}
          </span>
        </div>
      </div>
      <div className="w-main mx-auto py-20 grid grid-cols-10">
        <ProductSiderBar />
        <div className="col-span-8">Product item</div>
      </div>
    </div>
  );
};

export default ProductCategory;
