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

const {
  BiSolidMessageSquareEdit,
  RiDeleteBin6Line,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
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

  const handleDeleteUser = async (uid) => {
    Swal.fire({
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
        {sort === "createdAt" && (
          <span
            className="text-xl cursor-pointer"
            onClick={() => setSort("-createdAt")}
          >
            <FaArrowUpWideShort />
          </span>
        )}
        {sort === "-createdAt" && (
          <span
            className="text-xl cursor-pointer"
            onClick={() => setSort("createdAt")}
          >
            <FaArrowDownShortWide />
          </span>
        )}
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
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Email address</th>
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
                  <td>{el.email}</td>
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
                            modalChildren: <EditUserAdmin data={el} />,
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
