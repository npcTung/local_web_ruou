import axiosConfig from "axiosConfig";

export const apiRegister = (data) =>
  axiosConfig({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axiosConfig({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiGetCurrent = () =>
  axiosConfig({
    url: "/user/current",
    method: "get",
  });

export const apiFinalRegister = (token) =>
  axiosConfig({
    url: "/user/final-register/" + token,
    method: "put",
  });

export const apiForgotPassword = (data) =>
  axiosConfig({
    url: "/user/forgot-password",
    method: "post",
    data,
  });

export const apiResetPassword = (data) =>
  axiosConfig({
    url: "/user/reset-password",
    method: "put",
    data,
  });
