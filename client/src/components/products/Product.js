import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import product from "assets/logo-image.png";
import { createSlug, formatMoney, renderStarFromNumber } from "ultils/helpers";
import path from "ultils/path";
import icons from "ultils/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as apis from "apis";
import withBase from "hocs/withBase";
import { QuickView } from "components";
import { showModal } from "store/app/appSlice";

const { HiHeart, ImSearch } = icons;

const Product = ({ data, rerender, dispatch }) => {
  const { currentData } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(null);
  const [wishlist, setWishlist] = useState(
    currentData?.wishlist
      ?.filter((el) => el._id === data._id)
      ?.map((el) => el._id)
      .toString() === data._id
      ? true
      : false
  );

  const handleWishlist = async () => {
    if (wishlist) {
      const response = await apis.apiRemoveWishlist(data?._id);
      if (response.success) {
        toast.success(
          `Xóa sản phẩm ${data?.title.toLowerCase()} ra khỏi danh sách yêu thích thành công`
        );
        setWishlist(false);
        rerender();
      } else {
        toast.error(response.mes);
        setWishlist(true);
      }
    } else {
      const ressponse = await apis.apiUpdateWishList(data?._id);
      if (ressponse.success) {
        toast.success(
          `Thêm sản phẩm ${data?.title.toLowerCase()} vào danh sách yêu thích thành công`
        );
        setWishlist(true);
        rerender();
      } else {
        toast.error(ressponse.mes);
        setWishlist(false);
      }
    }
  };

  return (
    <div
      className="col-span-1 p-2 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsShowOption(data._id)}
      onMouseLeave={() => setIsShowOption(null)}
    >
      <div className="w-full h-full overflow-hidden relative">
        {isShowOption && isShowOption === data?._id && (
          <div className="absolute bottom-6 right-3 left-3 flex items-center justify-between bg-white shadow-sm animate-slide-in-bottom rounded-md">
            <span
              className={`p-3 w-full flex justify-center text-xl ${
                wishlist
                  ? "text-white bg-red-500"
                  : "hover:text-white hover:bg-black text-gray-500 transition-all"
              } cursor-pointer rounded-l-md`}
              title="Thêm vào yêu thích"
              onClick={handleWishlist}
            >
              <HiHeart />
            </span>
            <span
              className="p-3 w-full flex justify-center text-xl hover:text-white hover:bg-black text-gray-500 transition-all cursor-pointer rounded-r-md"
              title="Xem nhanh"
              onClick={() =>
                dispatch(
                  showModal({
                    isShowModal: true,
                    modalChildren: <QuickView data={data} />,
                  })
                )
              }
            >
              <ImSearch />
            </span>
          </div>
        )}
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
          className="w-full h-full"
        >
          <img
            src={data?.thumb || product}
            alt={data?.title.toLowerCase()}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Link
          to={`/${path.PRODUCT}/${createSlug(data?.category)}/${data?._id}/${
            data?.slug
          }`}
          className="capitalize font-semibold line-clamp-2 hover:text-blue-500 transition-all"
        >
          {data?.title.toLowerCase()}
        </Link>
        <span>{`${formatMoney(data?.price)} VNĐ`}</span>
        <span className="flex items-center gap-1 text-yellow-500">
          {renderStarFromNumber(data?.totalRatings)}
        </span>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
