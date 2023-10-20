import React, { memo, useCallback, useEffect, useState } from "react";
import withBase from "hocs/withBase";
import icons from "ultils/icons";
import { showModal } from "store/app/appSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Button,
  InputForm,
  InputImage,
  Loading,
  MarkDownEditer,
  Select,
} from "components";
import { createSlug, getBase64, validate } from "ultils/helpers";
import { toast } from "react-toastify";
import * as apis from "apis";

const { MdOutlineClear } = icons;

const UpdateProductAdmin = ({ productData, rerender, dispatch }) => {
  const { categories } = useSelector((state) => state.app);
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({ description: "" });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => createSlug(el.title) === data.category
        )?.title;
      if (data.brand)
        data.brand = categories
          ?.find((el) => createSlug(el.title) === watch("category"))
          ?.brand?.find((els) => createSlug(els) === data.brand);
      const finalPayload = { ...data, ...payload };
      finalPayload.thumb =
        data?.thumb.length === 0 ? preview.thumb : data.thumb[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      finalPayload.images =
        data.images?.length === 0 ? preview.images : data.images;
      for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiUpdateProduct(productData._id, formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) toast.success("Sửa sản phẩm thành công");
      else toast.error(response.mes);
      resteData();
      rerender();
    }
  };
  // MÔ TẢ
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  ); // ẢNH ĐẠI DIỆN CỦA SẢN PHẨM
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
          "Định dạng ảnh sai chỉ nhận định dạng file có đuôi .png hoặc .jpg",
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
  // RESET DATA
  const resteData = () => {
    reset();
    setPayload({ description: "" });
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
  // RENDER PRODUCT DATA
  useEffect(() => {
    reset({
      price: productData?.price || "",
      color: productData?.color?.toLowerCase() || "",
      title: productData?.title?.toLowerCase() || "",
      category: createSlug(productData?.category) || "",
      brand: createSlug(productData?.brand) || "",
      quantity: productData?.quantity || "",
    });
    setPayload({
      description:
        typeof productData?.description === "object"
          ? productData?.description.join(", ")
          : productData?.description,
    });
    setPreview({
      images: productData?.images || [],
      thumb: productData?.thumb || "",
    });
  }, [productData]);

  return (
    <div
      className="p-5 bg-white rounded-md animate-scale-in-center w-[60%] h-4/5"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="flex justify-between items-center text-lg font-semibold border-b py-5]">
        <span className="capitalize">{`sửa thông tin sản phẩm "${productData?.title.toLowerCase()}"`}</span>
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
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="flex flex-col gap-5 mx-auto py-10"
        >
          <InputForm
            label={"tên sản phẩm"}
            id={"title"}
            register={register}
            validate={{ required: "Điền thông tin bắt buộc." }}
            wf
            placeholder={"Nhập tên sản phẩm..."}
            classInput={`input-bordered`}
            errors={errors}
          />
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
          <div className="flex justify-between gap-5">
            <Select
              label={"loại"}
              id={"category"}
              register={register}
              errors={errors}
              options={categories
                ?.filter((el) => el.title !== "Cửa hàng")
                ?.map((el) => ({
                  code: createSlug(el.title),
                  value: el.title,
                }))}
              wf
              validate={{ required: "Điền thông tin bắt buộc." }}
              classSelect={"select-bordered bg-gray-100"}
            />
            <Select
              label={"thương hiệu"}
              id={"brand"}
              register={register}
              errors={errors}
              options={categories
                ?.find((el) => createSlug(el.title) === watch("category"))
                ?.brand?.map((els) => ({ code: createSlug(els), value: els }))}
              wf
              validate={{ required: "Điền thông tin bắt buộc." }}
              classSelect={"select-bordered bg-gray-100"}
            />
          </div>
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

export default withBase(memo(UpdateProductAdmin));
