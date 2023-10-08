import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import product from "assets/logo-image.png";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import path from "ultils/path";
import { Button } from "components";
import icons from "ultils/icons";

const { BiSolidCartAdd, HiHeart, ImSearch } = icons;

const Product = ({ data }) => {
  const [isShowOption, setIsShowOption] = useState(null);
  return (
    <div
      className="col-span-1 p-2 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsShowOption(data._id)}
      onMouseLeave={() => setIsShowOption(null)}
    >
      <div className="w-full h-full overflow-hidden relative">
        {isShowOption && isShowOption === data?._id && (
          <>
            <div className="absolute top-6 right-3 left-3 flex items-center justify-between bg-white shadow-sm animate-slide-in-top">
              <span
                className="p-3 w-full flex justify-center text-xl hover:text-white hover:bg-black text-gray-500 transition-all cursor-pointer rounded-l-md"
                title="Thêm vào yêu thích"
              >
                <HiHeart />
              </span>
              <span
                className="p-3 w-full flex justify-center text-xl hover:text-white hover:bg-black text-gray-500 transition-all cursor-pointer rounded-r-md"
                title="Xem nhanh"
              >
                <ImSearch />
              </span>
            </div>
            <div className="absolute bottom-5 right-3 left-3 bg-white shadow-sm animate-slide-in-bottom">
              <Button
                wf
                name={"giỏ hàng"}
                iconAfter={<BiSolidCartAdd size={20} />}
                styles={`text-black bg-white border-white hover:border-black hover:bg-black hover:text-white transition-all`}
              />
            </div>
          </>
        )}
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
          className="w-full h-full"
        >
          <img
            src={data?.thumb || product}
            alt={data?.title.toLowerCase()}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
          className="capitalize font-semibold line-clamp-2 hover:text-blue-500 transition-all"
        >
          {data?.title.toLowerCase()}
        </Link>
        <span>{`${formatMoney(data?.price)} VNĐ`}</span>
        <span className="flex items-center gap-1 text-yellow-500">
          {renderStarFromNumber(data?.totalRatings)}
        </span>
      </div>
    </div>
  );
};

export default memo(Product);
