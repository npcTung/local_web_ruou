import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colorProduct, sortPrice } from "ultils/contans";
import { SortProduct } from "components";
import * as apis from "apis";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import Product from "assets/logo-image.png";

const ProductSiderBar = () => {
  const { categories } = useSelector((state) => state.app);
  const [productData, setProductData] = useState(null);
  const fetchAllProducts = async () => {
    const response = await apis.apiGetAllProduct({ sort: "sold", limit: 5 });
    if (response.success) setProductData(response.products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="col-span-2">
      <div className="w-full border-b pb-6 flex flex-col gap-8">
        <h3 className="text-lg font-bold">Danh Mục</h3>
        <SortProduct data={categories} />
      </div>
      <div className="w-full border-b py-6 flex flex-col gap-8">
        <h3 className="text-lg font-bold">Màu Sắc</h3>
        <SortProduct data={colorProduct} />
      </div>
      <div className="w-full border-b py-6 flex flex-col gap-8">
        <h3 className="text-lg font-bold">Thương Hiệu</h3>
        <SortProduct data={sortPrice} />
      </div>
      <div className="w-full py-6 flex flex-col gap-8">
        <h3 className="text-lg font-bold">Sản Phẩm Nổi Bật</h3>
        {productData &&
          productData?.map((el) => (
            <div key={el._id} className="w-full h-20 flex items-center">
              <Link
                to={`/${path.PRODUCT}/${createSlug(el.category)}/${el._id}/${
                  el.slug
                }`}
                className="w-20 h-20"
              >
                <img
                  src={el.thumb || Product}
                  alt={el.title}
                  className="w-full h-full object-contain"
                />
              </Link>
              <div className="flex flex-col h-20">
                <Link
                  to={`/${path.PRODUCT}/${createSlug(el.category)}/${el._id}/${
                    el.slug
                  }`}
                  title={el.title.toLowerCase()}
                  className="capitalize text-sm line-clamp-1 pb-1 border-b border-gray-400 text-gray-500 hover:text-black transition-all"
                >
                  {el?.title.toLowerCase()}
                </Link>
                <span className="pt-2">{`${formatMoney(el.price)} VNĐ`}</span>
                <span className="pt-2 flex gap-1 text-yellow-500">
                  {renderStarFromNumber(el.totalRatings, 13)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ProductSiderBar);
