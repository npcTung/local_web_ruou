import React, { useEffect, useState } from "react";
import { Breadcrumbs, Pagination, Product } from "components";
import { useSearchParams } from "react-router-dom";
import * as apis from "apis";
import NoProduct from "assets/no-product.png";

const SearchProduct = () => {
  const [params] = useSearchParams();
  const [searchProduct, setSearchProduct] = useState(null);

  const fetchALLProducts = async (queries) => {
    const response = await apis.apiGetAllProduct(queries);
    if (response.success) setSearchProduct(response);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchALLProducts(queries);
  });

  return (
    <div className="w-full pb-10">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs
            product={`Kết quả tìm kiếm "${params.get("q")}" - Wine House`}
          />
          <span className="text-xl uppercase font-semibold">
            Tìm kiếm sản phẩm
          </span>
        </div>
      </div>
      <div className="w-main mx-auto">
        {searchProduct?.counts > 0 ? (
          <div className="grid grid-cols-3 gap-10 py-10 px-5">
            {searchProduct.products?.map((el) => (
              <Product key={el._id} data={el} />
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center py-40 px-10">
            <img
              src={NoProduct}
              alt="No Product"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      {searchProduct?.counts > +process.env.REACT_APP_LIMIT && (
        <div className="w-main mx-auto flex justify-end mt-5">
          <Pagination totalCount={searchProduct?.counts} />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
