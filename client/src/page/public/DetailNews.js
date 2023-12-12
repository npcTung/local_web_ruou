import React, { useCallback, useEffect, useState } from "react";
import * as apis from "apis";
import { Link, useParams } from "react-router-dom";
import path from "ultils/path";
import icons from "ultils/icons";
import { BlogSidebar } from "components";
import { useSelector } from "react-redux";
import moment from "moment";
import DOMPurify from "dompurify";

const {
  MdOutlineKeyboardArrowRight,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} = icons;
const MXH = ["facebook", "twitter", "pinterest"];

const DetailNews = () => {
  const { bid } = useParams();
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const [blogData, setBlogData] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchBlog = async (bid) => {
    const response = await apis.apiGetBlog(bid);
    if (response.success) setBlogData(response.blog);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const onClickLike = async (bid) => {
    await apis.apiLike(bid);
    rerender();
  };
  const onClickDislike = async (bid) => {
    await apis.apiDislike(bid);
    rerender();
  };

  useEffect(() => {
    if (bid) fetchBlog(bid);
  }, [bid, update]);

  return (
    <div className="w-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm">
            <Link
              to={`/${path.HOME}`}
              className="capitalize hover:text-blue-500 transition-all"
            >
              Home
            </Link>
            <MdOutlineKeyboardArrowRight />
            <Link
              to={`/${path.NEWS}`}
              className="capitalize hover:text-blue-500 transition-all"
            >
              Tin tức
            </Link>
            <MdOutlineKeyboardArrowRight />
            <span className="cursor-default capitalize hover:text-blue-500 transition-all">
              {blogData?.title}
            </span>
          </div>
          <span className="text-xl uppercase font-semibold">Tin tức</span>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-5 w-main mx-auto py-5">
        <div className="col-span-7 flex flex-col gap-5">
          <img
            src={blogData?.image}
            alt={blogData?.title}
            className="w-[600px] h-[300px] object-cover"
          />
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-500">{`By ${
              blogData?.author === "Admin" ? "Wine House" : blogData?.author
            }`}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">
              {moment(blogData?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">{`Lượt xem: ${blogData?.numberViews}`}</span>
          </div>
          <div
            className="flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogData?.description),
            }}
          />
          <div className="flex items-center gap-2 text-xl">
            <span
              className="cursor-pointer"
              onClick={() => onClickLike(blogData?._id)}
            >
              {blogData?.likes?.find((el) => el._id === currentData?._id)
                ?._id === currentData?._id ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => onClickDislike(blogData?._id)}
            >
              {blogData?.dislikes?.find((el) => el._id === currentData?._id)
                ?._id === currentData?._id ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}
            </span>
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
        <div className="col-span-3">
          <BlogSidebar categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default DetailNews;
