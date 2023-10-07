import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "components";
import * as apis from "apis";
import { useParams } from "react-router-dom";
import { formatMoney, renderStarFromNumber } from "ultils/helpers";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Product from "assets/logo-image.png";

// const optionConfig = {
//   rewind: true,
//   perPage: 1,
//   type: "loop",
//   autoplay: true,
//   focus: "center",
// };

const DetailProduct = () => {
  const { pid } = useParams();
  const [productData, setProductData] = useState(null);
  const [showImage, setShowImage] = useState(productData?.thumb);
  // CALL API PRODUCT
  const fetchProduct = async (pid) => {
    const ressponse = await apis.apiGetProduct(pid);
    if (ressponse.success) setProductData(ressponse.productData);
  };
  useEffect(() => {
    if (pid) fetchProduct(pid);
  }, [pid]);

  return (
    <div className="w-full h-full">
      <div className="w-main mx-auto py-20 grid grid-cols-2 items-center gap-10">
        <div className="col-span-1 flex flex-col gap-5 p-2">
          <div className="w-full h-full">
            <img
              src={showImage || productData?.thumb || Product}
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
                  src={el || Product}
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
          <div className="flex items-center justify-between">
            <h3 className="text-xl uppercase font-semibold py-6 border-b">
              {productData?.title}
            </h3>
            <span className="flex flex-col justify-center items-end gap-1 text-red-500 opacity-70">
              <span>{`Kho: ${productData?.quantity}`}</span>
              <span>{`Đã bán: ${productData?.sold}`}</span>
              <span></span>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-yellow-500">
              {renderStarFromNumber(productData?.totalRatings)}
            </span>
            <span className="opacity-70">{`(${productData?.ratings.length} viewers)`}</span>
          </div>
          <span className="text-xl font-medium">{`${formatMoney(
            productData?.price
          )} VNĐ`}</span>
          <div>add to card</div>
          <span className="line-clamp-6">{productData?.description}</span>
          <span>{`Mã hàng: #${pid}`}</span>
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
    </div>
  );
};

export default DetailProduct;
