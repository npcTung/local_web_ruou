import React, { memo, useEffect, useRef } from "react";
import icons from "ultils/icons";

const { BsStarFill } = icons;

const VoteBar = ({ number, ratingTotal, ratingCount }) => {
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText =
      ratingTotal > 0
        ? `right: ${100 - Math.round((ratingCount * 100) / ratingTotal)}%`
        : "right: 100%";
  });
  return (
    <div className="w-full grid grid-cols-10 justify-center items-center gap-2">
      <div className="col-span-1 flex items-center justify-center">
        <span className="flex items-center gap-1">
          <span className="font-medium w-3">{number}</span>
          <BsStarFill color="#EAB308" size={20} />
        </span>
      </div>
      <div className="col-span-8 bg-gray-200 rounded-full h-2 relative">
        <div
          className="inset-0 bg-red-500 rounded-full h-2 absolute"
          ref={percentRef}
        ></div>
      </div>
      <div className="col-span-1 px-1">
        <span className="whitespace-nowrap text-sm">{`${
          ratingCount || 0
        } đánh giá`}</span>
      </div>
    </div>
  );
};

export default memo(VoteBar);
