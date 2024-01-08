import React, { useEffect, useState, memo, useRef } from 'react'
import AddButton from './AddButton'
import Label from './Label'
import Input from './Input'
import Option from './Option'
import CloseButton from './CloseButton';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../reducers/formbuilder/createFormSlice';

const ClozeQuestion = (props) => {
    const questions = useSelector(state => state.questions)
    const dispatch = useDispatch();
    const [selectedWords, setSelectedWords] = useState([]);
    const inputRef = useRef(null);

    const parentIndex = props.index;
    // handle word selection
    // const handleKeyDown = (e) => {
    //     // && inputRef.current === document.activeElement
    //     if (e.key === 'u' && e.ctrlKey) {
    //         const selection = window.getSelection();
    //         const selectedText = selection.toString().trim();

    //         if (selectedText !== '') {
    //             const words = selectedText.split(/\s+/);
    //             setSelectedWords([...selectedWords, ...words]);

    //         }
    //     }
    // };

    const handleKeyDown = (e) => {
        // && inputRef.current === document.activeElement
        if (e.key === 'u' && e.ctrlKey) {

            let selectedText;

            if (window.getSelection()) {
                const selection = window.getSelection();
                selectedText = selection.toString().trim();
            }
            else if (document.selection && document.selection.type !== 'Control') {
                const inputElement = inputRef.current;
                selectedText = inputElement.value.substring(inputElement.selectionStart, inputElement.selectionEnd);
            }

            if (selectedText !== '') {
                const words = selectedText.split(/\s+/);

                words.map((word) => {
                    if (selectedWords.includes(word)) {
                        const updatedWords = selectedWords.filter((words) => words !== selectedText);
                        setSelectedWords(updatedWords);
                    }
                    else {
                        setSelectedWords([...selectedWords, word]);
                    }

                    return "";
                });

            }
        }
    };

    const makeBlank = (e) => {
        e.preventDefault();
        let selectedText;
        if (window.getSelection()) {
            const selection = window.getSelection();
            selectedText = selection.toString().trim();
        }
        else if (document.selection && document.selection.type !== 'Control') {
            const inputElement = inputRef.current;
            selectedText = inputElement.value.substring(inputElement.selectionStart, inputElement.selectionEnd);
        }

        
        if (selectedText !== '') {
            const words = selectedText.split(/\s+/);

            words.map((word) => {
                if (selectedWords.includes(word)) {
                    const updatedWords = selectedWords.filter((words) => words !== selectedText);
                    setSelectedWords(updatedWords);
                }
                else {
                    setSelectedWords([...selectedWords, word]);
                }

                return "";
            });

        }
    }

    // to fire the handle key down function
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line
    }, []);





    // Function to handle option   changes
    const handleOptionChange = (index, value) => {


        dispatch(actions.updateOptionValue({ questionId: parentIndex, optionIndex: index, value: value }))
    };


    // Function to handle option   changes
    const handleCheckboxChange = (index, value) => {


        dispatch(actions.checkboxChange({ questionId: parentIndex, optionIndex: index, value: value }));
    };

    return (
        <>
            <div className='bg-white rounded-[10px] shadow-[#d5d5d5] shadow-md p-2'>
                <h5 className='my-2 font-extrabold'>Question #{props.questionNo}</h5>
                {/* <Label label="Question Image" isRequired={false} />
                <Input type="file" name="question_image" label="Question Image" isRequired={false} /> */}

                <h5 className='font-medium'>Preview </h5>

                <div className='font-normal mb-2 text-start' id='preview'>
                    {questions[parentIndex].sentence.split(' ').map((word, index) => {
                        return (
                            <span key={index}>
                                {
                                    selectedWords.includes(word) ?
                                        <div className='inline-block w-12 h-3 mr-2 border-b-2 border-green-600'></div>
                                        :
                                        <span key={index} className={selectedWords.includes(word) ? 'underline' : ''}>
                                            {word}&nbsp;
                                        </span>

                                }
                            </span>
                        )
                    })
                    }
                    {questions[parentIndex].sentence==='' && <span className='text-gray-400'>Type something to preview...</span>}
                </div>

                <Label label="Write Sentence (Select word and hit Control + U to make blank) " />
                <Input type="text" name="sentence" placeholder="Type here" value={questions[parentIndex].sentence} onchange={(e) => {

                    dispatch(actions.updateSentenceValue({ questionId: parentIndex, value: e.target.value }))
                }} eleRef={inputRef} />
                <button className='my-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 text-[12px] hover:border-transparent rounded' onClick={(e) => { makeBlank(e) }}>Make Blank</button>


                <Label label="Create Option" />
                {
                    questions[parentIndex].options.map((ele, index) => {
                        return (
                            <div key={index} className='flex items-center gap-5 p-1'>
                                <Option type="text" name="option" placeholder="Option" checkboxValue={questions[parentIndex].correctOptions[index]} inputValue={ele} label="Options" checkboxClick={(e) => handleCheckboxChange(index, e.target.checked ? true : false)} inputChange={(e) => handleOptionChange(index, e.target.value)} />

                                <CloseButton text="X" onclick={() => dispatch(actions.removeOption({ questionId: parentIndex, optionIndex: index, question_type: "cloze-question" }))} />
                            </div>
                        )
                    })
                }


                <div className="mt-2">
                    <AddButton text="Add" onclick={() => dispatch(actions.addOption({ questionId: parentIndex, question_type: "cloze-question" }))} />
                </div>
            </div>

        </>

    )
}

export default memo(ClozeQuestion);