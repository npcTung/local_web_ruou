import React, { memo } from "react";
import { Button } from "components";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const { MdOutlineClear, ImSearch } = icons;

const SeachHeader = ({ dispatch }) => {
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
          />
        </div>
        <Button
          iconAfter={<ImSearch />}
          type="submit"
          styles={"text-black bg-transparent border-transparent col-span-1"}
        />
      </form>
    </div>
  );
};

export default withBase(memo(SeachHeader));
