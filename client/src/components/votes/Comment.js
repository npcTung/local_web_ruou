import React, { memo } from "react";
import avatar from "assets/user.png";
import icons from "ultils/icons";
import moment from "moment";
import "moment/locale/vi";
import { renderStarFromNumber } from "ultils/helpers";

const { BiTimeFive } = icons;

const Comment = ({ data, updated }) => {
  return (
    <div className="w-full grid grid-cols-10 gap-5 py-5 border-b">
      <div className="col-span-1 flex justify-center">
        <img
          src={data?.posteBy?.avatar || avatar}
          alt={`${data?.posteBy?.firstName} ${data?.posteBy?.lastName} avatar`}
          className="w-[50px] h-[50px] object-contain rounded-full"
        />
      </div>
      <div className="col-span-9 flex flex-col gap-5 w-full py-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">{`${data?.posteBy?.firstName} ${data?.posteBy?.lastName}`}</span>
          <span className="flex items-center gap-1 text-sm text-gray-400">
            <BiTimeFive size={20} />
            <span className="capitalize">{moment(updated).fromNow()}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1 text-yellow-500">
            {renderStarFromNumber(data?.star)}
          </span>
          <span className="text-sm">{data?.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
