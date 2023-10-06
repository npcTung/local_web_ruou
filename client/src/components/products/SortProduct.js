import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "ultils/helpers";
import path from "ultils/path";
import icons from "ultils/icons";

const { MdOutlineClear } = icons;

const SortProduct = ({ data }) => {
  const [isShowSort, setIsShowSort] = useState(null);
  return (
    <div className="w-full">
      <ul className="flex flex-col justify-center gap-3 capitalize">
        {data?.map((el) => (
          <li key={el._id} className="cursor-pointer">
            {el.image ? (
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
                title={el.title === "Cửa hàng" ? "Trang chủ" : el.title}
              >
                {el.title === "Cửa hàng" ? "Trang chủ" : el.title}
              </NavLink>
            ) : (
              <span
                className={`${
                  isShowSort === el._id
                    ? "flex justify-between items-center text-red-500"
                    : "text-gray-500 hover:text-black transition-all"
                }`}
                title={el.title}
              >
                <span onClick={() => setIsShowSort(el._id)}>{el.title}</span>
                {isShowSort === el._id && (
                  <span onClick={() => setIsShowSort(null)}>
                    <MdOutlineClear />
                  </span>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SortProduct);
