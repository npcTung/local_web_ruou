import withBase from "hocs/withBase";
import React, { memo, useState } from "react";
import { showModal } from "store/app/appSlice";
import icons from "ultils/icons";
import NoProduct from "assets/no-product.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { createSlug, formatMoney } from "ultils/helpers";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import path from "ultils/path";

const { MdOutlineClear } = icons;

const QuickView = ({ data, dispatch }) => {
  const [showImage, setShowImage] = useState(null);
  return (
    <div
      className="grid grid-cols-2 gap-5 p-5 rounded-md bg-white relative w-1/2 h-1/2 animate-scale-in-center"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="absolute right-1 top-1 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
        }}
      >
        <MdOutlineClear size={20} />
      </span>
      <div className="col-span-1 w-full h-full flex flex-col gap-2">
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
        >
          <img
            src={showImage || data?.thumb || NoProduct}
            alt={data?.title.toLowerCase()}
            className="w-[323px] h-[323px] object-contain"
          />
        </Link>
        <Splide
          options={{
            rewind: true,
            fixedWidth: 104,
            fixedHeight: 100,
            isNavigation: true,
            gap: 10,
            focus: "center",
            pagination: false,
            dragMinThreshold: { mouse: 4, touch: 10 },
            breakpoints: { 640: { fixedHeight: 100, fixedWidth: 38 } },
          }}
        >
          {data?.images?.map((el, idx) => (
            <SplideSlide
              key={idx}
              className="w-full h-full"
              onClick={() => setShowImage(el)}
            >
              <img
                src={el || NoProduct}
                alt={data?.title.toLowerCase()}
                className="w-full h-full object-contain"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className="col-span-1 flex flex-col gap-5">
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
          className="text-2xl uppercase font-semibold text-gray-500 hover:text-black transition-all"
        >
          {data?.title}
        </Link>
        <span className="font-semibold">{`${formatMoney(
          data?.price
        )} VNĐ`}</span>
        {data?.description.length > 1 && (
          <span className="line-clamp-3">{data?.description}</span>
        )}
        {data?.description.length === 1 && (
          <div
            className="text-sm flex flex-col gap-2 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.description[0]),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default withBase(memo(QuickView));
