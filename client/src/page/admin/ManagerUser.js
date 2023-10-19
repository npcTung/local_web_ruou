import React, { useCallback, useEffect, useState } from "react";
import * as apis from "apis";
import NoUser from "assets/no-person.png";
import moment from "moment";
import icons from "ultils/icons";
import Avatar from "assets/user.png";
import { EditUserAdmin, Pagination } from "components";
import { createSearchParams, useSearchParams } from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import withBase from "hocs/withBase";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { exportExcel, exportPDF } from "ultils/helpers";

const {
  BiSolidMessageSquareEdit,
  RiDeleteBin6Line,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
  SiMicrosoftexcel,
  FaRegFilePdf,
} = icons;

const ManagerUser = ({ navigate, location, dispatch }) => {
  const [params] = useSearchParams();
  const [users, setUsers] = useState(null);
  const [sort, setSort] = useState("createdAt");
  const [update, setUpdate] = useState(false);
  const [queries, setQueries] = useState({ q: "" });
  const queriesDebounce = useDebounce(queries.q, 800);

  const fetchAllProducts = async (param) => {
    const response = await apis.apiGetAllUsers({
      ...param,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleSortClick = useCallback(() => {
    if (sort === "createdAt") setSort("-createdAt");
    else if (sort === "-createdAt") setSort("createdAt");
  }, [sort]);

  const handleDeleteUser = async (uid) => {
    Swal.fire({
      icon: "info",
      text: "Bạn có chắc muốn xóa tài khoản này?",
      showCancelButton: true,
      cancelButtonColor: "#ee3131",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
      confirmButtonColor: "#2563EB",
      title: "Oops!",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apis.apiDeleteUser(uid);
        if (response.success) {
          toast.success("Xóa tài khoản thành công!");
          render();
        } else toast.error(response.mes);
      }
    });
  };

  const handleOnClickExport = async (value) => {
    if (value === "excel")
      await exportExcel(users?.usersData, "Danh sách người dùng", "ListUsers");
    else if (value === "pdf") {
      const capture = document.getElementById("table-user");
      await exportPDF(capture, "ListUsers");
    }
  };

  useEffect(() => {
    if (queriesDebounce)
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      });
    else navigate({ pathname: location.pathname });
  }, [queriesDebounce]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort) queries.sort = sort;
    fetchAllProducts(queries);
  }, [params, sort, update]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b px-[30px] py-[39px]">
          <span className="uppercase">quản lý tài khoản người dùng</span>
        </h1>
      </div>
      <div className="py-4 px-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <span
            className="text-xl p-2 text-white bg-yellow-500 rounded-md cursor-pointer"
            onClick={handleSortClick}
            title="Sắp xếp theo ngày tạo"
          >
            {sort === "createdAt" ? (
              <FaArrowUpWideShort />
            ) : (
              <FaArrowDownShortWide />
            )}
          </span>
          <span
            className="text-xl p-2 text-white bg-green-500 rounded-md cursor-pointer"
            title="Xuất excel"
            onClick={() => handleOnClickExport("excel")}
          >
            <SiMicrosoftexcel />
          </span>
          <span
            className="text-xl p-2 text-white bg-red-500 rounded-md cursor-pointer"
            title="Xuất PDF"
            onClick={() => handleOnClickExport("pdf")}
          >
            <FaRegFilePdf />
          </span>
        </div>
        <div className="w-2/5">
          <input
            type="text"
            className="input input-bordered w-full"
            onChange={(e) => setQueries({ q: e.target.value })}
            value={queries.q}
          />
        </div>
      </div>
      <div className="w-full py-4 px-10 flex flex-col gap-10">
        {users?.usersData.length > 0 ? (
          <table id="table-user" className="table table-zebra">
            <thead className="table-header-group bg-sky-500 text-white text-sm">
              <tr>
                <th></th>
                <th className="w-[220px]">Email address</th>
                <th>Full name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>CreateAt</th>
                <th>UpdatedAt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.usersData?.map((el) => (
                <tr key={el._id}>
                  <td>
                    <img
                      src={el.avatar || Avatar}
                      alt={`${el.firstName} ${el.lastName}`}
                      className={`w-[40px] h-[40px] rounded-full border p-[2px] ${
                        el.isBlocked ? "border-red-500" : "border-green-500"
                      }`}
                    />
                  </td>
                  <td className="w-[220px]">{el.email}</td>
                  <td>{`${el.firstName} ${el.lastName}`}</td>
                  <td>{+el.role === 2002 ? "Admin" : "User"}</td>
                  <td>{el.phone}</td>
                  <td
                    className={`${
                      el.isBlocked ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {el.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td>{moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td className="flex gap-3 text-white">
                    <span
                      className="p-2 rounded-md bg-yellow-400 cursor-pointer"
                      title="Sửa sản phẩm"
                      onClick={() =>
                        dispatch(
                          showModal({
                            isShowModal: true,
                            modalChildren: (
                              <EditUserAdmin dataUser={el} render={render} />
                            ),
                          })
                        )
                      }
                    >
                      <BiSolidMessageSquareEdit />
                    </span>
                    <span
                      className="p-2 rounded-md bg-red-500 cursor-pointer"
                      title="Xóa sản phẩm"
                      onClick={() => handleDeleteUser(el._id)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center p-20">
            <img
              src={NoUser}
              alt="No User"
              className="w-[300px] object-contain opacity-60"
            />
            <span className="text-xl flex font-semibold opacity-60">
              No User
            </span>
          </div>
        )}
        {users?.counts > +process.env.REACT_APP_LIMIT && (
          <Pagination totalCount={users?.counts} />
        )}
      </div>
    </div>
  );
};

export default withBase(ManagerUser);
