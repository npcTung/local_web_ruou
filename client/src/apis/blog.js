import axiosConfig from "axiosConfig";

export const apiCreateBlog = (data) =>
  axiosConfig({
    url: "/blog",
    method: "post",
    data,
  });

export const apiGetAllBlog = (params) =>
  axiosConfig({
    url: "/blog",
    method: "get",
    params,
  });

export const apiDeleteBlog = (bid) =>
  axiosConfig({
    url: "/blog/" + bid,
    method: "delete",
  });

export const apiGetBlog = (bid) =>
  axiosConfig({
    url: "/blog/" + bid,
    method: "get",
  });

export const apiLike = (bid) =>
  axiosConfig({
    url: "/blog/like/" + bid,
    method: "put",
  });

export const apiDislike = (bid) =>
  axiosConfig({
    url: "/blog/dislike/" + bid,
    method: "put",
  });

export const apiUpdateBlog = (bid, data) =>
  axiosConfig({
    url: "/blog/" + bid,
    method: "put",
    data,
  });
