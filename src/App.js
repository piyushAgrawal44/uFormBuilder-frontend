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
function App() {

  const [alert, setAlert] = useState({ display: false, message: "", type: "danger" })
  return (
    <div className="bg-[#f5f5f5]">

      {alert.display && <div className=" relative ">
        <Alert message={alert.message} type={alert.type} />
      </div>
      }
      <Router basename='/'>


        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/new/form' element={<NewForm setAlert={setAlert}/>} />
          <Route exact path='/view/form' element={<ViewForm setAlert={setAlert}/>} />
          <Route exact path='/edit/form' element={<EditForm setAlert={setAlert}/>} />
          <Route exact path='/view/form/response' element={<UserResponse setAlert={setAlert}/>} />
          <Route exact path='/view/response' element={<ViewResponse setAlert={setAlert}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
