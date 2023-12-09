import React, { memo, useState } from "react";
import { Button } from "components";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import path from "ultils/path";
import { createSearchParams } from "react-router-dom";

const { MdOutlineClear, ImSearch } = icons;

const SeachHeader = ({ dispatch, navigate }) => {
  const [querySearch, setQuerySearch] = useState({ q: "" });

  const handaleSearchProduct = () => {
    if (querySearch) {
      navigate({
        pathname: `${path.SEARCH_PRODUCT}`,
        search: createSearchParams(querySearch).toString(),
      });
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
    }
  };

  return (
    <div
      className="w-[700px] bg-white p-10 rounded-md relative animate-scale-in-center"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() =>
          dispatch(showModal({ isShowModal: false, modalChildren: null }))
        }
      >
        <MdOutlineClear size={20} />
      </span>
      <form className="w-full items-center grid grid-cols-10 gap-5">
        <div className="col-span-9">
          <input
            type="text"
            className="input input-bordered w-full"
            id="q"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => setQuerySearch({ q: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handaleSearchProduct()}
          />
        </div>
        <Button
          iconAfter={<ImSearch />}
          styles={"text-black bg-transparent border-transparent col-span-1"}
          handleOnClick={handaleSearchProduct}
        />
      </form>
    </div>
  );
};

export default withBase(memo(SeachHeader));
