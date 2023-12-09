import React, { memo } from "react";
import { InputSelect } from "components";
import { sorts } from "ultils/contans";

const limits = [12, 24, 48];

const TopProduct = ({ limit, setLimit, sort, changeValue }) => {
  return (
    <div className="w-full py-3 border-b flex justify-between gap-5">
      <div className="flex max-sm:flex-col gap-3 items-center">
        <span className="cursor-default">Hiện bởi: </span>
        {limits.map((el) => (
          <span
            key={el}
            className={`${
              limit === el
                ? "text-black"
                : "text-gray-500 hover:text-black transition-all"
            } cursor-pointer`}
            onClick={() => setLimit(el)}
          >
            {`${el} mục`}
          </span>
        ))}
      </div>
      <div className="w-2/5 flex max-sm:flex-col gap-3">
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
