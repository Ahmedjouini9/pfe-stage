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

 export const createCompany = (CompanyData) => API.post("/company", CompanyData);
 export const getCompanys = (page) => API.get(`/company?page=${page}`);
 export const getCompany = (id) => API.get(`/company/${id}`);
 export const deleteCompany = (id) => API.delete(`/company/${id}`);
 export const updateCompany = (updateCompanyData, id) =>
   API.patch(`/company/${id}`, updateCompanyData);
 export const getCompanysByUser = (userId) => API.get(`/company/userCompanys/${userId}`);


 export const getCompanysBySearch = (searchQuery) =>
   API.get(`/company/search?searchQuery=${searchQuery}`);

  export const getCompanyBySearchDomaine = (searchQuery) =>
   API.get(`/company/searchdomaines?searchQuery=${searchQuery}`);

  export const getCompanyBySearchPay = (searchQuery) =>
   API.get(`/company/searchpays?searchQuery=${searchQuery}`);

 export const getDomaineCompanys = (domaine) => API.get(`/company/domaine/${domaine}`);
 export const getPayCompanys = (pay) => API.get(`/company/pay/${pay}`);
 export const getRelatedCompanys = (tags) => API.post(`/company/relatedCompanys`, tags);
 export const likeCompany = (id) => API.patch(`/company/like/${id}`);
