import withBase from "hocs/withBase";
import React, { memo } from "react";
import { showModal } from "store/app/appSlice";
import icons from "ultils/icons";

const { MdOutlineClear } = icons;

const EditUserAdmin = ({ data, dispatch }) => {
  return (
    <div
      className="p-5 bg-white rounded-md animate-scale-in-center w-[60%]"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b py-5]">
        <span className="capitalize">{`sửa thông tin người dùng "${data?.firstName} ${data?.lastName}"`}</span>
        <span
          className="cursor-pointer"
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
          }
        >
          <MdOutlineClear />
        </span>
      </h1>
      <div className="w-full">aaaa</div>
    </div>
  );
};

export default withBase(memo(EditUserAdmin));
