import React, { memo, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { createSlug } from "ultils/helpers";
import { useSelector } from "react-redux";
import { HomeProductNew } from "ultils/contans";

const Collection = () => {
  const [isHoverShow, setIsHoverShow] = useState(null);
  const { categories } = useSelector((state) => state.app);
  const data = categories?.concat(HomeProductNew);
  return (
    <Splide
      options={{ rewind: true, perPage: 3, type: "loop" }}
      aria-label="React Splide Example"
      className="pt-10 pb-5"
    >
      {data
        ?.filter((el) => el?.brand.length > 0)
        ?.map((el) => (
          <SplideSlide
            key={el._id}
            className="cursor-ew-resize"
            onMouseEnter={() => {
              setIsHoverShow(el._id);
            }}
            onMouseLeave={() => {
              setIsHoverShow(null);
            }}
          >
            <div className="w-full h-[600px] relative">
              <img
                src={el.image}
                alt={el.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="row-span-1 absolute inset-0 text-white bg-overlay50 flex items-center justify-center">
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <span className="text-2xl uppercase font-semibold">
                  {el.title}
                </span>
                {isHoverShow === el._id && (
                  <div className="flex flex-col items-center justify-center gap-3">
                    {el.brand.map((els, idx) => (
                      <Link
                        to={`/${path.PRODUCT}/${createSlug(el.title)}`}
                        key={idx}
                        className="text-gray-300 hover:text-white transition-all capitalize"
                      >
                        {els}
                      </Link>
                    ))}
                  </div>
                )}
                <Link
                  to={
                    el.title === "Trang chủ"
                      ? `/${path.HOME}`
                      : `/${path.PRODUCT}/${createSlug(el.title)}`
                  }
                  className="border rounded-md px-8 py-2 uppercase hover:bg-white hover:text-black transition-all font-medium"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </SplideSlide>
        ))}
    </Splide>
  );
};

export default memo(Collection);
