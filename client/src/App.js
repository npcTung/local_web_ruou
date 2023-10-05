import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Contact,
  Home,
  Introduce,
  Login,
  News,
  ProductCategory,
  Products,
  Public,
  ResetPassword,
} from "page/public";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { getCategories } from "store/app/asyncActions";
import { useSelector } from "react-redux";
import { Modal } from "components";
import { getCurrent } from "store/user/asyncActions";
import { ToastContainer } from "react-toastify";

function App({ dispatch }) {
  const { isShowModal, modalChildren } = useSelector((state) => state.app);
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(getCategories());
      if (isLoggedIn) dispatch(getCurrent());
    }, 1000);
    return () => clearTimeout(setTimeoutId);
  }, [isLoggedIn, dispatch]);

  return (
    <div className="bg-white">
      {isShowModal && <Modal>{modalChildren}</Modal>}
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
          <Route path={path.NEWS} element={<News />} />
          <Route path={path.INTRODUCE} element={<Introduce />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.BLOG} element={<Blog />} />
        </Route>
        {/* LOGIN/REGISTER */}
        <Route path={path.LOGIN} element={<Login />} />
        {/* RESET PASSWORD */}
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
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
