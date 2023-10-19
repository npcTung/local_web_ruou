import React, { memo } from "react";
import { Button, InputForm, Select } from "components";
import withBase from "hocs/withBase";
import { useForm } from "react-hook-form";
import { showModal } from "store/app/appSlice";
import icons from "ultils/icons";
import { blockStatus, roles } from "ultils/contans";
import * as apis from "apis";
import { toast } from "react-toastify";

const { MdOutlineClear } = icons;

const EditUserAdmin = ({ dataUser, dispatch, render }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const handleUpdate = async (data) => {
    const response = await apis.apiUpdateUserByAdmin(dataUser?._id, data);
    if (response.success) {
      toast.success("Sửa thông tin người dùng thành công!");
      reset();
      render();
    } else toast.error(response.mes);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  return (
    <div
      className="p-5 bg-white rounded-md animate-scale-in-center w-[60%]"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b py-5]">
        <span className="capitalize">{`sửa thông tin người dùng "${dataUser?.firstName} ${dataUser?.lastName}"`}</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            reset();
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
          }}
        >
          <MdOutlineClear />
        </span>
      </h1>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col gap-5 justify-center"
        >
          <div className="flex justify-between items-center gap-5 ">
            <InputForm
              label={"first name"}
              register={register}
              id={"firstName"}
              placeholder={"First Name..."}
              wf
              errors={errors}
              validate={{ required: "Điền thông tin bắt buộc." }}
              classInput={"input-bordered"}
              defaultValue={dataUser?.firstName}
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
              defaultValue={dataUser?.lastName}
            />
          </div>
          <InputForm
            label={"email address"}
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
            defaultValue={dataUser?.email}
          />
          <InputForm
            label={"phone"}
            register={register}
            id={"phone"}
            placeholder={"Phone..."}
            wf
            errors={errors}
            validate={{
              required: "Điền thông tin bắt buộc.",
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Số điện thoại không hợp lệ.",
              },
            }}
            classInput={"input-bordered"}
            defaultValue={dataUser?.phone}
          />
          <div className="flex items-center justify-between gap-5">
            <Select
              label={"role"}
              register={register}
              errors={errors}
              id={"role"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              defaultValue={dataUser?.role}
              options={roles}
              wf
              classSelect={`select-bordered bg-gray-100`}
            />
            <Select
              label={"status"}
              register={register}
              errors={errors}
              id={"isBlocked"}
              validate={{ required: "Điền thông tin bắt buộc." }}
              defaultValue={dataUser?.isBlocked}
              options={blockStatus}
              wf
              classSelect={`select-bordered bg-gray-100`}
            />
          </div>
          <Button
            name={"cập nhập"}
            type="submit"
            styles={`${isDirty ? "btn-info" : "btn-disabled"} text-white`}
            wf
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(memo(EditUserAdmin));
