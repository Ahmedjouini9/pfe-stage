import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { toast } from "react-toastify";
import {updatePassword} from '../../redux/features/authSlice'
import { isMatch } from "../../components/utils/validation/Validation";
import { useParams } from "react-router-dom";
import PasswordField from '../../components/utils/passwordField/passwordField';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';

const initialState ={
  oldPassword : "",
  newPassword : "",
  confirmPassword : ""
}

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const {loading } = useSelector((state) => state.auth);
  const [user , setUser] = useState(initialState)
  const {oldPassword,newPassword,confirmPassword} = user

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isMatch(newPassword,confirmPassword)){
     return toast.error("password should be match ! ")
    }
    dispatch(updatePassword(id,user));
  };

  const onInputChange = (e) =>{
    let {name , value} = e.target
    setUser({...user ,[name] : value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please Enter your new Password:</DialogContentText>
        <PasswordField onChange={onInputChange} value={oldPassword} />
        <PasswordField onChange={onInputChange} value={newPassword} />
        <PasswordField
          value={newPassword} onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
      <Button variant="contained" endIcon={<Send />} type="submit">
      Submit
    </Button>
      </DialogActions>
    </form>
  );
};

export default UpdatePassword;
