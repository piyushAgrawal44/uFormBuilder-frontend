import React, { useEffect, useState } from 'react'
import Button from './subcomponents/Button'

import { Link, useNavigate } from "react-router-dom";
import CustomLoader from './CustomLoader';
import QuizMingoLogo from "../images/quizmingo-logo.png";

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app"
export default function Home() {
  const navigate=useNavigate()
  const [forms, setForms] = useState([

  ]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (localStorage.getItem('quizmingo_315123_auth_token')) {
      navigate("/login");
      return ;
    }
    const response = await fetch(backendURL + "/fetch/form", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
      },

    });
    const resultData = await response.json();
    if (!resultData.success) {
      console.log(resultData.message, "failed")
    }
    let data = resultData.data;
    setForms(data);
    setLoading(false);
  }
  
  const logout=()=>{
    console.log("Logout");
  }

  useEffect(() => {
    
    fetchData();
// eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white p-2 h-screen">
      
      
      <div className="text-center mt-5">
        <img src={QuizMingoLogo} className='max-w-[300px] w-[280px] mx-auto' alt="logo" />
        <span>QuizMingo - Your trusted platform for seamless online assessments</span>
      </div>
      <div className="flex justify-center gap-5">
          <Link to="/account" className='text-blue-600 hover:text-blue-700'><i className='bi bi-person'></i> Account</Link>
          <button onClick={logout} className='text-blue-600 hover:text-blue-700'><i class="bi bi-box-arrow-right"></i> Logout</button>
      </div>

      <br />
      <br />
      <div className="d-flex text-end">
        <Link to="/new/form">
          <Button text={"+ New Form"} />
        </Link>
      </div>
      
      <h5 className='mb-2 text-lg font-semibold'>Form List: </h5>
      {
        loading ? <CustomLoader />:
      
      <div>
        {
          forms.map((ele, index) => {
            return (
              <div key={index}>
                <div className='mb-1 px-3 py-2 bg-gray-200  rounded-[2px] flex justify-between'>
                  <div className='flex items-center flex-wrap'>
                    <Link target="_blank" to={ele.status === 2 ? "/view/form?id=" + ele.id:"/edit/form?id=" + ele.id}><span className='font-semibold'>{ele.name}</span></Link> &nbsp;<span> | &nbsp;<span>{ele.status === 1 ? "Draft" : "Active"}</span>&nbsp; | </span>&nbsp;<span className='text-sm'>Created On: {ele.date}</span>
                  </div>
                  
                  <div className='flex items-center gap-2'>

                    {
                      ele.status === 1 && <Link to={"/edit/form?id=" + ele.id}>
                        <Button text="Edit" />
                      </Link>
                    }

                    {
                      ele.status === 2 && <Link target="_blank" to={"/view/form?id=" + ele.id}>
                        <Button text="View" />
                      </Link>
                    }
                    {
                      ele.status === 2 && <Link target="_blank" to={"/view/form/response?id=" + ele.id}>
                        <Button text="Responses" />
                      </Link>
                    }

                  </div>
                </div>
              </div>
            )
          })
        }


      </div>
      }
      <br />
    </div>
  )
}
