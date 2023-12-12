import { Breadcrumbs } from "components";
import React from "react";
import { title_head } from "ultils/helpers";

const Introduce = () => {
  title_head("Giới thiệu");
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Giới thiệu"} />
          <span className="text-xl uppercase font-semibold">Giới thiệu</span>
        </div>
      </div>
      <div className="w-main mx-auto grid grid-cols-2 gap-10 my-20">
        <div className="col-span-1 flex items-center">
          <img
            src="https://res.cloudinary.com/npctungadmin/image/upload/v1696502432/quan-ly-ruou/collection_carousel_background_6_v4pbtx.jpg"
            alt="backgroud-introduce"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="col-span-1 flex flex-col gap-10">
          <span>
            Trang giới thiệu giúp khách hàng hiểu rõ hơn về cửa hàng của bạn.
            Hãy cung cấp thông tin cụ thể về việc kinh doanh, về cửa hàng, thông
            tin liên hệ. Điều này sẽ giúp khách hàng cảm thấy tin tưởng khi mua
            hàng trên website của bạn.
          </span>
          <span>Một vài gợi ý cho nội dung trang Giới thiệu:</span>
          <ul className="list-item list-disc">
            <li className="py-3">Bạn là ai</li>
            <li className="py-3">Giá trị kinh doanh của bạn là gì</li>
            <li className="py-3">Địa chỉ cửa hàng</li>
            <li className="py-3">
              Bạn đã kinh doanh trong ngành hàng này bao lâu rồi
            </li>
            <li className="py-3">Đội ngũ của bạn gồm những ai</li>
            <li className="py-3">Thông tin liên hệ</li>
            <li className="py-3">
              Liên kết đến các trang mạng xã hội (Twitter, Facebook)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
