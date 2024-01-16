import Home from "./components/Home";
import NewForm from "./components/NewForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from "./components/NotFound";
import ViewForm from "./components/ViewForm";
import Alert from "./components/Alert";
import { useState } from "react";
import EditForm from "./components/EditForm";
import UserResponse from "./components/UserResponse";
import ViewResponse from "./components/ViewResponse";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import LoginPage from "./components/user_authentication/LoginPage";
import SignupPage from "./components/user_authentication/SignupPage";
import ForgotPasswordPage from "./components/user_authentication/ForgotPassword";
import VerifyEmailPage from "./components/user_authentication/VerifyEmail";
import VerifyEmailToken from "./components/user_authentication/VerifyEmailToken";
import AccountPage from "./components/user_account/Account";
import EditAccountDetails from "./components/user_account/EditAccountDetails";
import EditContactDetails from "./components/user_account/EditContactDetails";
import VerifyEmailMessage from "./components/user_authentication/VerifyEmailMessage";


function App() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const Backend = isMobile ? TouchBackend : HTML5Backend;
  const [alert, setAlert] = useState({ display: false, message: "", type: "danger" });

  // const currentYear = new Date().getFullYear();
  return (
    <DndProvider backend={Backend}>
      <div className="bg-[#f2f3ff] min-h-screen">

        {alert.display && <div className="relative ">
          <Alert message={alert.message} type={alert.type} />
        </div>
        }

        <Router basename='/'>


          <Routes>
            <Route exact path='/' element={<Home />} />

            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/signup' element={<SignupPage />} />
            <Route exact path='/verify-email-message' element={<VerifyEmailMessage />} />
            <Route exact path='/verify-by-token' element={<VerifyEmailToken />} />
            <Route exact path='/verify-email-otp' element={<VerifyEmailPage />} />
            <Route exact path='/forgot-password' element={<ForgotPasswordPage setAlert={setAlert} />} />

            <Route exact path='/account' element={<AccountPage />} />
            <Route exact path='/edit-account' element={<EditAccountDetails />} />
            <Route exact path='/edit-contact-details' element={<EditContactDetails />} />



            <Route exact path='/new/form' element={<NewForm setAlert={setAlert} />} />
            <Route exact path='/view/form' element={<ViewForm setAlert={setAlert} />} />
            <Route exact path='/edit/form' element={<EditForm setAlert={setAlert} />} />
            <Route exact path='/view/form/response' element={<UserResponse setAlert={setAlert} />} />
            <Route exact path='/view/response' element={<ViewResponse setAlert={setAlert} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </Router>

        {/* <p className="text-center text-gray-500 text-sm">&copy; {currentYear} QuizMingo. All rights reserved.</p> */}
      </div>
    </DndProvider>
  );
}

export default App;
