import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Button,
  InputForm,
  InputImage,
  Loading,
  MarkDownEditer,
} from "components";
import withBase from "hocs/withBase";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import { getBase64, validate } from "ultils/helpers";
import icons from "ultils/icons";
import * as apis from "apis";

const { MdOutlineClear } = icons;

const UpdateBlog = ({ blogData, dispatch, rerender }) => {
  const [payload, setPayload] = useState({ description: "" });
  const [image, setImage] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const handleUpdateBlog = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      finalPayload.image =
        data?.image.length === 0 ? image.thumb : data.image[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiUpdateBlog(blogData._id, formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success("Tạo sản phẩm thành công");
        resteData();
        rerender();
      } else toast.error(response.mes);
    }
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const resteData = () => {
    reset();
    setPayload({ description: "" });
    setImage(null);
  };

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
    reset({
      title: blogData.title || "",
    });
    setImage({ thumb: blogData.image });
    setPayload({
      description:
        typeof blogData?.description === "object"
          ? blogData?.description.join(", ")
          : blogData?.description,
    });
  }, [blogData]);

  useEffect(() => {
    if (watch("image") instanceof FileList && watch("image").length > 0)
      handlePreviewImage(watch("image")[0]);
  }, [watch("image")]);

  return (
    <div
      className="p-5 bg-white rounded-md animate-scale-in-center w-[60%] h-4/5"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b py-5]">
        <span className="capitalize">{`sửa thông tin sản phẩm "${blogData?.title.toLowerCase()}"`}</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            resteData();
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
          }}
        >
          <MdOutlineClear />
        </span>
      </h1>
      <div className="w-full h-[96%] overflow-y-scroll px-5 border-b">
        <form
          onSubmit={handleSubmit(handleUpdateBlog)}
          className="flex flex-col gap-5 mx-auto py-10"
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
            value={payload.description}
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

export default withBase(memo(UpdateBlog));
