import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  InputForm,
  InputImage,
  Loading,
  MarkDownEditer,
  Select,
} from "components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createSlug, getBase64, title_head, validate } from "ultils/helpers";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import * as apis from "apis";

const CreateProduct = ({ dispatch }) => {
  const { categories } = useSelector((state) => state.app);
  const [payload, setPayload] = useState({ description: "" });
  const [invalidFields, setInvalidFields] = useState([]);
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm();

  const handleCreateProduct = async (data) => {
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
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images)
        for (let image of finalPayload.images) formData.append("images", image);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apis.apiCreateProduct(formData);
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
    setPreview({ thumb: null, images: [] });
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
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

  title_head("Tạo sản phẩm mới");

  return (
    <div className="w-full">
      <div className="h-[115px]"></div>
      <div className="fixed z-10 bg-gray-50 top-0 w-full">
        <h1 className="flex justify-between items-center text-3xl font-semibold border-b px-[30px] py-[39px]">
          <span className="uppercase">tạo sản phẩm mới</span>
        </h1>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="flex flex-col gap-5 w-3/5 mx-auto py-10"
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
          />
          <InputImage
            thumb
            register={register}
            id={"thumb"}
            label={"Tải lên hình ảnh đại diện của sản phẩm"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            preview={preview}
            errors={errors}
          />
          <InputImage
            images
            register={register}
            id={"images"}
            label={"Tải lên danh sách hình ảnh sản phẩm"}
            validate={{ required: "Điền thông tin bắt buộc." }}
            preview={preview}
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

export default withBase(CreateProduct);
