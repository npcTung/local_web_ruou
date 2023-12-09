import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Contact,
  DetailProduct,
  Home,
  Introduce,
  Login,
  News,
  Personal,
  ProductCategory,
  Products,
  Public,
  ResetPassword,
  SearchProduct,
  WishList,
} from "page/public";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { getCategories } from "store/app/asyncActions";
import { useSelector } from "react-redux";
import { Modal } from "components";
import { getCurrent } from "store/user/asyncActions";
import { ToastContainer } from "react-toastify";
import icons from "ultils/icons";
import {
  Admin,
  CreateBlog,
  CreateProduct,
  DashBoard,
  ManagerBlog,
  ManagerOrder,
  ManagerProduct,
  ManagerUser,
} from "page/admin";

const { IoIosArrowUp } = icons;

function App({ dispatch }) {
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isOnTop, setIsOnTop] = useState(false);

  const handleOnTop = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 500) {
      setIsOnTop(true);
    } else {
      setIsOnTop(false);
    }
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(getCategories());
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);
    return () => clearTimeout(setTimeoutId);
  }, [isLoggedIn]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnTop);
    return () => {
      window.removeEventListener("scroll", handleOnTop);
    };
  }, [500]);

  return (
    <div className="bg-white">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      {isOnTop && (
        <div
          className="w-14 h-14 p-5 shadow-md fixed bg-white bottom-5 right-5 z-50 rounded-md hover:text-lg transition-all cursor-pointer animate-fade-in"
          onClick={() => window.scrollTo(0, 0)}
        >
          <IoIosArrowUp />
        </div>
      )}
      <Routes>
        {/* PUBLIC */}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.ALL} element={<Home />} />
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCT} element={<Products />} />
          <Route
            path={`${path.PRODUCT}/${path.PRODUCT_CATEGORY}`}
            element={<ProductCategory />}
          />
          <Route
            path={`${path.PRODUCT}/${path.PRODUCT_CATEGORY}/${path.DETAIL_PRODUCT__PID__TITLE}`}
            element={<DetailProduct />}
          />
          <Route path={path.NEWS} element={<News />} />
          <Route path={path.INTRODUCE} element={<Introduce />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.SEARCH_PRODUCT} element={<SearchProduct />} />
          <Route path={path.PERSIONAL} element={<Personal />} />
          <Route path={path.WISH_LIST} element={<WishList />} />
        </Route>
        {/* LOGIN/REGISTER */}
        <Route path={path.LOGIN} element={<Login />} />
        {/* RESET PASSWORD */}
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        {/* ADMIN */}
        <Route path={`${path.ADMIN}`} element={<Admin />}>
          <Route path={`${path.DASH_BOARD}`} element={<DashBoard />} />
          <Route
            path={`${path.MANAGER_PRODUCT}`}
            element={<ManagerProduct />}
          />
          <Route path={`${path.MANAGER_USER}`} element={<ManagerUser />} />
          <Route path={`${path.MANAGER_ORDER}`} element={<ManagerOrder />} />
          <Route path={`${path.CREATE_PRODUCT}`} element={<CreateProduct />} />
          <Route path={`${path.MANAGER_BLOG}`} element={<ManagerBlog />} />
          <Route path={`${path.CREATE_BLOG}`} element={<CreateBlog />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default withBase(App);
