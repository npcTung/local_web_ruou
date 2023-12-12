import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "components";
import { useSelector } from "react-redux";
import { createSlug, formatMoney, title_head } from "ultils/helpers";
import icons from "ultils/icons";
import path from "ultils/path";
import { Link } from "react-router-dom";
import * as apis from "apis";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/asyncActions";

const { BsStarFill, RiDeleteBin6Line } = icons;

const WishList = ({ dispatch }) => {
  const { currentData } = useSelector((state) => state.user);
  const [wishlistData, setWishlistData] = useState(null);

  const handleDeleteWishlist = async (data) => {
    const response = await apis.apiRemoveWishlist(data._id);
    if (response.success) {
      toast.success(
        `Xóa sản phẩm ${data.title.toLowerCase()} khỏi danh sách sản phẩm yêu thích thành công`
      );
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  useEffect(() => {
    setWishlistData(currentData?.wishlist);
  }, [currentData]);

  title_head("Wish List");

  return (
    <div className="w-full pb-10">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Sản phẩm yêu thích"} />
          <span className="text-xl uppercase font-semibold">
            Sản phẩm yêu thích
          </span>
        </div>
      </div>
      <div className="w-main mx-auto py-10">
        <table id="table-wishlist" className="table table-zebra">
          <thead className="text-sm capitalize font-semibold text-white bg-sky-500">
            <tr>
              <th></th>
              <th>tên sản phẩm</th>
              <th>giá(VND)</th>
              <th>đánh giá</th>
              <td></td>
              <th>hành động</th>
            </tr>
          </thead>
          <tbody>
            {wishlistData &&
              wishlistData.map((el) => (
                <tr key={el._id}>
                  <td>
                    <img
                      src={el.thumb}
                      alt={el.title.toLowerCase()}
                      className="w-[60px] h-[60px] object-contain rounded-md"
                    />
                  </td>
                  <td>
                    <Link
                      className="capitalize hover:underline hover:text-blue-500 transition-all"
                      to={`/${path.PRODUCT}/${createSlug(el.category)}/${
                        el._id
                      }/${el.slug}`}
                    >
                      {el.title.toLowerCase()}
                    </Link>
                  </td>
                  <td>{formatMoney(el.price)}</td>
                  <td className="whitespace-nowrap flex items-center gap-1">
                    <span className="text-yellow-500">
                      <BsStarFill />
                    </span>
                    <span>{el.totalRatings}</span>
                    {el.ratings.length > 0 && (
                      <span className="opacity-70 whitespace-nowrap">{`(${el.ratings.length} đánh giá)`}</span>
                    )}
                  </td>
                  <td></td>
                  <td className="flex items-center justify-center">
                    <span
                      className="text-white p-2 rounded-md bg-red-500 cursor-pointer"
                      title="Xóa sản phẩm khỏi danh sách yêu thích"
                      onClick={() => handleDeleteWishlist(el)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withBase(WishList);
