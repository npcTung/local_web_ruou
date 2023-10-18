import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { footerInfo, iconFooter } from "ultils/contans";
import path from "ultils/path";
import icons from "ultils/icons";

const { HiArrowLongRight } = icons;

const Footer = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState(null);
  const handlerEmail = () => {
    if (email) {
      toast.success(`Nhận email thành công.`);
      setEmail(null);
    } else toast.warn("Bạn cần nhập email trước khi gửi.");
  };
  return (
    <div className="grid grid-cols-6 gap-10">
      <div className="col-span-2 flex justify-between p-20">
        {footerInfo.map((el) => (
          <div key={el.id} className="flex flex-col gap-10">
            <h3 className="text-xl uppercase font-bold">{el.title}</h3>
            <div className="flex flex-col justify-center items-start gap-3 capitalize">
              {el.value.map((els, idx) => (
                <Link
                  to={`/${path.HOME}`}
                  key={idx}
                  className="text-gray-500 hover:text-black transition-all "
                >
                  {els}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-2 p-20 flex flex-col gap-10">
        <h3 className="text-xl uppercase font-bold">bản tin</h3>
        <div className="w-full relative flex items-center">
          <input
            type="email"
            className="p-2 border-b-2 border-black pr-10 w-full outline-none"
            placeholder="Nhập email..."
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlerEmail()}
          />
          <span
            className="absolute right-2 cursor-pointer"
            onClick={handlerEmail}
          >
            <HiArrowLongRight size={20} />
          </span>
        </div>
        <ul className="flex gap-10 items-center h-5">
          {iconFooter.map((el, idx) => (
            <li
              key={idx}
              className="text-gray-500 hover:text-black hover:pb-2 transition-all"
            >
              {el}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 items-center justify-center">
          <span>2016 EngoTheme. All Rights Reserved</span>
          <span>Powered by Haravan</span>
        </div>
      </div>
      <div
        className="col-span-2 relative"
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <img
          src="https://res.cloudinary.com/npctungadmin/image/upload/v1696575307/quan-ly-ruou/footer_story_content_fpfzna.jpg"
          alt="backgroud"
          className="w-full h-[422px] object-cover"
        />
        <div className="absolute inset-0 text-white p-20 flex flex-col gap-10">
          <span className="uppercase text-xl font-bold">về chúng tôi</span>
          {isShow && (
            <span className="animate-fade-in">
              Chúng tôi luôn cam kết với khách hàng mang lại các sản phẩm với
              giá cả phải chăng, trên hết là chất lượng vượt trội , uy tín là số
              1.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
