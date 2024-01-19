import React, { useCallback, useEffect, useState } from 'react'
import Button from './subcomponents/Button'

import { Link, useNavigate } from "react-router-dom";
import CustomLoader from './CustomLoader';
import QuizMingoLogo from "../images/quizmingo-logo.png";
import { toast } from 'react-toastify';

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app"
export default function Home() {
  const navigate = useNavigate()
  const [formsReference, setFormsReference] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    if (!localStorage.getItem('quizmingo_315123_auth_token') && !sessionStorage.getItem('quizmingo_315123_auth_token')) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(backendURL + "/fetch/form", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-auth-token': localStorage.getItem('quizmingo_315123_auth_token') ?? "test"
        },
      });
    
      const resultData = await response.json();
    
      if (!resultData.success) {
        console.log(resultData.message, "failed");
        toast.error('Internal server error!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // milliseconds
        });
      } else {
        let data = resultData.data;
        setForms(data);
        setFormsReference(data);
      }
    
      setLoading(false);
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while fetching data!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // milliseconds
      });
    
      setLoading(false);
    }
    
  }


  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Successfully Logged Out', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // milliseconds
    });
    navigate("/login",{replace: true});
    return;
  }

  const searchForm = useCallback(() => {
    if (query !== '') {
      let filteredData = formsReference.filter((ele) => {
        return (
          ele.name.toLowerCase().includes(query.toLowerCase()) ||
          ele.date.toLowerCase().includes(query.toLowerCase()) ||
          (ele.status === 2 ? 'active' : 'draft').includes(query.toLowerCase())
        );
      });
      setForms(filteredData);
    } else {
      setForms(formsReference);
    }
  }, [query, formsReference]);

  useEffect(() => {

    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchForm();

    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query,searchForm]);

  return (
    <div className="p-5 bg-[#f3f3ff] min-h-screen">


      <div className="text-center mt-5">
        <img src={QuizMingoLogo} className='max-w-[300px] w-[280px] mx-auto' alt="logo" />
        <span>QuizMingo - Your trusted platform for seamless online assessments</span>
      </div>
      <div className="flex justify-center gap-5">
        <Link to="/account" className='text-blue-600 hover:text-blue-700'><i className='bi bi-person'></i> Account</Link>
        <button onClick={logout} className='text-blue-600 hover:text-blue-700'><i className="bi bi-box-arrow-right"></i> Logout</button>
      </div>

      <br />
      <br />
      <div className="d-flex text-end">
        <Link to="/new/form">
          <Button text={"+ New Form"} />
        </Link>
      </div>


      <div className="flex justify-between items-center mt-5 mb-2">
        <h5 className=' text-lg font-semibold shrink-0'>Form List: </h5>



        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-2 sm:ps-2 ">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" className="max-w-[120px] sm:max-w-[300px] shrink block p-3 ps-8 sm:ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500" placeholder="Search name..." onChange={event => setQuery(event.target.value)} />
        </div>



      </div>

      {
        loading ? <CustomLoader /> :

          <div>
            {
              forms.map((ele, index) => {
                return (
                  <div key={index}>
                    <div className='mb-1 px-3 py-2 bg-white shadow-sm border border-1 border-gray-200 rounded-[2px] flex justify-between'>
                      <div className='flex items-center flex-wrap'>
                        <Link  to={ele.status === 2 ? "/view/form?id=" + ele.id : "/edit/form?id=" + ele.id}><span className='font-semibold'>{ele.name}</span></Link> &nbsp;<span> | &nbsp;<span>{ele.status === 1 ? "Draft" : "Active"}</span>&nbsp; | </span>&nbsp;<span className='text-sm'>Created On: {ele.date}</span>
                      </div>

                      <div className='flex flex-wrap sm:flex-nowrap items-center gap-2'>

                        {
                          ele.status === 1 && <Link to={"/edit/form?id=" + ele.id}>
                            <Button text="Edit" />
                          </Link>
                        }

                        {
                          ele.status === 2 && <Link  to={"/view/form?id=" + ele.id}>
                            <Button text="View" />
                          </Link>
                        }
                        {
                          ele.status === 2 && <Link  to={"/view/form/response?id=" + ele.id}>
                            <Button text="Responses" />
                          </Link>
                        }

                      </div>
                    </div>
                  </div>
                )
              })
            }

            {
              forms.length===0 && <span className='text-gray-600'>No data found...</span>
            }


          </div>
      }
      <br />
    </div>
  )
}
