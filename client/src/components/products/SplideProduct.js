import React, { memo, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import path from "ultils/path";
import Product from "assets/logo-image.png";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import * as apis from "apis";

const SplideProduct = () => {
  const [productData, setProductData] = useState(null);
  const [isSplide, setIsSplide] = useState(false);

  const fetchAllProduct = async () => {
    const response = await apis.apiGetAllProduct({
      sort: "-totalRatings",
      limit: 7,
    });
    if (response.success) setProductData(response.products);
  };

  useEffect(() => {
    const widthPage = document.documentElement.clientWidth;
    if (widthPage < 640) setIsSplide(true);
    else setIsSplide(false);
  }, []);

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <Splide
      options={{
        rewind: true,
        perPage: isSplide ? 1 : 3,
        type: "loop",
        autoplay: true,
        focus: "center",
      }}
      aria-label="React Splide Example"
      className="pt-10 px-5 pb-5"
    >
      {productData?.map((el) => (
        <SplideSlide
          key={el?._id}
          className="grid grid-rows-6 cursor-ew-resize"
        >
          <Link
            to={`/${path.PRODUCT}/${createSlug(el?.category)}/${el?._id}/${
              el?.slug
            }`}
            className="row-span-5 p-2"
          >
            <img
              src={el?.thumb || Product}
              alt={el?.title.toLowerCase()}
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="flex flex-col items-center gap-3 row-span-1 pb-5">
            <Link
              to={`/${path.PRODUCT}/${el?.category.toLowerCase()}/${el?._id}/${
                el?.slug
              }`}
              className="capitalize text-lg font-medium text-black hover:text-blue-500 transition-all"
            >
              {el?.title.toLowerCase()}
            </Link>
            <span>{`${formatMoney(el?.price)} VND`}</span>
            <span className="flex items-center gap-1 text-yellow-500">
              {renderStarFromNumber(el?.totalRatings)}
            </span>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default memo(SplideProduct);
