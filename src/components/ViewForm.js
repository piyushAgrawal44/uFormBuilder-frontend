import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewCategoryQuestion from './subcomponents/ViewCategoryQuestion';
import ViewClozeQuestion from './subcomponents/ViewClozeQuestion';
import ViewComprehensionQuestion from './subcomponents/ViewComprehensionQuestion';
import Button from './subcomponents/Button';
import Input from './subcomponents/Input';
import Label from './subcomponents/Label';

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app"
function ViewForm(props) {

    const urlParams = new URL(window.location.href).searchParams;
    const id = urlParams.get('id');
    const navigate = useNavigate();


    const fetchData = async () => {
        try {


            const response = await fetch(backendURL + "/view/form", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
                },
                body: JSON.stringify({ id: id })
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
            setFormData(data);
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

    const [formData, setFormData] = useState({
        id: "id1",
        title: "Mid Sem 2023",
        questions: [
            {
                question_type: "category-question",
                questionTitle: "arrange category wise",
                categories: ['fruit', 'cloths', 'juice'],
                options: ['banana', 'apple', 'jeans', 'shirt', 'long banana apple juice for you', 'long banana apple juice for you'],
                optionCategoryMapping: ['fruit', 'fruit', 'cloths', 'cloths', 'fruit', 'fruit'],
            },
            {
                question_type: "category-question",
                questionTitle: "arrange category wise",
                categories: ['city', 'cloths'],
                options: ['raigarh', 'raipur', 'jeans', 'shirt'],
                optionCategoryMapping: ['city', 'city', 'cloths', 'cloths'],
            },
            {
                question_type: "cloze-question",
                sentence: "I am a rich man ",
                options: ['dog', 'rich', 'cat', 'frog'],
                correctOptions: [false, true, false, false],
            },
            {
                question_type: "comprehension-question",
                paragraph: "My name is piyush  . Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores corporis, ullam tenetur veritatis doloremque atque fugiat sed, provident quidem pariatur quis voluptatum? Atque architecto error veritatis, qui soluta omnis, dolore hic odit nihil accusamus ipsam voluptatum aspernatur sunt quaerat id sit. Fugit accusantium doloribus, nihil dolorem consectetur architecto sed praesentium, sapiente odit reprehenderit doloremque, ex amet iste eius eveniet tempora aliquid deserunt illo qui sunt! Nisi temporibus molestiae vel harum quod, magnam dignissimos illo ut praesentium obcaecati. Ab iste ad fugiat, corrupti totam accusamus consequuntur autem commodi, accusantium impedit tenetur id voluptate, illum officia? Illum quo similique facilis sapiente est?",
                mcq: [
                    {
                        question: "What is your name. ",
                        options: ['piyush', 'aman'],
                        correctOptions: [true, false]
                    },
                    {
                        question: "What is your name2. ",
                        options: ['piyush', 'aman', "ankit"],
                        correctOptions: [true, false, false]
                    }
                ]
            },

        ]
    });

    const [userDetails, setUserDetails] = useState({ name: "", email: "" })


    const submitForm = async () => {
        let data = {};
        data.form_id = id;
        data.name = userDetails.name.trim();
        data.email = userDetails.email.trim();
        data.answers = [];

        if (data.name.length === 0 || data.email.length === 0) {

            const newAlert = { display: true, message: "Please enter all  user details", type: "danger" };
            props.setAlert(newAlert);

            setTimeout(() => {
                const newAlert = { display: false, message: "", type: "danger" };
                props.setAlert(newAlert);
            }, 2000);
            return;
        }

        formData.questions.map((e, index) => {

            data.answers.push(e.userAnswer);
            return 0;
        });
        data.answers = JSON.stringify(data.answers);
        try {
            // props.setProgress(10);
            const response = await fetch(backendURL + "/save/form", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            // props.setProgress(60);

            const resultData = await response.json();
            // props.setProgress(100);

            if (!resultData.success) {

                const newAlert = { display: true, message: resultData.message, type: "danger" };
                props.setAlert(newAlert);

                setTimeout(() => {
                    const newAlert = { display: false, message: resultData.message, type: "danger" };
                    props.setAlert(newAlert);
                }, 2000);
                return;
            }

            // success
            // success ans updated
            const newAlert = { display: true, message: "Form submitted !", type: "success" };
            props.setAlert(newAlert);

            setTimeout(() => {
                const newAlert = { display: false, message: "", type: "danger" };
                props.setAlert(newAlert);
                navigate('/')
            }, 2000);
            return;



        } catch (error) {
            console.log(error.message);
            props.setAlert({ display: true, message: "Answer saved", type: "success" });

            setTimeout(() => {
                props.setAlert({ display: false, message: "", type: "danger" });
            }, 2000);
            return 0;
        }
    }
    return (
        <>
            <div className='w-[100%]  bg-[#f2f3ff] '>

                <div className="max-w-[576px] mx-auto p-2 py-5 text-start">
                    <h5 className='mb-2 text-xl font-bold text-gray-600'>{formData.title}</h5>
                    <div className='w-full bg-white p-5 mb-3 rounded'>
                        <Label label="User Details" />
                        <div className="flex flex-wrap gap-3">
                            <Input type="text" placeholder="Name" value={userDetails.name} onchange={(e) => {
                                let uDetails = { ...userDetails };
                                uDetails.name = e.target.value.trim();
                                setUserDetails(uDetails);
                            }} />
                            <Input type="email" placeholder="Email" value={userDetails.email} onchange={(e) => {
                                let uDetails = { ...userDetails };
                                uDetails.email = e.target.value.trim();
                                setUserDetails(uDetails);
                            }} />
                        </div>
                    </div>
                    {
                        formData.questions.map((question, questionIndex) => {

                            if (question.question_type === "category-question") {
                                return (
                                    <>
                                        <ViewCategoryQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} />


                                    </>
                                );
                            }
                            else if (question.question_type === "cloze-question") {
                                return (
                                    <ViewClozeQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} />
                                );
                            }
                            else {
                                return (
                                    <ViewComprehensionQuestion key={questionIndex} questionIndex={questionIndex} question={question} formData={formData} setFormData={setFormData} />
                                );
                            }

                        })
                    }

                    <Button text="Submit" onclick={(e) => { submitForm() }} />
                </div>
            </div>
        </>
    )
}

export default ViewForm