import path from "./path";

// NAVIGATION
export const navigation = [
  {
    id: 1,
    title: "trang chủ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    title: "sản phẩm",
    path: `/${path.PRODUCT}`,
  },
  {
    id: 3,
    title: "tin tức",
    path: `/${path.NEWS}`,
  },
  {
    id: 4,
    title: "giới thiệu",
    path: `/${path.INTRODUCE}`,
  },
  {
    id: 5,
    title: "liên hệ",
    path: `/${path.CONTACT}`,
  },
  {
    id: 6,
    title: "blog",
    path: `/${path.BLOG}`,
  },
];
// HOME/PRODUCT NEW
export const HomeProductNew = [
  {
    _id: 1,
    title: "Trang chủ",
    brand: ["vận chuyển", "tài khoản", "hỗ trợ", "thanh toán", "liên hệ"],
    image:
      "https://res.cloudinary.com/npctungadmin/image/upload/v1696502432/quan-ly-ruou/collection_carousel_background_5_h4veop.jpg",
  },
  {
    _id: 2,
    title: "Sản phẩm mới",
    brand: [
      "tài khoản của tôi",
      "đăng nhập",
      "đăng ký",
      "thông tin tài khoản",
      "giới thiệu",
    ],
    image:
      "https://res.cloudinary.com/npctungadmin/image/upload/v1696502432/quan-ly-ruou/collection_carousel_background_6_v4pbtx.jpg",
  },
];
