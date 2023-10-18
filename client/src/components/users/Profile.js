import React, { memo } from "react";
import withBase from "hocs/withBase";
import icons from "ultils/icons";
import { showModal } from "store/app/appSlice";
import Avatar from "assets/user.png";
import { Link } from "react-router-dom";
import { logout } from "store/user/appSlice";
import moment from "moment/moment";
import path from "ultils/path";

const { MdOutlineClear } = icons;

const Profile = ({ dispatch, userData }) => {
  return (
    <div
      className="bg-white rounded-md relative animate-scale-in-center"
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="absolute right-1 top-1 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
        }}
      >
        <MdOutlineClear size={20} color="#ffffff" />
      </span>
      <div className="w-full flex flex-col gap-5">
        <h3 className="uppercase bg-sky-500 p-3 rounded-t-md text-white text-xl text-center font-semibold">
          tài khoản của bạn
        </h3>
        <div className="flex items-center justify-center relative">
          <div
            className={`w-[100px] h-[100px] rounded-full border p-1 ${
              userData.isBlocked
                ? "border-red-500 avatar-after-true"
                : "border-green-500 avatar-after-false"
            }`}
          >
            <img
              src={userData?.avatar || Avatar}
              alt={`Avatar ${userData?.firstName} ${userData?.lastName}`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 px-10">
          <span>{`Tên tài khoản: ${userData?.firstName} ${userData?.lastName}`}</span>
          <span>{`Mã thành viên: #${userData?._id}`}</span>
          <span>{`Ngày tạo: ${moment(userData?.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          )}`}</span>
        </div>
        <div className="flex items-center gap-2 bg-sky-500 text-white rounded-b-md p-3">
          <Link
            to={"#"}
            className="whitespace-nowrap hover:underline transition-all"
          >
            Thông tin tài khoản
          </Link>
          <span>/</span>
          {+userData?.role === 2002 && (
            <>
              <Link
                to={`/${path.ADMIN}/${path.DASH_BOARD}`}
                target="_blank"
                className="whitespace-nowrap hover:underline transition-all"
                onClick={() =>
                  dispatch(
                    showModal({ isShowModal: false, modalChildren: null })
                  )
                }
              >
                Quản trị viên
              </Link>
              <span>/</span>
            </>
          )}
          <Link
            to={"#"}
            className="whitespace-nowrap hover:underline transition-all"
          >
            Danh sách yêu thích
          </Link>
          <span>/</span>
          <span
            className="cursor-pointer whitespace-nowrap hover:underline transition-all"
            onClick={() => {
              dispatch(logout());
              dispatch(showModal({ isShowModal: false, modalChildren: null }));
            }}
          >
            Đăng xuất
          </span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Profile));
