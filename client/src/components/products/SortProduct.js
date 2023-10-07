import React, { memo, useEffect, useState } from "react";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
import { createSlug, formatMoney } from "ultils/helpers";
import path from "ultils/path";
import icons from "ultils/icons";
import withBase from "hocs/withBase";

const { MdOutlineClear } = icons;

const SortProduct = ({ data, navigate, category, location }) => {
  const [isShowOption, setIsShowOption] = useState(null);
  const sort = data?.find((el) => el._id === isShowOption);

  useEffect(() => {
    const queries = {};
    if (sort?.title) queries.color = sort.title;
    else delete queries.color;
    if (sort?.min) queries.min = sort.min;
    else delete queries.min;
    if (sort?.max) queries.max = sort.max;
    else delete queries.max;
    delete queries.page;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  }, [sort, category, location.pathname]);
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
                  isShowOption === el._id
                    ? "flex justify-between items-center text-red-500"
                    : "text-gray-500 hover:text-black transition-all"
                }`}
                title={
                  el.title ||
                  (el.min === 0 && `Dưới ${formatMoney(el.max)}`) ||
                  (el.max === 9999999 && `Trên ${formatMoney(el.min)}`) ||
                  `${formatMoney(el.min)} - ${formatMoney(el.max)}`
                }
              >
                <span
                  onClick={() => {
                    setIsShowOption(el._id);
                  }}
                >
                  {el.title ||
                    (el.min === 0 && `Dưới ${formatMoney(el.max)}`) ||
                    (el.max === 9999999 && `Trên ${formatMoney(el.min)}`) ||
                    `${formatMoney(el.min)} - ${formatMoney(el.max)}`}
                </span>
                {isShowOption === el._id && (
                  <span
                    onClick={() => {
                      setIsShowOption(null);
                    }}
                  >
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

export default withBase(memo(SortProduct));
