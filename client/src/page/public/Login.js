import React, { useEffect, useState } from "react";
import {
  Button,
  FinalRegister,
  ForgotPassword,
  InputForm,
  Loading,
} from "components";
import { useForm } from "react-hook-form";
import withBase from "hocs/withBase";
import * as apis from "apis";
import Swal from "sweetalert2";
import { login } from "store/user/appSlice";
import { useSearchParams } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { toast } from "react-toastify";

const Login = ({ dispatch, navigate, location }) => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [code, setCode] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  // SUBMIT LOGIN/REGISTER
  const handleSubmits = async (data) => {
    const { firstName, lastName, phone, ...payLoad } = data;
    if (isRegister) {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiRegister(data);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) setIsVerifiedEmail(true);
      else toast.error(response.mes);
    } else {
      const response = await apis.apiLogin(payLoad);
      if (response.success)
        Swal.fire("Successfully", "Đăng nhập thành công", "success").then(
          () => {
            dispatch(
              login({
                isLoggedIn: true,
                token: response.accessToken,
                currentData: response.userData,
              })
            );
            searchParams.get("redirect")
              ? navigate(searchParams.get("redirect"))
              : navigate(`/${path.HOME}`);
          }
        );
      else toast.info(response.mes);
    }
  };
  // FINAL REGISTER
  const finalregister = async () => {
    const response = await apis.apiFinalRegister(code);
    if (response.success)
      Swal.fire(
        "Successfully",
        "Đăng ký tài khoản thành công! Hãy đăng nhập và tiếp tục",
        "success"
      ).then(() => {
        setIsRegister(false);
        reset();
        setIsVerifiedEmail(false);
        setCode(null);
      });
    else toast.error(response.mes);
  };
  // FORGOT PASSWORD
  const handleForgotPassword = async () => {
    const response = await apis.apiForgotPassword({ email });
    if (response.success)
      Swal.fire("Successfully", response.mes, "success").then(() => {
        setIsForgotPassword(false);
        reset();
        setEmail(null);
      });
    else toast.error(response.mes);
  };
  // CHECK REGISTER
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [isLoggedIn]);
  return (
    <div className="w-screen h-screen relative">
      {/* FINAL REGISTER */}
      {isVerifiedEmail && (
        <div className="absolute inset-0 flex items-center bg-overlay50 z-10">
          <FinalRegister
            setIsVerifiedEmail={setIsVerifiedEmail}
            setCode={setCode}
            email={watch("email")}
            finalregister={finalregister}
          />
        </div>
      )}
      {/* FORGOT PASSWORD */}
      {isForgotPassword && (
        <div className="absolute inset-0 flex items-center justify-center bg-overlay50 z-10">
          <ForgotPassword
            setIsForgotPassword={setIsForgotPassword}
            setEmail={setEmail}
            handleForgotPassword={handleForgotPassword}
          />
        </div>
      )}
      {/* LOGIN/REGISTER */}
      <img
        src="https://instructivetech.com/wp-content/uploads/2022/11/background.jpg"
        alt={`${isRegister ? "đăng ký" : "đăng nhập"}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-overlay50 flex items-center px-20">
        <div className="p-8 bg-white rounded-md min-w-[500px]">
          <h1 className="text-3xl font-semibold uppercase text-center mb-10">
            {isRegister ? "đăng ký" : "đăng nhập"}
          </h1>
          <div className="w-full flex flex-col gap-5">
            <form
              onSubmit={handleSubmit(handleSubmits)}
              className="w-full form-control flex flex-col gap-5"
            >
              {isRegister && (
                <>
                  <div className="flex gap-5">
                    <InputForm
                      label={"first name"}
                      register={register}
                      id={"firstName"}
                      placeholder={"First Name..."}
                      wf
                      errors={errors}
                      validate={{ required: "Điền thông tin bắt buộc." }}
                      classInput={"input-bordered"}
                    />
                    <InputForm
                      label={"last name"}
                      register={register}
                      id={"lastName"}
                      placeholder={"Last Name..."}
                      wf
                      errors={errors}
                      validate={{ required: "Điền thông tin bắt buộc." }}
                      classInput={"input-bordered"}
                    />
                  </div>
                  <InputForm
                    label={"Phone"}
                    register={register}
                    id={"phone"}
                    placeholder={"Phone..."}
                    wf
                    errors={errors}
                    validate={{
                      required: "Điền thông tin bắt buộc.",
                      pattern: {
                        value:
                          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                        message: "Số điện thoại không hợp lệ.",
                      },
                    }}
                    classInput={"input-bordered"}
                  />
                </>
              )}
              <InputForm
                label={"Email"}
                register={register}
                id={"email"}
                placeholder={"Email..."}
                wf
                errors={errors}
                validate={{
                  required: "Điền thông tin bắt buộc.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Địa chỉ email không hợp lệ.",
                  },
                }}
                classInput={"input-bordered"}
                type="email"
              />
              <InputForm
                label={"Password"}
                register={register}
                id={"password"}
                placeholder={"Password..."}
                wf
                errors={errors}
                validate={{
                  required: "Điền thông tin bắt buộc.",
                }}
                classInput={"input-bordered"}
                type="password"
              />
              <Button
                name={isRegister ? "đăng ký" : "đăng nhập"}
                styles={"btn-info text-white"}
                wf
                type="submit"
              />
            </form>
            <div className="w-full">
              {isRegister ? (
                <span>
                  Bạn đã có tài khoản?{" "}
                  <span
                    className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                    onClick={() => {
                      setIsRegister(false);
                      reset();
                    }}
                  >
                    Đăng nhập
                  </span>
                </span>
              ) : (
                <div className="flex flex-col gap-1">
                  <span>
                    Bạn chưa có tài khoản?{" "}
                    <span
                      className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                      onClick={() => {
                        setIsRegister(true);
                        reset();
                      }}
                    >
                      Đăng ký
                    </span>
                  </span>
                  <span>
                    Quên mật khẩu?{" "}
                    <span
                      className="text-blue-500 hover:text-red-500 transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsForgotPassword(true);
                      }}
                    >
                      Nhấn vào đây
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(Login);
