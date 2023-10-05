import axiosConfig from "axiosConfig";

export const apiGetAllProduct = (params) =>
  axiosConfig({
    url: "/product",
    method: "get",
    params,
  });
