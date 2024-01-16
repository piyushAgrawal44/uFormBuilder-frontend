import React, { useEffect, useState } from 'react';
import ViewCategoryQuestion from './subcomponents/ViewCategoryQuestion';
import ViewClozeQuestion from './subcomponents/ViewClozeQuestion';
import ViewComprehensionQuestion from './subcomponents/ViewComprehensionQuestion';
import Input from './subcomponents/Input';
import Label from './subcomponents/Label';
import { useNavigate } from 'react-router-dom';

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app"
function ViewResponse(props) {

    const urlParams = new URL(window.location.href).searchParams;
    const form_id = urlParams.get('form_id');
    const response_id = urlParams.get('response_id');
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        questions: [
        ]
    });
    const navigate = useNavigate();
    const fetchData = async () => {
        if (!localStorage.getItem('quizmingo_315123_auth_token') && !sessionStorage.getItem('quizmingo_315123_auth_token')) {
            navigate("/login");
            return;
          }
        try {

            const response = await fetch(backendURL + "/view/form/single/response", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
                },
                body: JSON.stringify({ form_id: form_id, response_id:response_id  })
            });
            const resultData = await response.json();
            if (!resultData.success) {
               
                const newAlert = { display: true, message: resultData.message, type: "danger" };
                props.setAlert(newAlert);

                setTimeout(() => {
                    const newAlert = { display: false, message: "", type: "danger" };
                    props.setAlert(newAlert);
                }, 2000);
                return;
            }
            let data = resultData.data[0];
            data.questions = JSON.parse(data.questions);
            let user_responses=JSON.parse(resultData.answers);
            
            let tempVar=[];
            data.questions.map((ele,qIndex)=>{
                if(user_responses[qIndex]!==undefined){

                    ele.userAnswer=user_responses[qIndex];
                    tempVar.push(ele);
                }
                return 0;
            });
            data.questions=tempVar;

            setFormData(data);
            const newDetails={name: resultData.name, email: resultData.email}
            setUserDetails(newDetails)
        } catch (error) {

            const newAlert = { display: true, message: "Internal server error", type: "danger" };
            props.setAlert(newAlert);

            setTimeout(() => {
                const newAlert = { display: false, message: "", type: "danger" };
                props.setAlert(newAlert);
            }, 2000);
            return;
        }
    }


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div className='w-[100%] min-h-screen bg-[#f2f3ff] '>

                <div className="max-w-[576px] mx-auto p-2 py-5 text-start">
                    <h5 className='mb-2 text-xl font-bold text-gray-600'>{formData.title}</h5>
                    <div className='w-full bg-white p-5 mb-3 rounded'>
                        <Label label="User Details" />
                        <div className="flex flex-wrap gap-3">
                            <Input type="text" placeholder="Name" value={userDetails.name} onchange={(e) => {
                                let uDetails = { ...userDetails };
                                uDetails.name = e.target.value.trim();
                                setUserDetails(uDetails);
                            }} readonly="true" />
                            <Input type="email" placeholder="Email" value={userDetails.email} onchange={(e) => {
                                let uDetails = { ...userDetails };
                                uDetails.email = e.target.value.trim();
                                setUserDetails(uDetails);
                            }} readonly="false"  />
                        </div>
                    </div>
                    {
                        formData.questions.map((question, questionIndex) => {

                            if (question.question_type === "category-question") {
                                return (
                                    <>
                                        <ViewCategoryQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} showAns={true} />
                                    </>
                                );
                            }
                            else if (question.question_type === "cloze-question") {
                                return (
                                    <ViewClozeQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} showAns={true} />
                                );
                            }
                            else {
                                return (
                                    <ViewComprehensionQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} showAns={true} />
                                );
                            }

                        })
                    }

                </div>
            </div>
        </>
    )
}

export default ViewResponse