import axios from "axios";

// const devEnv = process.env.NODE_ENV !== "production";

// const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: "http://localhost:5000/"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/register", formData);
export const updateUser = (UserData,id) => API.get(`/user/update/${id}`,UserData);
export const updatePassword = (UserData,id) => API.get(`/user/updatePassword/${id}`,UserData);

// export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
// export const facebookSignIn = (result) => API.post("/users/facebookSignIn", result);

 export const createProduct = (ProductData) => API.post("/product", ProductData);
 export const getProducts = (page) => API.get(`/product?page=${page}`);
 export const getProduct = (id) => API.get(`/product/${id}`);
 export const deleteProduct = (id) => API.delete(`/product/${id}`);
 export const updateProduct = (updateProductData, id) =>
   API.patch(`/Product/${id}`, updateProductData);
 export const getProductsByUser = (userId) => API.get(`/product/userProducts/${userId}`);


 export const getProductsBySearch = (searchQuery) =>
   API.get(`/product/search?searchQuery=${searchQuery}`);

  export const getProductBySearchDomaine = (searchQuery) =>
   API.get(`/product/searchdomaines?searchQuery=${searchQuery}`);

  export const getProductBySearchPay = (searchQuery) =>
   API.get(`/product/searchpays?searchQuery=${searchQuery}`);

 export const getDomaineProducts = (domaine) => API.get(`/product/domaine/${domaine}`);
 export const getPayProducts = (pay) => API.get(`/product/pay/${pay}`);
 export const getRelatedProducts = (tags) => API.post(`/product/relatedProducts`, tags);
 export const likeProduct = (id) => API.patch(`/product/like/${id}`);
 export const getWishProduct = (productArray) => API.patch(`/product/wish-product/`,productArray);

