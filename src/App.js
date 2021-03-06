import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import TempItemPage1 from "./pages/tempItemPage/tempItemPage1";
import TempItemPage2 from "./pages/tempItemPage/tempItemPage2";
import EditAddPage from "./pages/editAddPage/editAddPage";
import LoginPage from "./pages/loginpage/loginpage";
import RegisterPage from "./pages/registerpage/registerpage";
import CartPage from "./pages/cartpage/cartpage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/UserPage' element={<UserPage/>}/>
          <Route path='/tempItemPage1' element={<TempItemPage1/>}/>
          <Route path='/tempItemPage2' element={<TempItemPage2/>}/>
          <Route path='/addOrEdit' element={<EditAddPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
