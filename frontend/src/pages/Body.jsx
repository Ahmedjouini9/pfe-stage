import React from 'react'
import {
Routes, Route} from 'react-router-dom'
import Login from './login/login'
import Register from './register/register'
// import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../components/utils/NotFound/NotFound'

// import Company from './companys/companys'
// import AddCompany from './companys/addCompany'
import ForgotPass from './password/forgotPassword'
import ResetPass from './password/ResetPassword'
import UpdatePassword from "./profile/updatePassword"
import Profile from './profile/profile'
// import EditUser from './profile/EditUser'

import Home from './home/home'

import {useSelector} from 'react-redux'

function Body() {
    const { user } = useSelector((state) => ({ ...state.auth }));
    
    return (
        <section>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route path="/login" element={user ? <Home /> : <Login />}  /> 
                <Route path="/register" element={user ? <Home /> : <Register />}  /> 
                {/* <Route path="/createCompany" element={user ? <AddCompany /> : <Login />}  />  */}

                <Route path="/forgot_password" element={user ? <NotFound/> : <ForgotPass/>}  /> 
                <Route path="/user/reset" element={user ? <NotFound /> : <ResetPass/>}  /> 
                <Route path="/updatePassword" element={user ? <UpdatePassword /> : <Login />}></Route>
                {/* <Route path="/user/activate/:activation_token" component={ActivationEmail} exact /> */}

                <Route path="/profile" element={user ? <Profile /> : <NotFound />}  /> 
                
                {/*<Route path="/edit_user/:id" element={isAdmin ? <EditUser /> : <NotFound />}  /> */}

            </Routes>
        </section>
    )
}

export default Body
