import React, { memo, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import path from "ultils/path";
import { Navigation, NavigationSider, SeachHeader } from "components";
import icons from "ultils/icons";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const { ImSearch, BsList, MdOutlineClear } = icons;

const Header = ({ dispatch, fixed }) => {
  const [isClickSider, setIsClickSider] = useState(false);

  const handleClickSider = useCallback(() => {
    setIsClickSider(!isClickSider);
  }, [isClickSider]);

  useEffect(() => {
    if (isClickSider) window.onscroll = () => window.scrollTo(0, 0);
    else window.onscroll = null;
  }, [isClickSider]);

  return (
    <div
      className={`w-full px-10 py-8 ${
        fixed && "fixed z-10 top-0 bg-white shadow-md"
      }`}
    >
      <div className="sm:grid sm:grid-rows-1 sm:grid-cols-10 max-sm:flex max-sm:justify-between max-sm:items-center">
        <NavLink
          to={`/${path.HOME}`}
          className={`sm:col-span-2 flex items-center max-sm:w-[200px]`}
        >
          <img
            src="https://res.cloudinary.com/npctungadmin/image/upload/v1696083922/quan-ly-ruou/logo_iyi91d.png"
            alt="logo"
            className="w-[200px] object-contain"
          />
        </NavLink>
        <Navigation />
        <div className="text-gray-500 col-span-1 cursor-pointer flex justify-end max-sm:hidden">
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
        <div className="sm:hidden flex items-center relative">
          <span className="text-2xl cursor-pointer" onClick={handleClickSider}>
            {isClickSider ? <MdOutlineClear /> : <BsList />}
          </span>
        </div>
        {isClickSider && (
          <div className="flex flex-col overflow-y-scroll absolute top-[90px] bottom-0 right-0 left-0 bg-white z-20">
            <NavigationSider handleClickSider={handleClickSider} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(Header));
