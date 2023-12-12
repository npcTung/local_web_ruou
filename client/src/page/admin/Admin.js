import { AdminSidebar } from "components";
import withBase from "hocs/withBase";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { title_head } from "ultils/helpers";
import path from "ultils/path";

const Admin = ({ navigate }) => {
  const { isLoggedIn, currentData } = useSelector((state) => state.user);
  if (!isLoggedIn || !currentData)
    Swal.fire(
      "Oops!",
      "Bạn cần đăng nhập trước khi thực hiện thao tác này",
      "info"
    ).then(() => navigate(`/${path.LOGIN}`));
  if (+currentData?.role !== 2002) {
    toast.info("Bạn cần có quyền admin để thực hiện thao tác này");
    navigate(`/${path.HOME}`);
  }

  title_head("Bảng điều khiển");

  return (
    <div className="w-full flex min-h-screen">
      <AdminSidebar />
      <div className="w-[20%]"></div>
      <main className="w-[80%]">
        <Outlet />
      </main>
    </div>
  );
};

export default withBase(Admin);
