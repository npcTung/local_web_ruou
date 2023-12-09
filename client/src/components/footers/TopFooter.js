import React, { memo, useState } from "react";

const TopFooter = () => {
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  return (
    <div className="w-full bg-[#f6f6f6]">
      <div className="sm:w-main mx-auto">
        <div className="py-20 flex max-sm:flex-col items-center justify-between gap-10">
          <div
            className="w-full h-28 bg-white shadow-md rounded-sm flex flex-col items-center justify-center p-10 cursor-default overflow-hidden"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsHover1(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsHover1(false);
            }}
          >
            {isHover1 ? (
              <span className="text-gray-400 animate-slide-in-top">
                Với đơn hàng trên 5.000.000 VNĐ
              </span>
            ) : (
              <span className="uppercase text-2xl font-semibold animate-slide-out-bottom">
                Miễn phí vận chuyển
              </span>
            )}
          </div>
          <div
            className="w-full h-28  bg-white shadow-md rounded-sm flex flex-col items-center justify-center p-10 cursor-default overflow-hidden"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsHover2(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsHover2(false);
            }}
          >
            {isHover2 ? (
              <span className="text-gray-400 animate-slide-in-top">
                Hoàn lại 100% tiền trong vòng 30 ngày
              </span>
            ) : (
              <span className="uppercase text-2xl font-semibold animate-slide-out-bottom">
                Đổi trả hàng miễn phí
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TopFooter);
