import React, { memo } from 'react'
import Button from './Button'
import Label from './Label'
import Input from './Input'
import DragCategories from './DragCategories'
import DragCategoryOptionMapping from './DragCategoryOptionMapping'

const CategorizeQuestion = (props) => {

    // handle add category
    const addCategory = () => {

        const newCategory = [...props.questions];
        newCategory[props.index].categories.push('');
        props.setQuestions(newCategory);
    };

    // handle remove category 
    const removeCategory = (index) => {


        const newCategory = [...props.questions];
        newCategory[props.index].categories.splice(index, 1);
        props.setQuestions(newCategory);
    };

    // Function to handle category input changes
    const handleInputChange = (index, value) => {

        const newCategory = [...props.questions];
        newCategory[props.index].categories[index] = value;
        props.setQuestions(newCategory);
    };

    // handle add option
    const addOption = () => {

        const newOption = [...props.questions];
        newOption[props.index].options.push("");
        newOption[props.index].optionCategoryMapping.push("");
        props.setQuestions(newOption);
    };

    // handle remove option 
    const removeOption = (index) => {


        const newOption = [...props.questions];
        newOption[props.index].options.splice(index, 1);
        newOption[props.index].optionCategoryMapping.splice(index, 1);
        props.setQuestions(newOption);
        //
    };

    // Function to handle option   changes
    const handleOptionChange = (index, value) => {

        const newOption = [...props.questions];
        newOption[props.index].options[index] = value;
        props.setQuestions(newOption);
    };
    // Function to handle select category changes
    const handleSelectChange = (index, value) => {

        const newOption = [...props.questions];
        newOption[props.index].optionCategoryMapping[index] = value;
        props.setQuestions(newOption);
    };

    return (
        <>
            <div className='bg-white rounded-[10px] shadow-[#d5d5d5] shadow-md p-2'>
                <h5 className='my-2 font-extrabold'>Question #{props.questionNo}</h5>
                <div className="flex justify-start gap-5">
                    <div>
                        <Label label="Question Title" />
                        {/* <Input type="text" name="question_title" placeholder="Question title" label="Question" value={questionTitle} onchange={(e)=>{setQuestionTitle(e.target.value)}}/> */}
                        <Input type="text" name="question_title" placeholder="Question title" label="Question" value={props.questions[props.index].questionTitle} onchange={(e) => {
                            const newTitle = [...props.questions];
                            newTitle[props.index].questionTitle = e.target.value;
                            props.setQuestions(newTitle);
                        }} />
                    </div>

                    {/* <div>
                        <Label label="Question Image" isRequired={false} />
                        <Input type="file" name="question_image" label="Question Image" isRequired={false} />

                    </div> */}
                </div>


                <h5 className='font-semibold'>Create Categories <span className='text-red-600 font-bold '>*</span></h5>

                <div className="mt-2">
                    {
                        props.questions[props.index].categories.map((ele, index) => {
                            return (
                                <DragCategories key={index} type="dragcategories" ele={ele} index={index} handleInputChange={handleInputChange} removeCategory={removeCategory} questionIndex={props.index} questions={props.questions} setQuestions={props.setQuestions} />
                            )
                        })
                    }
                </div>
                <Button text="Add Category" onclick={addCategory} />


                <h5 className='mt-2 font-semibold'>Create Option <span className='text-red-600 font-bold '>*</span></h5>

                {
                    props.questions[props.index].options.map((e, index) => {
                        return (
                            <>
                            <DragCategoryOptionMapping key={index} questionIndex={props.index} currentElementIndex={index} handleOptionChange={handleOptionChange} questions={props.questions} setQuestions={props.setQuestions} ele={e} selected={props.questions[props.index].optionCategoryMapping[index]} handleSelectChange={handleSelectChange} options={props.questions[props.index].categories} removeOption={removeOption} 
                            type="categoryoptionmapping"
                            />

                            {/* <div key={index} className="mt-2">
                                <div className="flex items-center gap-5">
                                    <Input type="text" name="option" placeholder="Option" value={e} onchange={(e) => handleOptionChange(index, e.target.value)} />

                                    <Select options={props.questions[props.index].categories} text="--Select category--" onchange={(e) => handleSelectChange(index, e.target.value)} selected={props.questions[props.index].optionCategoryMapping[index]} />

                                    <CloseButton text="X" onclick={() => removeOption(index)} />
                                </div>

                            </div> */}
                            </>
                        )
                    })
                }
                <Button text="Add Option" onclick={addOption} />



            </div>

        </>

    )
}

export default memo(CategorizeQuestion);
