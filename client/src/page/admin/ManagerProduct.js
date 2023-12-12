import React, { useCallback, useEffect, useState } from "react";
import { exportExcel, formatMoney, title_head } from "ultils/helpers";
import icons from "ultils/icons";
import * as apis from "apis";
import NoProduct from "assets/no-product.png";
import moment from "moment";
import {
  CustomizeVarriant,
  InputSelect,
  Pagination,
  UpdateProductAdmin,
} from "components";
import useDebounce from "hooks/useDebounce";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { sorts } from "ultils/contans";
import withBase from "hocs/withBase";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";

const {
  SiMicrosoftexcel,
  BsStarFill,
  BiSolidMessageSquareEdit,
  RiDeleteBin6Line,
  MdOutlineClear,
  BiCustomize,
} = icons;

const ManagerProduct = ({ navigate, location, dispatch }) => {
  const [params] = useSearchParams();
  const [sort, setSort] = useState();
  const [queries, setQueries] = useState({ q: "" });
  const [productData, setProductData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isShowClear, setIsShowClear] = useState(false);
  const queriesDebounce = useDebounce(queries.q, 800);

  const fetchAllProducts = async (queries) => {
    const response = await apis.apiGetAllProduct(queries);
    if (response.success) setProductData(response);
  };
  // EXPORT EXCEL/PDF
  const handleOnClickExport = async (value) => {
    if (value === "excel") {
      const exportData = productData?.products?.map((el) => ({
        brand: el.brand,
        category: el.category,
        color: el.color,
        price: el.price,
        title: el.title.toLowerCase(),
        description:
          typeof productData?.description === "object"
            ? productData?.description.join(", ")
            : productData?.description,
        thumb: el.thumb,
        images: el.images,
        quantity: el.quantity,
        sold: el.sold,
        ratings: el.totalRatings,
        viewers: el.ratings.length,
        varriantis: el.varriantis.length,
        id: el._id,
        createdAt: moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedAt: moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      }));
      await exportExcel(exportData, "Danh sách sản phẩm", "ListProducts");
    }
  };
  // CHANGE VALUE
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  // DELETE PRODUCT
  const handleDeleteProduct = async (pid) => {
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
        const response = await apis.apiDeleteProduct(pid);
        if (response.success) {
          toast.success("Xóa sản phẩm thành công!");
          render();
        } else toast.error(response.mes);
      }
    });
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

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

  title_head("Quản lý sản phẩm");

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b px-[30px] py-[39px]">
          <span className="uppercase">danh sách sản phẩm</span>
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
        {productData?.products.length > 0 ? (
          <table id="table-product" className="table table-zebra">
            <thead className="capitalize font-semibold text-white bg-sky-500 text-sm">
              <tr>
                <th></th>
                <th>title</th>
                <th>price(VNĐ)</th>
                <th>color</th>
                <th>quantity</th>
                <th>sold</th>
                <th>rating</th>
                <th>varriantis</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {productData.products.map((el) => (
                <tr key={el._id}>
                  <td>
                    <img
                      src={el.thumb}
                      alt={el.title.toLowerCase()}
                      className="w-[60px] h-[60px] object-contain rounded-md"
                    />
                  </td>
                  <td className="capitalize whitespace-nowrap line-clamp-1">
                    {el.title.toLowerCase()}
                  </td>
                  <td>{formatMoney(el.price)}</td>
                  <td className="capitalize">{el.color.toLowerCase()}</td>
                  <td>{el.quantity}</td>
                  <td>{el.sold}</td>
                  <td className="flex gap-1 items-center">
                    <span className="text-yellow-500">
                      <BsStarFill />
                    </span>
                    <span>{el.totalRatings}</span>
                    {el.ratings.length > 0 && (
                      <span className="opacity-70 whitespace-nowrap">{`(${el.ratings.length} viewers)`}</span>
                    )}
                  </td>
                  <td>{`${el.varriantis.length} varriantis`}</td>
                  <td>{moment(el.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td>{moment(el.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                  <td className="flex gap-3 text-white">
                    <span
                      className="p-2 rounded-md bg-yellow-400 cursor-pointer"
                      title="Sửa sản phẩm"
                      onClick={() => {
                        dispatch(
                          showModal({
                            isShowModal: true,
                            modalChildren: (
                              <UpdateProductAdmin
                                productData={el}
                                rerender={render}
                              />
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
                      onClick={() => handleDeleteProduct(el._id)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                    <span
                      className="p-2 rounded-md bg-blue-500 cursor-pointer"
                      title="Biến thể"
                      onClick={() => {
                        dispatch(
                          showModal({
                            isShowModal: true,
                            modalChildren: (
                              <CustomizeVarriant
                                productData={el}
                                rerender={render}
                              />
                            ),
                          })
                        );
                      }}
                    >
                      <BiCustomize />
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
        {productData?.counts > +process.env.REACT_APP_LIMIT && (
          <Pagination totalCount={productData?.counts} />
        )}
      </div>
    </div>
  );
};

export default withBase(ManagerProduct);
