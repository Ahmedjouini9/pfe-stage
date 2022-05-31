import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUser } from "./redux/features/authSlice.js";

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
        
    </div>
  );
}

export default App;
