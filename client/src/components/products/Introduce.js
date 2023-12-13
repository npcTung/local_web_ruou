import React, { memo, useState } from "react";
import Wrapper from "assets/wrapper.svg";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { toast } from "react-toastify";

const { HiArrowLongRight } = icons;

const Introduce = () => {
  const [email, setEmail] = useState(null);
  const handlerEmail = () => {
    if (email) {
      toast.success(`Nhận email thành công.`);
      setEmail(null);
    } else toast.warn("Bạn cần nhập email trước khi gửi.");
  };
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
        <h1 className="text-3xl font-semibold uppercase">Giới thiệu</h1>
        <Link to={`/${path.PRODUCT}`} className="text-lg uppercase">
          xem cửa hàng của chúng tôi
        </Link>
      </div>
      <div className="sm:grid sm:grid-rows-2 sm:grid-cols-3 gap-6 mt-5">
        <div className="relative row-span-1 col-span-2">
          <img
            src="https://res.cloudinary.com/npctungadmin/image/upload/v1702480329/quan-ly-ruou/about_us_newsletter_about_background_ffvhgg.jpg"
            alt="introduce_1"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col gap-3 text-white p-20">
            <h3 className="uppercase text-xl font-bold">
              chúng tôi là wine house
            </h3>
            <span>
              Chúng tôi luôn cam kết với khách hàng mang lại các sản phẩm với
              giá cả phải chăng, trên hết là chất lượng vượt trội , uy tín là số
              1.
            </span>
          </div>
        </div>
        <div className="row-span-1 col-span-1 border-2 border-gray-300 p-10 flex flex-col items-center justify-center gap-10">
          <h3 className="uppercase text-xl font-bold">bản tin</h3>
          <span>
            Đăng ký bản tin để cập nhật những tin tức mới và hay nhất. Được nhận
            nhiều ưu đãi hấp dẫn từ chúng tôi
          </span>
          <div className="w-full relative flex flex-col justify-center">
            <input
              type="text"
              className="w-full input input-bordered pr-10"
              placeholder="Nhập email của bạn..."
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlerEmail()}
            />
            <span
              className="absolute right-2 cursor-pointer text-lg"
              onClick={handlerEmail}
            >
              <HiArrowLongRight />
            </span>
          </div>
        </div>
        <div className="row-span-1 col-span-1">
          <Link to={`/${path.PRODUCT}`}>
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1702480383/quan-ly-ruou/interactive_banner_v2_image_1_u0kr3n.jpg"
              alt="introduce_2"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="row-span-1 col-span-1">
          <Link to={`/${path.PRODUCT}`}>
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1702480384/quan-ly-ruou/interactive_banner_v2_image_2_xuyart.jpg"
              alt="introduce_3"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="row-span-1 col-span-1">
          <Link to={`/${path.PRODUCT}`}>
            <img
              src="https://res.cloudinary.com/npctungadmin/image/upload/v1702480384/quan-ly-ruou/interactive_banner_v2_image_3_sqievc.jpg"
              alt="introduce_4"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Introduce);
