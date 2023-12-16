// import React, { useState } from 'react'
// import Label from './Label'
// import Input from './Input'
// import Option from './Option'
// import Button from './Button'

// import CloseButton from './CloseButton'
// export default function MCQ(props) {

//     const [question, setQuestion] = useState();
//     const [options, setOptions] = useState([""]);
//     const [correctOption, setCorrectOption] = useState([false]);
    
//     // handle add option
//     const addOption = () => {
//         setOptions([...options, ""]);
//         setCorrectOption([...correctOption, false]);
//     };

//     // handle remove option 
//     const removeOption = (index) => {

//         setOptions(options.filter((ele, i) => {
//             return i !== index;
//         }));

//         setCorrectOption(correctOption.filter((ele, i) => {
//             return i !== index;
//         }));

//     };

//     // Function to handle option   changes
//     const handleOptionChange = (index, value) => {
//         const newInputValues = [...options];
//         newInputValues[index] = value;
//         setOptions(newInputValues);
//     };
//     // Function to handle option   changes
//     const handleCheckboxChange = (index, value) => {
//         const newInputValues = [...correctOption];
//         newInputValues[index] = value;
//         setCorrectOption(newInputValues);

//         console.log(correctOption);
//     };

//     return (
//         <>
//             <div className='p-4 bg-slate-200 mb-2 rounded-md' id={props.index+"test"}>
//                 <Label label="Question" />
//                 <Input type="text" name="question" placeholder="Question" value={question} onchange={(e) => { setQuestion(e.target.value) }}/>


//                 <Label label="Options" />
//                 {
//                     options.map((ele, index) => {
//                         return (
//                             <div key={index} className='flex items-center gap-5'>
//                                 <Option type="text" name="option" placeholder="Option"  checkboxValue={correctOption[index]}  inputValue={ele} label="Options" checkboxClick={(e) => handleCheckboxChange(index, e.target.checked ? true : false)} inputChange={(e) => handleOptionChange(index, e.target.value)} />

//                                 <CloseButton text="X" onclick={() => removeOption(index)} />
//                             </div>
//                         )
//                     })
//                 }
                
//                 <br />
//                 <Button text="Add option" onclick={addOption}/>
//             </div>
//         </>
//     )
// }




import React, { useState } from 'react';
import Label from './Label';
import Input from './Input';
import Option from './Option';
import Button from './Button';
import CloseButton from './CloseButton';

export default function MCQ(props) {
  // const [mcq, setMCQ] = useState([{ question: '', options: [''], correctOption: [false] }]);

  const parentIndex=props.index;
  const mcqIndex=props.mcqIndex;
  // handle add option
  const addOption = (index) => {
    // const newMCQ = [...props.mcq];
    // newMCQ[index].options.push('');
    // newMCQ[index].correctOption.push(false);
    // props.setMCQ(newMCQ);


    const newOption = [...props.questions];
    newOption[parentIndex].mcq[mcqIndex].options.push('');
    newOption[parentIndex].mcq[mcqIndex].correctOptions.push(false);
    props.setQuestions(newOption);
  };

  // handle remove option
  const removeOption = (mcqIndex, optionIndex) => {
    // const newMCQ = [...props.mcq];
    // newMCQ[mcqIndex].options.splice(optionIndex, 1);
    // newMCQ[mcqIndex].correctOption.splice(optionIndex, 1);
    // props.setMCQ(newMCQ);

    const newOption = [...props.questions];
    newOption[parentIndex].mcq[mcqIndex].options.splice(optionIndex, 1);
    newOption[parentIndex].mcq[mcqIndex].correctOptions.splice(optionIndex, 1);
    props.setQuestions(newOption);
  };

  // Function to handle option changes
  const handleOptionChange = (mcqIndex, optionIndex, value) => {
    // const newMCQ = [...props.mcq];
    // newMCQ[mcqIndex].options[optionIndex] = value;
    // props.setMCQ(newMCQ);

    const newOption = [...props.questions];
    newOption[parentIndex].mcq[mcqIndex].options[optionIndex]=value;
    props.setQuestions(newOption);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (mcqIndex, optionIndex, value) => {
    // const newMCQ = [...props.mcq];
    // newMCQ[mcqIndex].correctOption[optionIndex] = value;
    // props.setMCQ(newMCQ);

    const newOption = [...props.questions];
    newOption[parentIndex].mcq[mcqIndex].correctOptions[optionIndex]=value;
    props.setQuestions(newOption);
  };

  // Function to handle question change
  const handleQuestionChange = (index, value) => {
    // const newMCQ = [...props.mcq];
    // newMCQ[index].question = value;
    // props.setMCQ(newMCQ);

    const newOption = [...props.questions];
    newOption[parentIndex].mcq[mcqIndex].question=value;
    props.setQuestions(newOption);
  };



  return (
    <>
      <div className='p-4 bg-slate-200 mb-2 rounded-md'>
        <h6 className='font-bold'>MCQ #{props.index+1}</h6>
        <Label label="Question" />
        <Input
          type="text"
          name="question"
          placeholder="Question"
          value={props.questions[parentIndex].mcq[mcqIndex].question}
          onchange={(e) => handleQuestionChange(props.mcqIndex, e.target.value)}
        />

        <Label label="Options" />
        {props.questions[parentIndex].mcq[mcqIndex].options.map((ele, optionIndex) => (
          <div key={optionIndex} className='flex items-center gap-5'>
            <Option
              type="text"
              name="option"
              placeholder="Option"
              checkboxValue={props.questions[parentIndex].mcq[mcqIndex].correctOptions[optionIndex]}
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

        <br />
        <Button text="Add option" onclick={() => addOption(mcqIndex)} />
      </div>
    </>
  );
}
