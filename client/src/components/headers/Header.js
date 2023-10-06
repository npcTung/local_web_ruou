import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import path from "ultils/path";
import { Navigation, SeachHeader } from "components";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const { ImSearch } = icons;

const Header = ({ dispatch, fixed }) => {
  return (
    <div
      className={`w-full px-10 py-8 ${
        fixed && "fixed z-10 top-0 bg-white shadow-md"
      }`}
    >
      <div className="grid grid-rows-1 grid-cols-10">
        <NavLink
          to={`/${path.HOME}`}
          className={`col-span-2 flex items-center`}
        >
          <img
            src="https://res.cloudinary.com/npctungadmin/image/upload/v1696083922/quan-ly-ruou/logo_iyi91d.png"
            alt="logo"
          />
        </NavLink>
        <Navigation />
        <div className="text-gray-500 col-span-1 cursor-pointer flex justify-end">
          <span
            onClick={() =>
              dispatch(
                showModal({ isShowModal: true, modalChildren: <SeachHeader /> })
              )
            }
          >
            <ImSearch />
          </span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Header));
