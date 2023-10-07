import React from "react";
import { Breadcrumbs } from "components";

const News = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Tin tức"} />
          <span className="text-xl uppercase font-semibold">Tin tức</span>
        </div>
      </div>
      <div className="w-main mx-auto grid grid-cols-2 grid-rows-2 gap-10 py-40">
        <div className="row-span-1 col-span-1 flex flex-col justify-center gap-10">
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1696671633/quan-ly-ruou/img-pavblog-700x326_grande_cmwrxw.jpg"
              alt="bg-news-1"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold hover:text-gray-500 transition-all cursor-pointer">
              Những loại rượu vang thượng hạng được láy từ nước Ý
            </span>
            <span className="opacity-70">By:Wine House</span>
            <span>
              Emily Weiss (Into The Gloss) là sáng lập viên kiêm CEO của hãng mỹ
              phẩm Glossier dành cho phái đẹp. 8X là nhân vật có...
            </span>
          </div>
        </div>
        <div className="row-span-1 col-span-1 flex flex-col justify-center gap-10">
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1696671633/quan-ly-ruou/img-pavblog2-700x326_grande_nfpvkn.jpg"
              alt="bg-news-2"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold hover:text-gray-500 transition-all cursor-pointer">
              Loại rượu vang được mọi người yêu thích nhất
            </span>
            <span className="opacity-70">By:Wine House</span>
            <span>
              Emily Weiss (Into The Gloss) là sáng lập viên kiêm CEO của hãng mỹ
              phẩm Glossier dành cho phái đẹp. 8X là nhân vật có...
            </span>
          </div>
        </div>
        <div className="row-span-1 col-span-1 flex flex-col justify-center gap-10">
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1696671632/quan-ly-ruou/img-pavblog3-700x326_grande_xkidp2.jpg"
              alt="bg-news-3"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold hover:text-gray-500 transition-all cursor-pointer">
              Vị ngon của những loại vang năm 1873
            </span>
            <span className="opacity-70">By:Wine House</span>
            <span>
              Emily Weiss (Into The Gloss) là sáng lập viên kiêm CEO của hãng mỹ
              phẩm Glossier dành cho phái đẹp. 8X là nhân vật có...
            </span>
          </div>
        </div>
        <div className="row-span-1 col-span-1 flex flex-col justify-center gap-10">
          <div className="w-full">
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1696672010/quan-ly-ruou/img-pavblog1-700x326_grande_ubhw97.jpg"
              alt="bg-news-4"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold hover:text-gray-500 transition-all cursor-pointer">
              Đi du lịch và thưởng thức vị ngon của Woodbridgi
            </span>
            <span className="opacity-70">By:Wine House</span>
            <span>
              Emily Weiss (Into The Gloss) là sáng lập viên kiêm CEO của hãng mỹ
              phẩm Glossier dành cho phái đẹp. 8X là nhân vật có...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
