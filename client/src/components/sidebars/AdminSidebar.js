import React, { Fragment, memo, useCallback, useState } from "react";
import Logo from "assets/logo.png";
import { adminSidebar } from "ultils/contans";
import { NavLink } from "react-router-dom";
import icons from "ultils/icons";

const { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } = icons;

const Active =
  "flex items-center gap-2 border-b w-full bg-blue-600 text-white hover:bg-blue-600 hover:text-white transition-all";
const notActive =
  "flex items-center gap-2 border-b w-full hover:bg-blue-600 hover:text-white transition-all";

const AdminSidebar = () => {
  const [activeClick, setActiveClick] = useState(false);

  const changeActiveFilter = useCallback(() => {
    setActiveClick(!activeClick);
  }, [activeClick]);

  return (
    <div className="w-[20%] fixed top-0 bottom-0 border-r">
      <div className="w-full flex flex-col items-center justify-center gap-2 border-b px-6 py-[34px] bg-gray-50">
        <img src={Logo} alt="Logo" className="w-[200px] object-contain" />
        <small className="capitalize text-center ">
          không gian làm việc của quản trị viên
        </small>
      </div>
      <div className="flex flex-col w-full items-start justify-center">
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `py-2 px-4 ${isActive ? Active : notActive}`
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PAREMT" && (
              <div className="w-full">
                <div
                  className={`py-2 px-4 ${notActive} justify-between cursor-pointer`}
                  onClick={changeActiveFilter}
                >
                  <span className="flex gap-2 items-center">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </span>
                  {activeClick ? (
                    <MdOutlineKeyboardArrowDown size={20} />
                  ) : (
                    <MdOutlineKeyboardArrowRight size={20} />
                  )}
                </div>
                {activeClick && (
                  <div className="w-full flex flex-col">
                    {el.submenu.map((els, idx) => (
                      <NavLink
                        key={idx}
                        to={els.path}
                        className={({ isActive }) =>
                          `py-2 pr-4 pl-8 ${isActive ? Active : notActive}`
                        }
                      >
                        <span>{els.subIcon}</span>
                        <span>{els.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
