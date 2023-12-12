import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "ultils/helpers";
import path from "ultils/path";
import * as apis from "apis";

const BlogSidebar = ({ categories }) => {
  const [blogsData, setBlogsData] = useState(null);

  const fetchAllBlogs = async (queries) => {
    const response = await apis.apiGetAllBlog(queries);
    if (response.success) setBlogsData(response.blog);
  };

  useEffect(() => {
    let queries = {};
    queries.limit = 4;
    queries.sort = "-createdAt";
    fetchAllBlogs(queries);
  }, []);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-5 border-b">
        <h1 className="capitalize font-bold text-xl">danh mục</h1>
        <div className="flex flex-col gap-2 px-5 pb-5">
          {categories?.map((el) => (
            <NavLink
              key={el._id}
              to={`/${createSlug(el.title)}`}
              className={({ isActive }) =>
                `${
                  isActive ? "text-black" : "text-gray-500"
                } hover:text-black transition-all`
              }
            >
              {el.title}
            </NavLink>
          ))}
          <NavLink
            to={`/${path.HOME}`}
            className={({ isActive }) =>
              `${
                isActive ? "text-black" : "text-gray-500"
              } hover:text-black transition-all`
            }
          >
            Trang chủ
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="capitalize text-xl font-bold">bài viết gần đây</h1>
        <div className="flex flex-col gap-2 px-5 pb-5">
          {blogsData?.map((el) => (
            <NavLink
              key={el._id}
              to={`/${path.NEWS}/${el._id}/${createSlug(el.title)}`}
              className={({ isActive }) =>
                `${
                  isActive ? "text-black" : "text-gray-500"
                } hover:text-black transition-all`
              }
            >
              {el.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(BlogSidebar);
