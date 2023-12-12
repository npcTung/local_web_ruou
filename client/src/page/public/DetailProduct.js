import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumbs, Comment, ProductInfomation, Product } from "components";
import * as apis from "apis";
import { useParams } from "react-router-dom";
import { formatMoney, renderStarFromNumber, title_head } from "ultils/helpers";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Product_image from "assets/logo-image.png";
import Wrapper from "assets/wrapper.svg";
import icons from "ultils/icons";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/asyncActions";
import { useSelector } from "react-redux";

const { HiHeart } = icons;

const tab_list = ["Mô tả", "Chính sách vận chuyển", "Phản hồi khách hàng"];
const MXH = ["facebook", "twitter", "pinterest"];

const DetailProduct = ({ dispatch }) => {
  const { pid } = useParams();
  const { currentData } = useSelector((state) => state.user);
  const [productData, setProductData] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [tapList, setTapList] = useState(0);
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState(null);
  const [varriantis, setVarriantis] = useState(null);
  const [wishlist, setWishlist] = useState(
    currentData?.wishlist
      ?.filter((el) => el._id === pid)
      ?.map((el) => el._id)
      .toString() === pid
      ? true
      : false
  );
  // CALL API PRODUCT
  const fetchProduct = async (pid) => {
    const ressponse = await apis.apiGetProduct(pid);
    if (ressponse.success) setProductData(ressponse.productData);
  };
  // CALL API ALL PRODUCT
  const fetchALLProduct = async () => {
    const ressponse = await apis.apiGetAllProduct({
      limit: 7,
      category: productData?.category,
    });
    if (ressponse.success) setProducts(ressponse.products);
  };
  // RE-RENDER
  const rerender = useCallback(() => {
    setUpdate(!update);
    dispatch(getCurrent());
  }, [update]);

  const images = varriantis
    ? varriantis?.thumb.split(",").concat(varriantis?.images)
    : productData?.thumb.split(",").concat(productData?.images);

  const handleWishlist = async () => {
    if (wishlist) {
      const response = await apis.apiRemoveWishlist(productData?._id);
      if (response.success) {
        toast.success(
          `Xóa sản phẩm ${productData?.title.toLowerCase()} ra khỏi danh sách yêu thích thành công`
        );
        setWishlist(false);
        rerender();
      } else {
        toast.error(response.mes);
        setWishlist(true);
      }
    } else {
      const ressponse = await apis.apiUpdateWishList(productData?._id);
      if (ressponse.success) {
        toast.success(
          `Thêm sản phẩm ${productData?.title.toLowerCase()} vào danh sách yêu thích thành công`
        );
        setWishlist(true);
        rerender();
      } else {
        toast.error(ressponse.mes);
        setWishlist(false);
      }
    }
  };

  useEffect(() => {
    if (pid) fetchProduct(pid);
    fetchALLProduct();
  }, [pid, update, wishlist]);

  title_head(productData?.title.toLowerCase());

  return (
    <div className="w-full h-full pb-10">
      <div className="w-main mx-auto py-20 grid grid-cols-2 items-center gap-10">
        <div className="col-span-1 flex flex-col gap-5 p-2">
          <div className="w-[525px] h-[525px]">
            <img
              src={
                showImage ||
                varriantis?.thumb ||
                productData?.thumb ||
                Product_image
              }
              alt={productData?.title.toLowerCase()}
              className="w-full h-full object-contain"
            />
          </div>
          <Splide
            options={{
              rewind: true,
              fixedWidth: 104,
              fixedHeight: 100,
              isNavigation: true,
              gap: 10,
              focus: "center",
              pagination: false,
              dragMinThreshold: { mouse: 4, touch: 10 },
              breakpoints: { 640: { fixedHeight: 100, fixedWidth: 38 } },
            }}
          >
            {images?.map((el, idx) => (
              <SplideSlide
                key={idx}
                className="w-full h-full"
                onClick={() => setShowImage(el)}
              >
                <img
                  src={el || Product_image}
                  alt={productData?.title.toLowerCase()}
                  className="w-full h-full object-contain"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-6">
          <Breadcrumbs
            product={"Sản phẩm"}
            category={productData?.category}
            title={productData?.title}
          />
          <div className="flex items-center justify-between border-b">
            <h3 className="text-xl uppercase font-semibold py-6">
              {productData?.title}
            </h3>
            <span className="flex flex-col justify-center items-end gap-1 text-red-500 opacity-70">
              <span>{`Kho: ${
                varriantis?.quantity || productData?.quantity
              }`}</span>
              <span>{`Đã bán: ${varriantis?.sold || productData?.sold}`}</span>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-yellow-500">
              {renderStarFromNumber(productData?.totalRatings)}
            </span>
            <a
              href={"#comment"}
              className="opacity-70 hover:text-blue-500 hover:underline transition-all"
            >{`(${productData?.ratings.length} đánh giá)`}</a>
          </div>
          <div className="w-full flex items-center justify-between gap-10">
            <span className="text-xl font-medium">{`${formatMoney(
              varriantis?.price || productData?.price
            )} VNĐ`}</span>
            <span
              className={`px-5 py-3 rounded-md border-2 ${
                wishlist
                  ? "text-white border-red-500 bg-red-500"
                  : "text-gray-500 hover:text-red-500 hover:border-red-500 transition-all"
              } cursor-pointer`}
              title="Yêu thích sản phẩm này"
              onClick={handleWishlist}
            >
              <HiHeart size={20} />
            </span>
          </div>
          {productData?.description.length > 1 && (
            <span className="line-clamp-6">{productData?.description}</span>
          )}
          {productData?.description.length === 1 && (
            <div
              className="text-sm flex flex-col gap-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(productData?.description[0]),
              }}
            />
          )}
          <span className="flex items-center gap-2">
            <span>Mã hàng:</span>
            <span className="opacity-70 text-sm">{`#${pid}`}</span>
          </span>
          <div className="flex gap-2 capitalize">
            <span>Color:</span>
            {productData?.color && (
              <span
                className={`p-2 border ${
                  !varriantis
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-400 text-gray-400 cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500"
                } font-semibold rounded-md transition-all cursor-pointer`}
                onClick={() => {
                  setVarriantis(null);
                  setShowImage(null);
                }}
              >
                {productData?.color.toLowerCase()}
              </span>
            )}
            {productData?.varriantis.length > 0 &&
              productData?.varriantis?.map((el) => (
                <span
                  key={el._id}
                  className={`p-2 border ${
                    varriantis?._id === el._id
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-400 text-gray-400 cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500"
                  } font-semibold rounded-md transition-all cursor-pointer`}
                  onClick={() => {
                    setVarriantis(el);
                    setShowImage(null);
                  }}
                >
                  {el.color}
                </span>
              ))}
          </div>
          <div className="flex items-center gap-1 capitalize border-b pb-6">
            <span>Thể loại:</span>
            <span>{productData?.category}</span>
            <span>,</span>
            <span>{productData?.brand.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-5 text-xl uppercase py-6">
            {MXH.map((el) => (
              <span
                key={el}
                className="p-5 w-[200px] text-center text-gray-400 border-2 border-gray-400 hover:text-black hover:border-black transition-all cursor-pointer"
              >
                {el}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f6f6f6] p-20">
        <div className="w-main mx-auto">
          <div className="w-full pb-10 border-b-2 border-gray-300 flex items-center gap-20 text-xl font-medium">
            {tab_list.map((el, idx) => (
              <span
                key={idx}
                className={`${
                  tapList === idx
                    ? "text-black"
                    : "text-gray-500 hover:text-black transition-all"
                } cursor-pointer`}
                onClick={() => setTapList(idx)}
              >
                {el}
              </span>
            ))}
          </div>
          <div className="w-full py-10">
            <ProductInfomation
              data={productData}
              tapList={tapList}
              nameProduct={productData?.title.toLowerCase()}
              pid={pid}
              rerender={rerender}
            />
          </div>
          {productData?.ratings.length > 0 && (
            <div
              id="comment"
              className="w-full bg-white shadow-md p-10 rounded-md flex flex-col justify-center gap-5"
            >
              <h3 className="text-xl font-semibold">Đánh giá của người dùng</h3>
              {productData.ratings
                .filter((el) => el.posteBy !== null)
                .map((el) => (
                  <Comment
                    key={el._id}
                    data={el}
                    updated={productData?.updatedAt}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {products && (
        <div className="w-main mx-auto p-20">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="w-[100px] h-[50px]">
              <img
                src={Wrapper}
                alt="Wrapper"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-semibold uppercase">
              Sản phẩm liên quan
            </h1>
          </div>
          <Splide
            options={{
              rewind: true,
              perPage: 4,
              type: "loop",
              autoplay: true,
              focus: "center",
            }}
            aria-label="React Splide Example"
            className="cursor-ew-resize py-5 my-5"
          >
            {products?.map((el) => (
              <SplideSlide key={el._id} className="">
                <Product data={el} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default withBase(DetailProduct);
