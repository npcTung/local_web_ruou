import path from "./path";
import icons from "./icons";

// ICON
const {
  BsStar,
  BsStarFill,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  RiLinkedinFill,
  AiOutlineDashboard,
  MdGroups,
  TbBrandProducthunt,
  MdOutlineCreate,
  RiBillLine,
  FaBlog,
  ImBlog,
} = icons;
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
// FOOTER INFO
export const footerInfo = [
  {
    id: 1,
    title: "thông tin",
    value: [
      "tài khoản của tôi",
      "đăng nhập",
      "đăng ký",
      "thông tin tài khoản",
      "giới thiệu",
    ],
  },
  {
    id: 2,
    title: "chính sách",
    value: ["vận chuyển", "tài khoản", "hỗ trợ", "thanh toán", "liên hệ"],
  },
];
// COLOR PRODUCT
export const colorProduct = [
  {
    _id: 1,
    title: "orange",
  },
  {
    _id: 2,
    title: "green",
  },
  {
    _id: 3,
    title: "blue",
  },
  {
    _id: 4,
    title: "black",
  },
  {
    _id: 5,
    title: "gray",
  },
  {
    _id: 6,
    title: "white",
  },
  {
    _id: 7,
    title: "red",
  },
  {
    _id: 8,
    title: "pick",
  },
  {
    _id: 9,
    title: "oflow",
  },
];
// SORT PRICE
export const sortPrice = [
  {
    _id: 1,
    min: 0,
    max: 1000000,
  },
  {
    _id: 2,
    min: 1000000,
    max: 3000000,
  },
  {
    _id: 3,
    min: 3000000,
    max: 6000000,
  },
  {
    _id: 4,
    min: 6000000,
    max: 8000000,
  },
  {
    _id: 5,
    min: 8000000,
    max: 9999999,
  },
];
// SORTS
export const sorts = [
  {
    id: 1,
    value: "-totalRatings",
    text: "Đặc sắc",
  },
  {
    id: 2,
    value: "-sold",
    text: "Bán chạy nhất",
  },
  {
    id: 3,
    value: "title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 4,
    value: "-title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 5,
    value: "price",
    text: "Giá, thấp đến cao",
  },
  {
    id: 6,
    value: "-price",
    text: "Giá, cao đến thấp",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Ngày, cũ đến mới",
  },
  {
    id: 8,
    value: "-createdAt",
    text: "Ngày, mới đến cũ",
  },
];
// RATINGS
export const ratings = [
  {
    id: 1,
    title: "Rất tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 2,
    title: "Tệ",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 3,
    title: "Bình thường",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 4,
    title: "Tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
  {
    id: 5,
    title: "Rất tốt",
    icon: <BsStar />,
    iconClick: <BsStarFill />,
  },
];
// ICONS FOOTER
export const iconFooter = [
  <FaFacebookF />,
  <FaTwitter />,
  <FaInstagram />,
  <RiLinkedinFill />,
];
// ADMIN SIDEBAR
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Bảng điều khiển",
    path: `/${path.ADMIN}/${path.DASH_BOARD}`,
    icon: <AiOutlineDashboard />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Quản lý tài khoản người dùng",
    path: `/${path.ADMIN}/${path.MANAGER_USER}`,
    icon: <MdGroups />,
  },
  {
    id: 3,
    type: "PAREMT",
    value: "product",
    text: "Quản lý sản phẩm",
    icon: <TbBrandProducthunt />,
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
        subIcon: <MdOutlineCreate />,
      },
      {
        text: "Quản lý sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
        subIcon: <TbBrandProducthunt />,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Quản lý đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGER_ORDER}`,
    icon: <RiBillLine />,
  },
  {
    id: 5,
    type: "PAREMT",
    text: "Quản lý blog",
    value: "blog",
    icon: <FaBlog />,
    submenu: [
      {
        text: "Tạo blog",
        path: `/${path.ADMIN}/${path.CREATE_BLOG}`,
        subIcon: <ImBlog />,
      },
      {
        text: "Quản lý blog",
        path: `/${path.ADMIN}/${path.MANAGER_BLOG}`,
        subIcon: <FaBlog />,
      },
    ],
  },
];
// ROLES
export const roles = [
  {
    code: "2002",
    value: "Admin",
  },
  {
    code: "2023",
    value: "User",
  },
];
// BLOCK STATUS
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
