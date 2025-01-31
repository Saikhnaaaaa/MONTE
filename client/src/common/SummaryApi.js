export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  forgot_password_otp_verify: {
    url: "/api/user//verify-forgot-password-otp",
    method: "PUT",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "PUT",
  },
  refreshToken: {
    url: "/api/user/refresh-token",
    method: "POST",
  },
  logout: {
    url: "/api/user/logout",
    method: "POST",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "GET",
  },
  logout: {
    url: "/api/user/logout",
    method: "GET",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "PUT",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "PUT",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "POST",
  },
  uploadImage: {
    url: "/api/file/upload-image",
    method: "POST",
  },
  getCategory: {
    url: "/api/category/get-category",
    method: "GET",
  },
  updateCategory: {
    url: "/api/category/update-category",
    method: "PUT",
  },
  deleteCategory: {
    url: "/api/category/delete-category",
    method: "DELETE",
  },
  createSubCategory: {
    url: "/api/subcategory/create-sub-cat",
    method: "POST",
  },
  getSubCategory: {
    url: "/api/subcategory/get-sub-cat",
    method: "POST",
  },
  updateSubcategory: {
    url: "/api/subcategory/update-sub-cat",
    method: "PUT",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete-sub-cat",
    method: "DELETE",
  },
  createProduct: {
    url: "/api/product/create-product",
    method: "POST",
  },
  getAllProduct: {
    url: "/api/product/get-all-product",
    method: "POST",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "POST",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "POST",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "POST",
  },
  updateProductDetails: {
    url: "/api/product/update-product-details",
    method: "PUT",
  },
  deleteProductDetails: {
    url: "/api/product/delete-product",
    method: "DELETE",
  },
  searchProduct: {
    url: "/api/product/search-product",
    method: "POST",
  },
  addToCart: {
    url: "/api/cart/create-cart",
    method: "POST",
  },
  getCart: {
    url: "/api/cart/get-cart",
    method: "GET",
  },
  updateCartQty: {
    url: "/api/cart/update-qty",
    method: "PUT",
  },
  deleteCartItem: {
    url: "/api/cart/delete-cart-Item",
    method: "DELETE",
  },
  createAddress: {
    url: "/api/address/create-address",
    method: "POST",
  },
  getAddress: {
    url: "/api/address/get-address",
    method: "GET",
  },
  updateAddress: {
    url: "/api/address/update-address",
    method: "PUT",
  },
  deleteAddress: {
    url: "/api/address/delete-address",
    method: "DELETE",
  },
  createOrder: {
    url: "/api/order/cash-on-delivery",
    method: "POST",
  },
  getOrderDetails: {
    url: "/api/order/get-order-details",
    method: "GET",
  },
};

export default SummaryApi;
