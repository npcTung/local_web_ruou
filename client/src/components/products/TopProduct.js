import React, { memo } from "react";
import { InputSelect } from "components";
import { sorts } from "ultils/contans";

const TopProduct = ({ limit, setLimit, sort, changeValue }) => {
  return (
    <div className="w-full py-3 border-b flex justify-between gap-5">
      <div className="flex gap-3 items-center">
        <span className="cursor-default">Hiện bởi: </span>
        <span
          className={`${
            limit === 12
              ? "text-black"
              : "text-gray-500 hover:text-black transition-all"
          } cursor-pointer`}
          onClick={() => setLimit(12)}
        >
          12 mục
        </span>
        <span
          className={`${
            limit === 24
              ? "text-black"
              : "text-gray-500 hover:text-black transition-all"
          } cursor-pointer`}
          onClick={() => setLimit(24)}
        >
          24 mục
        </span>
        <span
          className={`${
            limit === 48
              ? "text-black"
              : "text-gray-500 hover:text-black transition-all"
          } cursor-pointer`}
          onClick={() => setLimit(48)}
        >
          48 mục
        </span>
      </div>
      <div className="w-2/5 flex gap-3">
        <label htmlFor="sort" className="label label-text whitespace-nowrap">
          Sắp xếp theo:
        </label>
        <InputSelect
          value={sort}
          options={sorts}
          changeValue={changeValue}
          id={"sort"}
        />
      </div>
    </div>
  );
};

export default memo(TopProduct);
