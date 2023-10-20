import axiosConfig from "axiosConfig";

export const apiGetAllProduct = (params) =>
  axiosConfig({
    url: "/product",
    method: "get",
    params,
  });

export const apiGetProduct = (pid) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "get",
  });

export const apiRatings = (data) =>
  axiosConfig({
    url: "/product/ratings",
    method: "put",
    data,
  });

export const apiCreateProduct = (data) =>
  axiosConfig({
    url: "/product",
    method: "post",
    data,
  });

export const apiDeleteProduct = (pid) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "delete",
  });

export const apiUpdateProduct = (pid, data) =>
  axiosConfig({
    url: "/product/" + pid,
    method: "put",
    data,
  });

export const apiAddVarriant = (pid, data) =>
  axiosConfig({
    url: "/product/varriant/" + pid,
    method: "put",
    data,
  });
