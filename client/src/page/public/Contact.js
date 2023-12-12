import React, { useEffect, useState } from "react";
import { Breadcrumbs, Button, InputForm } from "components";
import { iconFooter } from "ultils/contans";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { title_head } from "ultils/helpers";

const Contact = () => {
  const [countFeel, setCountFeel] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleContact = (data) => {
    const { name, email, phone, feel } = data;
    if (!(name || email || phone || feel)) toast.warn("Nhập thiếu dữ liệu!");
    else
      Swal.fire(
        "Successfully",
        "Chúng tôi đã nhận được phản hồi của bạn",
        "success"
      ).then(() => reset());
  };

  useEffect(() => {
    if (watch("feel")) setCountFeel(watch("feel").length);
    else setCountFeel(0);
  }, [watch("feel")]);

  title_head("Liên hệ");

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Liên hệ"} />
          <span className="text-xl uppercase font-semibold">Liên hệ</span>
        </div>
      </div>
      <div className="w-main mx-auto py-20">
        <div className="w-full h-full rounded-md shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.0406727370105!2d105.78240326212884!3d21.02943092759661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cea8a52db%3A0x9cb3411f9e429e2d!2zTmcuIDE1IFAuIER1eSBUw6JuLCBE4buLY2ggVuG7jW5nIEjhuq11LCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1696841494400!5m2!1svi!2s"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[600px] rounded-md"
            title="Google Map of Our Office"
          ></iframe>
        </div>
        <div className="w-full py-20 grid grid-cols-10 gap-10">
          <div className="col-span-3">
            <div className="w-full px-10 py-20 flex flex-col gap-16 bg-[#f6f6f6] shadow-lg rounded-md">
              <div className="w-full flex flex-col gap-5 text-lg text-gray-400">
                <Link to={"tel:0987.654.321"}>0987.654.321</Link>
                <span>Ngõ 15 Duy Tân, Dịch Vọng Hậu, Cầu Giấy</span>
              </div>
              <ul className="flex gap-10 items-center h-5">
                {iconFooter.map((el, idx) => (
                  <li
                    key={idx}
                    className="text-gray-500 hover:text-black hover:pb-2 transition-all"
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-7 flex flex-col gap-10">
            <h2 className="text-xl uppercase font-semibold">
              Chúng tôi rất mong nhận được sự hồi âm từ các bạn
            </h2>
            <form
              onSubmit={handleSubmit(handleContact)}
              className="w-full h-full flex flex-col gap-10"
            >
              <div className="flex justify-between gap-5">
                <InputForm
                  id={"name"}
                  register={register}
                  placeholder={"Nhập tên..."}
                  validate={{
                    required: "Điền thông tin bắt buộc.",
                  }}
                  wf
                  errors={errors}
                  classInput={"input-bordered"}
                />
                <InputForm
                  id={"email"}
                  type={"email"}
                  register={register}
                  placeholder={"Nhập email..."}
                  validate={{
                    required: "Điền thông tin bắt buộc.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Địa chỉ email không hợp lệ.",
                    },
                  }}
                  wf
                  errors={errors}
                  classInput={"input-bordered"}
                />
                <InputForm
                  id={"phone"}
                  register={register}
                  placeholder={"Nhập số điện thoại..."}
                  validate={{
                    required: "Điền thông tin bắt buộc.",
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: "Số điện thoại không hợp lệ.",
                    },
                  }}
                  wf
                  errors={errors}
                  classInput={"input-bordered"}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <textarea
                  placeholder="Cảm nhận..."
                  maxLength={2000}
                  className={`w-full min-h-[300px] max-h-[300px] textarea textarea-bordered ${
                    errors["feel"] && "textarea-error"
                  } bg-gray-100`}
                  {...register("feel", {
                    required: "Điền thông tin bắt buộc.",
                  })}
                />
                <div
                  className={`flex items-center ${
                    errors["feel"] ? "justify-between" : "justify-end"
                  }`}
                >
                  {errors["feel"] && (
                    <small className="text-xs pl-2 pt-1 text-red-500">
                      {errors["feel"]?.message}
                    </small>
                  )}
                  <small className="text-xs text-gray-400">{`${countFeel}/2000`}</small>
                </div>
              </div>
              <Button
                name={"gửi"}
                wf
                styles={"btn-info text-white"}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
