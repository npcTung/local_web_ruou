import React, { memo, useEffect, useState } from "react";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import { useForm } from "react-hook-form";
import icons from "ultils/icons";
import { Button, InputForm, InputImage, Loading } from "components";
import { getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import * as apis from "apis";

const { MdOutlineClear } = icons;

const CustomizeVarriant = ({ productData, dispatch, rerender }) => {
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const handleVarriant = async (data) => {
    const finalPayload = { ...data };
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
    if (finalPayload.images)
      for (let image of finalPayload.images) formData.append("images", image);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apis.apiAddVarriant(productData?._id, formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) toast.success("Thêm biến thể thành công");
    else toast.error(response.mes);
    resteData();
    rerender();
  };
  // ẢNH ĐẠI DIỆN CỦA SẢN PHẨM
  const handlePreviewThumb = async (file) => {
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
      setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
    }
  };
  // ẢNH SẢN PHẨM
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toast.warning(
          "Định dạng ảnh sai\nChỉ nhận định dạng file có đuôi .png hoặc .jpg",
          { theme: "colored" }
        );
        return;
      } else {
        const base64 = await getBase64(file);
        imagesPreview.push({ name: file.name, path: base64 });
      }
    }
    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("thumb").length > 0) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images").length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);
  // RESET DATA
  const resteData = () => {
    reset();
    setPreview({ thumb: null, images: [] });
  };
  // RENDER THUMB
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  // RENDER IMAGES
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div
      className="p-5 bg-white rounded-md animate-scale-in-center w-[60%] h-4/5"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b py-5]">
        <span className="capitalize">{`thêm biến thể của sản phẩm "${productData?.title.toLowerCase()}"`}</span>
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
      <div className="w-full h-[96%] overflow-y-scroll px-5 border-b">
        <form
          onSubmit={handleSubmit(handleVarriant)}
          className="flex flex-col gap-5 mx-auto py-10"
        >
          <div className="flex justify-between gap-5">
            <InputForm
              label={"giá sản phẩm(VNĐ)"}
              id={"price"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập giá sản phẩm..."}
              classInput={`input-bordered`}
              errors={errors}
              type="number"
            />
            <InputForm
              label={"số lượng sản phẩm"}
              id={"quantity"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập số lượng sản phẩm..."}
              classInput={`input-bordered`}
              errors={errors}
              type="number"
            />
            <InputForm
              label={"màu sản phẩm"}
              id={"color"}
              register={register}
              validate={{ required: "Điền thông tin bắt buộc." }}
              wf
              placeholder={"Nhập màu sản phẩm..."}
              classInput={`input-bordered`}
              errors={errors}
            />
          </div>
          <InputImage
            thumb
            register={register}
            id={"thumb"}
            label={"Tải lên hình ảnh đại diện của sản phẩm"}
            preview={preview}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
          />
          <InputImage
            images
            register={register}
            id={"images"}
            label={"Tải lên danh sách hình ảnh sản phẩm"}
            preview={preview}
            errors={errors}
            validate={{ required: "Điền thông tin bắt buộc." }}
          />
          <Button
            name={"sửa sản phẩm"}
            styles={`${isDirty ? "btn-info" : "btn-disabled"} text-white`}
            type="submit"
            wf
          />
        </form>
      </div>
    </div>
  );
};

export default withBase(memo(CustomizeVarriant));
