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
//UserAdmin
export const signIn = (formData) => 
API.post("/user/login", formData);

export const signUp = (formData) => 
API.post("/user/register", formData);

export const updateUser = (UserData,id) => 
API.patch(`/user/update/${id}`,UserData);

export const updatePassword = (UserData,id) => 
API.patch(`/user/updatePassword/${id}`,UserData);

export const getUsers = ()=> 
API.get('/user/allUsers')

export const createUser = (userData) =>
 API.post('/user/createUser',userData)

export const deleteUser = (id) =>
 API.post(`/user/deleteUser/${id}`)

// Company
 export const createCompany = (CompanyData) => 
 API.post("/company", CompanyData);

 export const getCompanys = (page) => 
 API.get(`/company?page=${page}`);

 export const getCompany = (id) => 
 API.get(`/company/${id}`);

 export const deleteCompany = (id) => 
 API.delete(`/company/${id}`);

 export const updateCompany = (updateCompanyData, id) =>
   API.patch(`/company/${id}`, updateCompanyData);

 export const getCompanysByUser = (userId) => 
 API.get(`/company/userCompanys/${userId}`);
 export const getCompanysBySearch = (title) =>
   API.get(`/company/search?searchQuery=${title}`);

  export const getCompanyBySearchDomaine = (domaine) =>
   API.get(`/company/searchdomaines?searchQuery=${domaine}`);

  export const getCompanyBySearchPay = (pay) =>
   API.get(`/company/searchpays?searchQuery=${pay}`);

 export const getDomaineCompanys = (domaine) => 
 API.get(`/company/domaine/${domaine}`);

 export const getPayCompanys = (pay) => 
 API.get(`/company/pay/${pay}`);



 
