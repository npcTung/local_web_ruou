import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "ultils/contans";
import { createSlug } from "ultils/helpers";
import path from "ultils/path";
import icons from "ultils/icons";

const { MdKeyboardArrowDown, MdKeyboardArrowRight } = icons;

const Navigation = () => {
  const { categories } = useSelector((state) => state.app);
  const [isShowCategory, setIsShowCategory] = useState(false);
  return (
    <div className="flex items-center justify-start gap-8 px-5 col-span-7 uppercase font-semibold text-lg relative">
      {navigation.map((el) => (
        <div
          key={el.id}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShowCategory(el.title === "sản phẩm" ? true : false);
          }}
        >
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              `${
                isActive ? "text-black" : "text-gray-500"
              } hover:text-black transition-all`
            }
          >
            <span className="flex justify-between items-center">
              <span className="pr-3">{el.title}</span>
              {el.title === "sản phẩm" && (
                <span>
                  {isShowCategory ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              )}
            </span>
          </NavLink>
          {isShowCategory && el.title === "sản phẩm" && (
            <div
              className="absolute top-16 left-0 shadow-md p-3 bg-white w-full animate-slide-top z-20"
              onMouseLeave={(e) => {
                e.stopPropagation();
                setIsShowCategory(false);
              }}
            >
              <div className="flex justify-between gap-5 capitalize text-gray-500">
                {categories?.map((el) => (
                  <div key={el._id} className="flex flex-col gap-5">
                    <NavLink
                      to={
                        el.title === "Cửa hàng"
                          ? `/${path.HOME}`
                          : `/${path.PRODUCT}/${createSlug(el.title)}`
                      }
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-black" : "text-gray-500"
                        } hover:text-black transition-all`
                      }
                    >
                      {el.title}
                    </NavLink>
                    <div className="flex flex-col font-normal text-[15px] gap-2">
                      {el.title &&
                        el.brand?.map((els, idx) => (
                          <NavLink
                            to={`/${path.PRODUCT}/${createSlug(el.title)}`}
                            key={idx}
                            className={({ isActive }) =>
                              `${
                                isActive ? "text-black" : "text-gray-500"
                              } hover:text-black transition-all`
                            }
                          >
                            {els}
                          </NavLink>
                        ))}
                      {el.title === "Cửa hàng" && (
                        <Link
                          to={`${path.HOME}`}
                          className="w-[200px] h-[200px]"
                        >
                          <img
                            src={el?.image}
                            alt="home"
                            className="w-full h-full object-contain"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Navigation);
