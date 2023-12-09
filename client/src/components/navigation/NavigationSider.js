import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, createSearchParams } from "react-router-dom";
import { navigation } from "ultils/contans";
import { createSlug } from "ultils/helpers";
import path from "ultils/path";
import icons from "ultils/icons";
import withBase from "hocs/withBase";

const { MdKeyboardArrowDown, MdKeyboardArrowRight, ImSearch } = icons;

const NavigationSider = ({ navigate, handleClickSider }) => {
  const { categories } = useSelector((state) => state.app);
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [query, setQuery] = useState({ q: "" });

  const changeClickShowCategory = useCallback(() => {
    setIsShowCategory(!isShowCategory);
  }, [isShowCategory]);

  const handaleSearchProduct = () => {
    if (query) {
      navigate({
        pathname: `${path.SEARCH_PRODUCT}`,
        search: createSearchParams(query).toString(),
      });
      handleClickSider();
    }
  };

  return (
    <div className="flex flex-col gap-8 px-5 uppercase font-semibold text-lg">
      {navigation.map((el) => (
        <div key={el.id} className="border-b py-5 flex flex-col">
          <div className="flex justify-between items-center">
            <NavLink
              to={el.path}
              onClick={handleClickSider}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-black"
                    : "text-gray-500 hover:text-black transition-all"
                }`
              }
            >
              {el.title}
            </NavLink>
            <span onClick={changeClickShowCategory}>
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
          </div>
          {isShowCategory && el.title === "sản phẩm" && (
            <div className="p-3 w-full">
              <div className="flex flex-col gap-1 capitalize text-gray-500">
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
                      onClick={handleClickSider}
                    >
                      {el.title}
                    </NavLink>
                    <div className="flex flex-col font-normal text-[15px] gap-2">
                      {el.title === "Cửa hàng" && (
                        <Link
                          to={`${path.HOME}`}
                          className="w-[200px] h-[200px]"
                          onClick={handleClickSider}
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
      <div className="w-full relative">
        <input
          type="text"
          className="input input-bordered w-full pr-10 placeholder:text-sm"
          placeholder="Tìm kiếm sản phẩm của cửa hàng chúng tôi..."
          onChange={(e) => setQuery({ q: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handaleSearchProduct()}
        />
        <span
          className="text-lg absolute top-4 right-2 cursor-pointer"
          onClick={handaleSearchProduct}
        >
          <ImSearch />
        </span>
      </div>
    </div>
  );
};

export default withBase(memo(NavigationSider));
