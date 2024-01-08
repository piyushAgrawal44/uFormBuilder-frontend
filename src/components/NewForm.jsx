import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../reducers/formbuilder/createFormSlice';
import Button from './subcomponents/Button'
import CategorizeQuestion from './subcomponents/CategorizeQuestion'
import ClozeQuestion from './subcomponents/ClozeQuestion'
import ComprehensionQuestion from './subcomponents/ComprehensionQuestion'
import Label from './subcomponents/Label'
import Input from './subcomponents/Input'
import CloseButton from './subcomponents/CloseButton';
import { Link, useNavigate } from "react-router-dom";
import CustomLoader from './CustomLoader';
import CopyButton from './subcomponents/CopyButton';

// let backendURL = "http://localhost:8000"
let backendURL = "https://u-form-builder-backend.vercel.app"
export default function NewForm(props) {

    const questions = useSelector((state) => state.questions);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("category-question");

    const [formTitle, setFormTitle] = useState("");
    const [currentFormId, setCurrentFormId] = useState(null);

    const navigate = useNavigate();


    const save = async (status) => {

        // status ==1 means save as draft and 2 means save as final
        let data = {};
        data['form_title'] = formTitle;
        data['questions'] = JSON.stringify(questions);
        data['status'] = status;
        data['current_form_id'] = currentFormId;

        if (questions.length === 0 || formTitle === "") {

            const newAlert = { display: true, message: "Please enter all required details", type: "danger" };
            props.setAlert(newAlert);

            setTimeout(() => {
                const newAlert = { display: false, message: "", type: "danger" };
                props.setAlert(newAlert);
            }, 2000);
            return;
        }

        setLoading(true);
        try {
            // props.setProgress(10);
            const response = await fetch(backendURL + "/new/form", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token') ?? "test"
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
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
            setLoading(false);
            // success
            if (status === 1) {
                setCurrentFormId(resultData.data._id);
                const newAlert = { display: true, message: "Form save successfully !", type: "success" };
                props.setAlert(newAlert);

                setTimeout(() => {
                    const newAlert = { display: false, message: "", type: "danger" };
                    props.setAlert(newAlert);
                }, 2000);
                return;
            }
            else {
                dispatch(actions.clearQuestion());
                const newAlert = { display: true, message: "Form created successfully !", type: "success" };
                props.setAlert(newAlert);

                setTimeout(() => {
                    const newAlert = { display: false, message: "", type: "danger" };
                    props.setAlert(newAlert);
                    navigate('/')
                }, 2000);
                return;
            }


        } catch (error) {
            setLoading(false);
            console.log(error.message);
            const newAlert = { display: true, message: "Internal server error", type: "danger" };
            props.setAlert(newAlert);

            setTimeout(() => {
                const newAlert = { display: false, message: "", type: "danger" };
                props.setAlert(newAlert);
            }, 2000);
            return;
        }

    }



    return (
        <div className='min-h-screen'>
            {loading ? <CustomLoader /> :
                (
                    <div>
                        <section className='bg-blue-300 z-10 sticky top-0 flex justify-between items-center px-2 py-2'>
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <div className='flex justify-end gap-2'>
                                <Button text="Save Draft" onclick={() => save(1)} />
                                <Button text="Proceed" onclick={() => save(2)} />
                            </div>
                        </section>



                        <div className="p-2 bg-slate-100">

                            <Label label="Form Title" />
                            <Input type="text" name="form_title" placeholder="Type form title" value={formTitle} onchange={(e) => setFormTitle(e.target.value)} />

                            {/* <Label label="Header Image" isRequired={false} />
                                <Input type="file" name="header_image" isRequired={false} /> */}


                            <br />

                            {
                                questions.map((e, index) => {
                                    const commonElements = (
                                        <>

                                            <div className="mt-1 flex items-center gap-2">
                                                <CopyButton text="Copy " onclick={() => dispatch(actions.copyQuestion(index))} />
                                            </div>
                                            <div className='absolute top-0 right-0'>
                                                <CloseButton onclick={() => dispatch(actions.removeQuestion(index))} />
                                            </div>
                                        </>
                                    );

                                    return (
                                        <div key={index}>
                                            {e.question_type === "category-question" && (
                                                <div className='mb-4 relative'>
                                                    <CategorizeQuestion index={index} questionNo={index + 1} />
                                                    {commonElements}
                                                </div>
                                            )}
                                            {e.question_type === "cloze-question" && (
                                                <div className='mb-4 relative'>
                                                    <ClozeQuestion questionNo={index + 1} index={index} />
                                                    {commonElements}
                                                </div>
                                            )}
                                            {e.question_type === "comprehension-question" && (
                                                <div className='mb-4 relative'>
                                                    <ComprehensionQuestion questionNo={index + 1} index={index} />
                                                    {commonElements}
                                                </div>
                                            )}

                                           
                                        </div>
                                    );
                                })
                            }

                            {/* <MyComponent /> */}

                            <div className='flex justify-start items-center gap-3 mt-5 mb-2'>

                                <div className="inline-block relative">
                                    <select className="block appearance-none w-full bg-white border   px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-blue-400 focus:shadow-outline" onChange={(e) => setType(e.target.value)}>
                                        <option value="category-question">Category Question</option>
                                        <option value="cloze-question">Cloze Question</option>
                                        <option value="comprehension-question">Comprehension Question</option>

                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>

                                <Button text="Add Question" onclick={() => dispatch(actions.addQuestion(type))} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
