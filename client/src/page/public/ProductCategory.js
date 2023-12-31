import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Pagination,
  Product,
  ProductSiderBar,
  TopProduct,
} from "components";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSlug, title_head } from "ultils/helpers";
import * as apis from "apis";
import NoProduct from "assets/no-product.png";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/asyncActions";

const ProductCategory = ({ dispatch }) => {
  const { category } = useParams();
  const { categories } = useSelector((state) => state.app);
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [sort, setSort] = useState();
  const [limit, setLimit] = useState(12);
  const [update, setUpdate] = useState(false);
  // CHANGE VALUE
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  // GET ALL API PRODUCTS
  const fetchAllProduct = async (queries) => {
    const response = await apis.apiGetAllProduct(queries);
    if (response.success) setProducts(response);
  };
  // RERENDER
  const rerender = useCallback(() => {
    setUpdate(!update);
    dispatch(getCurrent());
  }, [update]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (limit) queries.limit = limit;
    if (categories?.find((el) => createSlug(el.title) === category).title)
      queries.category = categories?.find(
        (el) => createSlug(el.title) === category
      ).title;
    if (sort) queries.sort = sort;
    fetchAllProduct(queries);
    if (queries.min && queries.max) {
      priceQuery = {
        $and: [
          { price: { gte: queries.max } },
          { price: { lte: queries.min } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.max) queries.price = { gte: queries.max };
      if (queries.min) queries.price = { lte: queries.min };
    }
    delete queries.min;
    delete queries.max;
    fetchAllProduct(queries);
    window.scrollTo(0, 0);
  }, [limit, params, category, sort]);

  title_head(categories?.find((el) => createSlug(el.title) === category).title);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs
            product={"Danh sách sản phẩm"}
            category={
              categories?.find((el) => createSlug(el.title) === category).title
            }
          />
          <span className="text-xl uppercase font-semibold">
            {categories?.find((el) => createSlug(el.title) === category).title}
          </span>
        </div>
      </div>
      <div className="w-main mx-auto py-20 grid grid-cols-10">
        <ProductSiderBar category={category} />
        <div className="col-span-8">
          <TopProduct
            limit={limit}
            setLimit={setLimit}
            changeValue={changeValue}
          />
          {products?.counts > 0 ? (
            <div className="grid grid-cols-3 gap-10 py-10 px-5">
              {products.products?.map((el) => (
                <Product key={el._id} data={el} rerender={rerender} />
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
        {products?.counts > limit && (
          <div className="w-main mx-auto flex justify-end mt-5">
            <Pagination totalCount={products?.counts} limit={limit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(ProductCategory);
