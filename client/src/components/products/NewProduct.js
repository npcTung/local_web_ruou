import React, { memo, useEffect, useState } from "react";
import Wrapper from "assets/wrapper.svg";
import { Link } from "react-router-dom";
import path from "ultils/path";
import * as apis from "apis";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import Product from "assets/logo-image.png";

const NewProduct = () => {
  const [productData, setProductData] = useState(null);
  const [isHoverShow, setIsHoverShow] = useState(null);
  const fetchAllProducts = async () => {
    const response = await apis.apiGetAllProduct({
      sort: "-createdAt",
      limit: 8,
    });
    if (response.success) setProductData(response.products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-[100px] h-[50px]">
          <img
            src={Wrapper}
            alt="Wrapper"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold uppercase">Sản phẩm mới</h1>
        <Link to={`/${path.PRODUCT}`} className="text-lg uppercase">
          xem thêm
        </Link>
      </div>
      <div className="w-full my-10">
        <div className="grid grid-rows-2 grid-cols-4">
          {productData?.map((el) => (
            <div
              key={el?._id}
              className="row-span-1 col-span-1 flex items-center gap-5 relative"
            >
              <img
                src={el?.thumb || Product}
                alt={el?.title}
                className="w-full h-full object-contain"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsHoverShow(el._id);
                }}
              />
              {isHoverShow === el._id && (
                <Link
                  to={`/${path.PRODUCT}/${createSlug(el?.category)}/${
                    el?._id
                  }/${el?.slug}`}
                  className={`flex flex-col items-center justify-center gap-2 absolute inset-0 bg-overlay50 ${
                    isHoverShow === el._id && "animate-fade-in"
                  }`}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setIsHoverShow(null);
                  }}
                >
                  <span className="capitalize font-semibold text-white line-clamp-2">
                    {el?.title.toLowerCase()}
                  </span>
                  <span className="whitespace-nowrap text-white">{`${formatMoney(
                    el?.price
                  )} VNĐ`}</span>
                  <span className="flex gap-1 text-yellow-500">
                    {renderStarFromNumber(el?.totalRatings)}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(NewProduct);
