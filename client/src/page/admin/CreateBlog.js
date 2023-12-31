import {
  Button,
  InputForm,
  InputImage,
  Loading,
  MarkDownEditer,
} from "components";
import withBase from "hocs/withBase";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { getBase64, title_head, validate } from "ultils/helpers";
import * as apis from "apis";

const CreateBlog = ({ dispatch }) => {
  title_head("Tạo blog");
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  const [image, setImage] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const handleCreateBlog = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.image) formData.append("image", finalPayload.image[0]);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiCreateBlog(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success("Tạo sản phẩm thành công");
        resteData();
      } else toast.error(response.mes);
    }
  };

  const resteData = () => {
    reset();
    setPayload({ description: "" });
    setImage(null);
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewImage = async (file) => {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      toast.warning(
        "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
        { theme: "colored" }
      );
      return;
    } else {
      const base64Thumb = await getBase64(file);
      setImage((prev) => ({ ...prev, thumb: base64Thumb }));
    }
  };

  useEffect(() => {
    if (watch("image").length > 0) handlePreviewImage(watch("image")[0]);
  }, [watch("image")]);

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b px-[30px] py-[39px]">
          <span className="uppercase">tạo blog mới</span>
        </h1>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleCreateBlog)}
          className="flex flex-col gap-5 w-3/5 mx-auto py-10"
        >
          <InputForm
            label={"tên tin tức"}
            id={"title"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            wf
            placeholder={"Nhập tên tin tức..."}
            classInput={`input-bordered`}
            errors={errors}
          />
          <MarkDownEditer
            label={"mô tả"}
            name={"description"}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputImage
            thumb
            register={register}
            id={"image"}
            label={"Tải lên hình ảnh tin tức"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            preview={image}
            errors={errors}
          />
          <Button
            name={"tạo sản phẩm"}
            styles={`${isDirty ? "btn-info" : "btn-disabled"} text-white`}
            type="submit"
            wf
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(CreateBlog);
