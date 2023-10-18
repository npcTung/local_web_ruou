import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Comment,
  ProductInfomation,
  Product,
  SelectQuantity,
  Button,
} from "components";
import * as apis from "apis";
import { useParams } from "react-router-dom";
import { formatMoney, renderStarFromNumber } from "ultils/helpers";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Product_image from "assets/logo-image.png";
import Wrapper from "assets/wrapper.svg";
import icons from "ultils/icons";

const { HiHeart } = icons;

const tab_list = ["Mô tả", "Chính sách vận chuyển", "Phản hồi khách hàng"];

const DetailProduct = () => {
  const { pid } = useParams();
  const [productData, setProductData] = useState(null);
  const [showImage, setShowImage] = useState(productData?.thumb);
  const [tapList, setTapList] = useState(0);
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
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
  }, [update]);
  // QUANTITY
  const handaleQuantity = useCallback(
    (number) => {
      if (Number(number) >= 1 && Number(number) <= +productData?.quantity)
        setQuantity(number);
    },
    [quantity]
  );
  // CHANGE QUANTITY
  const handaleChargeQuantity = useCallback(
    (flag) => {
      if (+productData?.quantity === 0) return;
      else {
        if (flag === "minus" && quantity === 1) return;
        else if (flag === "plus" && quantity >= productData?.quantity) return;
        else if (flag === "minus") setQuantity((prev) => +prev - 1);
        else if (flag === "plus") setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );

  useEffect(() => {
    if (pid) fetchProduct(pid);
    fetchALLProduct();
  }, [pid, update]);

  return (
    <div className="w-full h-full pb-10">
      <div className="w-main mx-auto py-20 grid grid-cols-2 items-center gap-10">
        <div className="col-span-1 flex flex-col gap-5 p-2">
          <div className="w-full h-full">
            <img
              src={showImage || productData?.thumb || Product_image}
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
            {productData?.images?.map((el, idx) => (
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
              <span>{`Kho: ${productData?.quantity}`}</span>
              <span>{`Đã bán: ${productData?.sold}`}</span>
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
          <span className="text-xl font-medium">{`${formatMoney(
            productData?.price
          )} VNĐ`}</span>
          <div className="w-full flex items-center gap-10">
            <SelectQuantity
              quantity={quantity}
              handaleQuantity={handaleQuantity}
              handaleChargeQuantity={handaleChargeQuantity}
              quantityProduct={productData?.quantity}
            />
            <Button
              name={"Thêm vào giỏ hàng"}
              styles={
                "border-2 border-black hover:bg-black hover:text-white bg-transparent"
              }
            />
            <span className="px-5 py-3 rounded-md border-2 text-gray-500 hover:text-black hover:border-black transition-all cursor-pointer">
              <HiHeart size={20} />
            </span>
          </div>
          <span className="line-clamp-6">{productData?.description}</span>
          <span>{`Mã hàng: #${pid}`}</span>
          <div className="flex gap-2 capitalize">
            <span>Color:</span>
            {productData?.color && (
              <span>{productData?.color.toLowerCase()}</span>
            )}
          </div>
          <div className="flex items-center gap-1 capitalize border-b pb-6">
            <span>Thể loại:</span>
            <span>{productData?.category}</span>
            <span>,</span>
            <span>{productData?.brand.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-5 text-xl uppercase py-6">
            <span className="p-5 w-[200px] text-center text-gray-400 border-2 border-gray-400 hover:text-black hover:border-black transition-all cursor-pointer">
              face book
            </span>
            <span className="p-5 w-[200px] text-center text-gray-400 border-2 border-gray-400 hover:text-black hover:border-black transition-all cursor-pointer">
              twitter
            </span>
            <span className="p-5 w-[200px] text-center text-gray-400 border-2 border-gray-400 hover:text-black hover:border-black transition-all cursor-pointer">
              pinterest
            </span>
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

export default DetailProduct;
