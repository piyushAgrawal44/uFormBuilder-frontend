import React from 'react';
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
