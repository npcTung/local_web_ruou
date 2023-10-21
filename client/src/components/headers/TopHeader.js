import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import path from "ultils/path";
import Avatar from "assets/user.png";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import { Profile } from "components";
import Swal from "sweetalert2";
import { clearMessages } from "store/user/appSlice";

const TopHeader = ({ dispatch, navigate }) => {
  const { isLoggedIn, currentData, mes } = useSelector((state) => state.user);

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        navigate(`/${path.LOGIN}`);
        dispatch(clearMessages());
      });
  }, [mes, navigate, dispatch]);

  return (
    <div
      className={`w-full flex items-center ${
        isLoggedIn ? "justify-between" : "justify-end"
      } uppercase font-semibold border px-5`}
    >
      {isLoggedIn && currentData && (
        <div className="flex py-5 gap-3 items-center">
          <div
            className={`w-[35px] h-[35px] rounded-full border p-[1px] ${
              currentData.isBlocked ? "border-red-500" : "border-green-500"
            }`}
          >
            <img
              src={currentData?.avatar || Avatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      )}
      <div className="flex">
        {isLoggedIn ? (
          <>
            <div className="px-3 py-5 border-r text-gray-500 hover:text-black transition-all">
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    showModal({
                      isShowModal: true,
                      modalChildren: <Profile userData={currentData} />,
                    })
                  );
                }}
              >
                Tài khoản
              </span>
            </div>
            <div className="px-3 py-5 text-gray-500 hover:text-black transition-all">
              <Link to={`/${path.WISH_LIST}`}>Yêu thích</Link>
            </div>
          </>
        ) : (
          <>
            <div className="px-3 py-5 border-x text-gray-500 hover:text-black transition-all cursor-pointer">
              <span onClick={() => goLogin(false)}>Đăng nhập</span>
            </div>
            <div className="px-3 py-5 text-gray-500 hover:text-black transition-all cursor-pointer">
              <span onClick={() => goLogin(true)}>Đăng ký</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(TopHeader));
