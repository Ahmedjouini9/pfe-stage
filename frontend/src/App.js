import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUser } from "./redux/features/authSlice.js";
import Body from './pages/Body'

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <div >
        <Body />
      </div>
    </BrowserRouter>
  );
}

export default App;
