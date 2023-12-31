const path = {
  ALL: "*",
  HOME: "",
  // PUBLIC
  PUBLIC: "/",
  LOGIN: "login",
  PRODUCT: "products",
  PRODUCT_CATEGORY: ":category",
  DETAIL_PRODUCT__PID__TITLE: ":pid/:title",
  NEWS: "news",
  DETAIL_NEWS__BID__TITLE: ":bid/:title",
  INTRODUCE: "introduce",
  CONTACT: "contact",
  RESET_PASSWORD: "reset-password/:token",
  SEARCH_PRODUCT: "search-product",
  // ADMIN
  ADMIN: "admin",
  DASH_BOARD: "dash-board",
  MANAGER_USER: "manager-user",
  MANAGER_PRODUCT: "manager-product",
  MANAGER_ORDER: "manager-order",
  CREATE_PRODUCT: "create-product",
  MANAGER_BLOG: "manager-blog",
  CREATE_BLOG: "create-blog",
  // MEMBER
  MEMBER: "member",
  WISH_LIST: "my-wish-list",
  PERSIONAL: "personal",
};

export default path;
