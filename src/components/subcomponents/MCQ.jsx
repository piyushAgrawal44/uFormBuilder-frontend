import React from 'react';
import Label from './Label';
import Input from './Input';
import Option from './Option';
import CloseButton from './CloseButton';

import { useDispatch, useSelector } from "react-redux";
import {actions} from '../../reducers/formbuilder/createFormSlice';
import AddButton from './AddButton';


export default function MCQ(props) {

  const questions=useSelector(state=>state.questions)
  const dispatch=useDispatch();

  const parentIndex=props.index;
  const mcqIndex=props.mcqIndex;

  // handle add option
  const addOption = (index) => {

    dispatch(actions.addMCQOption({questionId: parentIndex, mcqId: index}));
  };

  // handle remove option
  const removeOption = (mcqIndex, optionIndex) => {
 
    dispatch(actions.removeMCQOption({questionId: parentIndex, mcqId: mcqIndex, optionId: optionIndex}))
  };

  // Function to handle option changes
  const handleOptionChange = (mcqIndex, optionIndex, value) => {
   

    dispatch(actions.setMCQOptionValue({questionId: parentIndex, mcqId: mcqIndex, optionId: optionIndex, value: value}))
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (mcqIndex, optionIndex, value) => {

    dispatch(actions.handleMCQOptionCheckbox({questionId: parentIndex, mcqId: mcqIndex, optionId: optionIndex, value: value}))
  };

  // Function to handle question change
  const handleQuestionChange = (index, value) => {
    
    dispatch(actions.setMCQQuestion({questionId: parentIndex, mcqId: index, value: value}))
  };



  return (
    <>
      <div className='p-4 bg-slate-200 mb-2 rounded-md'>
        <h6 className='font-bold'>MCQ #{mcqIndex+1}</h6>
        <Label label="Question" />
        <Input
          type="text"
          name="question"
          placeholder="Question"
          value={questions[parentIndex].mcq[mcqIndex].question}
          onchange={(e) => handleQuestionChange(props.mcqIndex, e.target.value)}
        />

        <div className="mt-2">
        <Label label="Options" />
        {questions[parentIndex].mcq[mcqIndex].options.map((ele, optionIndex) => (
          <div key={optionIndex} className='p-1 flex items-center gap-2'>
            <Option
              type="text"
              name="option"
              placeholder="Option"
              checkboxValue={questions[parentIndex].mcq[mcqIndex].correctOptions[optionIndex]}
              inputValue={ele}
              label="Options"
              checkboxClick={(e) =>
                handleCheckboxChange(mcqIndex, optionIndex, e.target.checked)
              }
              inputChange={(e) =>
                handleOptionChange(mcqIndex, optionIndex, e.target.value)
              }
            />
            <CloseButton onclick={() => removeOption(mcqIndex, optionIndex)} />
          </div>
        ))}
        </div>

        <div className="mt-2">
        <AddButton text="Add" onclick={() => addOption(mcqIndex)} />
        </div>
        
      </div>
    </>
  );
}
