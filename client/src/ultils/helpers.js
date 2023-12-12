import icons from "./icons";
import * as XLSX from "xlsx/xlsx.mjs";

const { BsStar, BsStarFill } = icons;

export const createSlug = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (num) => Number(num).toLocaleString();

export const renderStarFromNumber = (num, size) => {
  const star = [];
  if (!Number(num))
    for (let i = 0; i < +num; i++)
      star.push(<BsStar key={i} size={size || 16} />);
  num = Math.round(num);
  for (let i = 0; i < +num; i++)
    star.push(<BsStarFill key={i} size={size || 16} />);
  for (let i = 5; i > +num; i--)
    star.push(<BsStar key={i} size={size || 16} />);
  return star;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const exportExcel = (data, nameSheet, nameFile) => {
  return new Promise((resolve, reject) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, nameSheet);
    XLSX.writeFile(wb, `${nameFile}.xlsx`);
    resolve("oke");
  });
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let i of formatPayload) {
    if (i[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: i[0], mes: "Trường này không được để trống~" },
      ]);
    }
  }
  return invalids;
};

export const title_head = (title = "Trang chủ") => {
  document.title = `${title} - wine house`;
  const link = document.createElement("link");
  link.rel = "icon";
  link.href =
    "https://res.cloudinary.com/npctungadmin/image/upload/v1702385011/quan-ly-ruou/icon_kzxcff.png";
  link.type = "image/png";
  document.head.appendChild(link);
};
