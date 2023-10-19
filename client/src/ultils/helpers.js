import icons from "./icons";
import * as XLSX from "xlsx/xlsx.mjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

export const exportPDF = (capture, fileName) => {
  return new Promise((resolve, reject) => {
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const Width = doc.internal.pageSize.getWidth();
      const Heigth = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, Width, Heigth);
      doc.save(`${fileName}.pdf`);
    });
    resolve("Okee");
  });
};
