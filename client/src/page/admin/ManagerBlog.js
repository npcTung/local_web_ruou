import { InputSelect, Pagination, UpdateBlog } from "components";
import withBase from "hocs/withBase";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { exportExcel, title_head } from "ultils/helpers";
import icons from "ultils/icons";
import NoProduct from "assets/no-product.png";
import * as apis from "apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";

const {
  SiMicrosoftexcel,
  MdOutlineClear,
  BiSolidMessageSquareEdit,
  RiDeleteBin6Line,
} = icons;

const sorts = [
  {
    id: 1,
    value: "",
    text: "Ngẫu nhiên",
  },
  {
    id: 2,
    value: "title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "createdAt",
    text: "Ngày, cũ đến mới",
  },
  {
    id: 5,
    value: "-createdAt",
    text: "Ngày, mới đến cũ",
  },
];

const ManagerBlog = ({ navigate, location, dispatch }) => {
  title_head("Quản lý blog");
  const [params] = useSearchParams();
  const [sort, setSort] = useState();
  const [queries, setQueries] = useState({ q: "" });
  const [update, setUpdate] = useState(false);
  const [isShowClear, setIsShowClear] = useState(false);
  const [blogsData, setBlogsData] = useState(null);
  const queriesDebounce = useDebounce(queries.q, 800);

  const fetchAllProducts = async (queries) => {
    const response = await apis.apiGetAllBlog(queries);
    if (response.success) setBlogsData(response);
  };
  // CHANGE VALUE
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  // EXPORT EXCEL/PDF
  const handleOnClickExport = async (value) => {
    if (value === "excel") {
      const exportData = blogsData?.blog?.map((el) => ({
        title: el.title.toLowerCase(),
        description:
          typeof blogsData?.description === "object"
            ? el?.description.join(", ")
            : el?.description,
        image: el.image,
        id: el._id,
        createdAt: moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedAt: moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      }));
      await exportExcel(exportData, "Danh sách sản phẩm", "ListProducts");
    }
  };

  // DELETE PRODUCT
  const handleDeleteBlog = async (pid) => {
    Swal.fire({
      icon: "info",
      text: "Bạn có chắc muốn xóa sản phẩm này?",
      showCancelButton: true,
      cancelButtonColor: "#ee3131",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
      confirmButtonColor: "#2563EB",
      title: "Oops!",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apis.apiDeleteBlog(pid);
        if (response.success) {
          toast.success("Xóa sản blog thành công!");
          render();
        } else toast.error(response.mes);
      }
    });
  };

  useEffect(() => {
    if (queries.q.length > 0) setIsShowClear(true);
    else setIsShowClear(false);
  }, [queries]);

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
    window.scrollTo(0, 0);
  }, [sort, params, update]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b px-[30px] py-[39px]">
          <span className="uppercase">danh sách tin tức</span>
        </h1>
      </div>
      <div className="py-4 px-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex gap-3">
            <InputSelect
              value={sort}
              options={sorts}
              changeValue={changeValue}
            />
          </div>
          <span
            className="text-xl p-2 text-white bg-green-500 rounded-md cursor-pointer"
            title="Xuất excel"
            onClick={() => handleOnClickExport("excel")}
          >
            <SiMicrosoftexcel />
          </span>
        </div>
        <div className="w-2/5 relative">
          <input
            type="text"
            className="input input-bordered w-full pr-5"
            onChange={(e) => setQueries({ q: e.target.value })}
            value={queries.q}
            placeholder="Tìm kiếm sản phẩm theo tên, giá..."
          />
          {isShowClear && (
            <span
              className="absolute top-0 bottom-0 right-1 flex items-center justify-center cursor-pointer text-gray-500"
              onClick={() => setQueries({ q: "" })}
            >
              <MdOutlineClear size={20} />
            </span>
          )}
        </div>
      </div>
      <div className="w-full py-4 px-10 flex flex-col gap-10">
        {blogsData?.blog?.length > 0 ? (
          <table id="table-product" className="table table-zebra">
            <thead className="capitalize font-semibold text-white bg-sky-500 text-sm">
              <tr>
                <th>#</th>
                <th>title</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {blogsData.blog.map((el) => (
                <tr key={el._id}>
                  <td>
                    <img
                      src={el.image}
                      alt={el.title.toLowerCase()}
                      className="w-[60px] h-[60px] object-contain rounded-md"
                    />
                  </td>
                  <td>
                    <span className="capitalize whitespace-nowrap line-clamp-1">
                      {el.title}
                    </span>
                  </td>
                  <td>{moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>
                    <span className="flex gap-3 text-white">
                      <span
                        className="p-2 rounded-md bg-yellow-400 cursor-pointer"
                        title="Sửa sản phẩm"
                        onClick={() => {
                          dispatch(
                            showModal({
                              isShowModal: true,
                              modalChildren: (
                                <UpdateBlog blogData={el} rerender={render} />
                              ),
                            })
                          );
                        }}
                      >
                        <BiSolidMessageSquareEdit />
                      </span>
                      <span
                        className="p-2 rounded-md bg-red-500 cursor-pointer"
                        title="Xóa sản phẩm"
                        onClick={() => handleDeleteBlog(el._id)}
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center p-20">
            <img
              src={NoProduct}
              alt="No Products"
              className="w-[300px] object-contain opacity-60"
            />
            <span className="text-xl flex font-semibold opacity-60">
              No Products
            </span>
          </div>
        )}
        {blogsData?.counts > +process.env.REACT_APP_LIMIT && (
          <Pagination totalCount={blogsData?.counts} />
        )}
      </div>
    </div>
  );
};

export default withBase(ManagerBlog);
