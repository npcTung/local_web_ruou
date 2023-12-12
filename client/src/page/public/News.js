import React, { useEffect, useState } from "react";
import { Breadcrumbs, Pagination } from "components";
import { createSlug, title_head } from "ultils/helpers";
import * as apis from "apis";
import DOMPurify from "dompurify";
import { Link, useSearchParams } from "react-router-dom";
import path from "ultils/path";

const News = () => {
  title_head("Tin tức");
  const [params] = useSearchParams();
  const [blogsData, setBlogsData] = useState(null);

  const fetchAllBlogs = async (queries) => {
    const response = await apis.apiGetAllBlog(queries);
    if (response.success) setBlogsData(response);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    queries.limit = 4;
    fetchAllBlogs(queries);
  }, [params]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Tin tức"} />
          <span className="text-xl uppercase font-semibold">Tin tức</span>
        </div>
      </div>
      <div className="w-main mx-auto grid grid-cols-2 grid-rows-2 gap-10 py-40">
        {blogsData?.counts > 0 &&
          blogsData.blog.map((el) => (
            <div className="row-span-1 col-span-1 flex flex-col justify-center gap-10">
              <Link
                to={`/${path.NEWS}/${el._id}/${createSlug(el.title)}`}
                className="w-[540px] h-[250px]"
              >
                <img
                  src={el.image}
                  alt={el.title}
                  className="w-full h-full object-contain"
                />
              </Link>
              <div className="flex flex-col gap-3">
                <Link
                  to={`/${path.NEWS}/${el._id}/${createSlug(el.title)}`}
                  className="font-bold hover:text-gray-500 transition-all"
                >
                  {el.title}
                </Link>
                <span className="opacity-70">{`By: ${
                  el.author === "Admin" ? "Wine House" : el.author
                }`}</span>
              </div>
            </div>
          ))}
      </div>
      {blogsData?.counts > 4 && (
        <div className="sm:w-main mx-auto flex justify-end py-5">
          <Pagination totalCount={blogsData?.counts} limit={4} />
        </div>
      )}
    </div>
  );
};

export default News;
