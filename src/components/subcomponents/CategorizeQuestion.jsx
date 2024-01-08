import React, { memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../reducers/formbuilder/createFormSlice';
import Label from './Label'
import Input from './Input'
import DragCategories from './DragCategories';
import DragCategoryOptionMapping from './DragCategoryOptionMapping';
import AddButton from './AddButton';

const CategorizeQuestion = (props) => {

    const questions = useSelector(state => state.questions);
    const dispatch = useDispatch();
    // handle add category
    const addCategory = () => {
        dispatch(actions.addCategory(props.index));
    };



    // handle add option
    const addOption = () => {

        dispatch(actions.addOption({ questionId: props.index, question_type: "categorized-question" }));
    };



    return (
        <>
            <div className='bg-white rounded-[10px] shadow-[#d5d5d5] shadow-md p-2'>
                <h5 className='my-2 font-extrabold'>Question #{props.questionNo}</h5>
                <div className="flex justify-start gap-5">
                    <div>
                        <Label label="Question Title" />

                        <Input type="text" name="question_title" placeholder="Question title" label="Question" value={questions[props.index].questionTitle} onchange={(e) => {

                            dispatch(actions.addQuestionTitle({ questionId: props.index, value: e.target.value }))
                        }} />
                    </div>

                    {/* <div>
                        <Label label="Question Image" isRequired={false} />
                        <Input type="file" name="question_image" label="Question Image" isRequired={false} />

                    </div> */}
                </div>


                <h5 className='font-semibold mt-2'>Create Categories <span className='text-red-600 font-bold '>*</span></h5>

                <div className="my-2">
                    {
                        questions[props.index].categories.map((ele, index) => {
                            return (
                                <DragCategories key={index} type="dragcategories" ele={ele} index={index} questionIndex={props.index} />
                            )
                        })
                    }
                </div>
                <AddButton text="Add" onclick={addCategory} />


                <h5 className='mt-2 font-semibold'>Create Option <span className='text-red-600 font-bold '>*</span></h5>

                <div className="my-2">
                    {
                        questions[props.index].options.map((e, index) => {
                            return (
                                <DragCategoryOptionMapping key={index} questionIndex={props.index} currentElementIndex={index} questions={questions} setQuestions={props.setQuestions} ele={e} selected={questions[props.index].optionCategoryMapping[index]} options={questions[props.index].categories}
                                    type="categoryoptionmapping"
                                />
                            )
                        })
                    }
                </div>
                <AddButton text="Add" onclick={addOption} />



            </div>

        </>

    )
}

export default memo(CategorizeQuestion);
