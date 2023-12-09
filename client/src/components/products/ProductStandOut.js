import React, { memo, useEffect, useState } from "react";
import Wrapper from "assets/wrapper.svg";
import { Link } from "react-router-dom";
import path from "ultils/path";
import * as apis from "apis";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import Product from "assets/logo-image.png";

const ProductStandOut = () => {
  const [productData, setProductData] = useState(null);
  const fetchAllProducts = async () => {
    const response = await apis.apiGetAllProduct({ sort: "sold", limit: 9 });
    if (response.success) setProductData(response.products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="sm:w-main mx-auto">
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-[100px] h-[50px]">
          <img
            src={Wrapper}
            alt="Wrapper"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold uppercase">Sản phẩm nổi bật</h1>
        <Link to={`/${path.PRODUCT}`} className="text-lg uppercase">
          xem thêm
        </Link>
      </div>
      <div className="w-full my-10">
        <div className="sm:grid sm:grid-rows-3 sm:grid-cols-3 gap-5">
          {productData?.map((el) => (
            <div
              key={el?._id}
              className="sm:row-span-1 sm:col-span-1 flex max-sm:flex-col max-sm:justify-center max-sm:py-3 sm:items-center gap-5"
            >
              <Link
                to={`/${path.PRODUCT}/${createSlug(el?.category)}/${el?._id}/${
                  el?.slug
                }`}
              >
                <img src={el?.thumb || Product} alt={el?.title} />
              </Link>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/${path.PRODUCT}/${createSlug(el?.category)}/${
                    el?._id
                  }/${el?.slug}`}
                  className="capitalize font-semibold text-gray-500 hover:text-black transition-all line-clamp-2"
                >
                  {el?.title.toLowerCase()}
                </Link>
                <span className="whitespace-nowrap">{`${formatMoney(
                  el?.price
                )} VNĐ`}</span>
                <span className="flex gap-1 text-yellow-500">
                  {renderStarFromNumber(el?.totalRatings)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductStandOut);
