import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import CompanyReducer from "./features/companySlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    company: CompanyReducer,
  },
});
