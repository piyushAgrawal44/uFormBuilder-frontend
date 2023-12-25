import React from 'react'
import DropBlank from './DropBlank';
import DragOption from './DragOption';
import { useDrop } from 'react-dnd';

function ViewClozeQuestion(props) {
    // const [first, setFirst] = useState(0)


    // const draggingOver = (event) => {
    //     event.preventDefault();
    // }


    // const draggingEnd2 = (event, questionIndex) => {
    //     event.preventDefault();
    //     let optionIndex = event.dataTransfer.getData("optionIndex");

    //     const newData = { ...props.formData };
    //     if (newData.questions[questionIndex].userAnswer === undefined)
    //         newData.questions[questionIndex].userAnswer = [];

    //     newData.questions[questionIndex].userAnswer[optionIndex] = undefined;
    //     props.setFormData(newData);

    // }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "selected_option",
        drop: (item) => {
            draggingEnd2(item.optionIndex);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const draggingEnd2 = (optionIndex) => {

        const newData = { ...props.formData };
        if (newData.questions[props.questionIndex].userAnswer === undefined)
            newData.questions[props.questionIndex].userAnswer = [];

        newData.questions[props.questionIndex].userAnswer[optionIndex] = null;
        props.setFormData(newData);

    }

    const areArraysEqual = (array1, array2) => {
        // Check if the arrays have the same length
        if (array1.length !== array2.length) {
            return false;
        }

        // Use every to check if each element in the arrays is equal
        return array1.every((value, index) => value === array2[index]);
    };


    const validateAns = (answerArr, optionArr, correctAns) => {
        let ansMap = [];

        /*
        I have 3 arrays:
        optionArr: [\"is\",\"are\",\"did\"]
        correctAns: [true,false,false]
        answerArr:  [null,null,0]

        correct at ci index true means option at ci index is correct. 
        userAns at index i value not null mean option at i index is correct 

        So this function generates 
        ansMap that convert answerArr into correctAns form [true,true,false,false]

        then we compare ansMap and correct ans
        */
        for (let i = 0; i < optionArr.length; i++) {
            if (answerArr.indexOf(i) !== -1) {
                ansMap.push(true);
            }
            else {
                ansMap.push(false);
            }
        }
        return areArraysEqual(ansMap, correctAns);
    };

    return (

        <>

            <div className='w-full bg-white p-5 py-3 mb-3 rounded-[10px]'>

                <div className='flex justify-between items-center flex-nowrap'>
                    <p className='text-blue-500'><b>Question #{props.questionIndex + 1}</b> (Drag n Drop options)</p>
                    {props.showAns && <p className='text-red-500'>{validateAns(props.question.userAnswer, props.question.options, props.question.correctOptions) ? 1 : 0}</p>}
                </div>
                <h6 className='text-lg font-semibold text-gray-700'>{props.question.questionTitle}</h6>



                <h6 className='mt-2 text-md font-medium'>Q. Fill in the blanks: </h6>

                <div className='font-normal text-xl mb-2 flex items-center flex-wrap' id='preview'>
                    {props.question.sentence.split(' ').map((word, sentenceIndex) => {
                        let tempIndex = props.question.options.indexOf(word);

                        if (tempIndex !== -1 && props.question.correctOptions[tempIndex] === true) {
                            return (

                                <DropBlank key={sentenceIndex} formData={props.formData} question={props.question} questionIndex={props.questionIndex} sentenceIndex={sentenceIndex} setFormData={props.setFormData} />
                            )
                        }
                        else {
                            return (
                                <span key={sentenceIndex} >
                                    {word}&nbsp;
                                </span>
                            )
                        }

                    })}
                </div>

                <h6 className='mt-2 text-md'>Options: </h6>
                <div ref={drop} className={`my-2 w-full flex flex-wrap gap-2 min-h-[20px] min-w-[20px] ${isOver ? 'bg-gray-200' : ""}`} >

                    {
                        props.question.options.map((option, optionIndex) => {
                            if (props.question.userAnswer === undefined || !props.question.userAnswer.includes(optionIndex))
                                return (

                                    <DragOption key={optionIndex} option={option} optionIndex={optionIndex} type="blank" />
                                )
                            else
                                return "";
                        })
                    }
                </div>


            </div>
        </>
    )
}

ViewClozeQuestion.defaultProps={
    showAns: false
}

export default ViewClozeQuestion