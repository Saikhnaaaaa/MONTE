import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuPage from "../pages/UserMenuPage";
import Profile from "../pages/Profile";
import Dashboard from "../layouts/Dashboard";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPAge from "../pages/SubCategoryPAge";
import ProductPage from "../pages/ProductPage";
import UploadProductPage from "../pages/UploadProductPage";
import AdminPermission from "../layouts/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobileDisplay from "../pages/CartMobileDisplay";
import CkeckoutPage from "../pages/CkeckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "profile", element: <Profile /> },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                <CategoryPage />,
              </AdminPermission>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermission>
                <SubCategoryPAge />,
              </AdminPermission>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                <ProductPage />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProductPage />
              </AdminPermission>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobileDisplay />,
      },
      {
        path: "checkout",
        element: <CkeckoutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);

export default reactRouter;
