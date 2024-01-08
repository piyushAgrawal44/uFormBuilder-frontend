import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [{ question_type: "category-question", questionTitle: "", categories: [""], options: [""], optionCategoryMapping: [""] }]
}

export const createFormSlice = createSlice({
    name: "create_form_slice",
    initialState: initialState,
    reducers: {
        addQuestion: (state, action) => {
            let newQuestion;
            if (action.payload === "category-question") {
                newQuestion = { question_type: "category-question", questionTitle: "", categories: [""], options: [""], optionCategoryMapping: [""] };
            }
            else if (action.payload === "cloze-question") {
                newQuestion = { question_type: "cloze-question", sentence: "", options: [""], correctOptions: [""], selectedWords: [''] };
            }
            else {
                newQuestion = { question_type: "comprehension-question", paragraph: "", mcq: [{ question: "", options: [''], correctOptions: [false] }] };
            }

            state.questions.push(newQuestion);
        },
        copyQuestion: (state, action) => {
            const copyQuestion = state.questions[action.payload];

            // Use slice to create a copy of the array
            const newQuestions = state.questions.slice();

            // Insert the copied question at the specified index
            newQuestions.splice(action.payload + 1, 0, copyQuestion);

            // Update the state with the new array
            state.questions = newQuestions;

        },
        removeQuestion: (state, action) => {
            state.questions = state.questions.filter((ele, i) => {
                return i !== action.payload;
            })
        },
        clearQuestion: (state, action) => {
            state.questions = [{ question_type: "category-question", questionTitle: "", categories: [""], options: [""], optionCategoryMapping: [""] }]
        },
        updateQuestions: (state, action) => {
            state.questions = action.payload;
        },
        // categorized questions functions
        addQuestionTitle: (state, action) => {
            state.questions[action.payload.questionId].questionTitle = action.payload.value;
        },
        addCategory: (state, action) => {
            // this function is for adding a category in categorized question
            // payload will be question id
            state.questions[action.payload].categories.push('');
        },
        removeCategory: (state, action) => {
            // remove category function for categorized question
            // payload will have 2 things, questionId and categoryId
            state.questions[action.payload.questionId].categories = state.questions[action.payload.questionId].categories.filter(
                (ele, index) => {
                    return index !== action.payload.categoryIndex;
                }
            )
        },
        updateCategoryValue: (state, action) => {
            // this function will have used to update category value when user type category
            // payload will have 3 things, questionId, categoryIndex, value
            state.questions[action.payload.questionId].categories[action.payload.categoryIndex] = action.payload.value;
        },
        swapCategory: (state, action) => {
            // we have dragging feature in our web so dragging categories with each other is handle by this function
            // payload have 2 indexes that need to be swapped, and questionIndex
            const index1 = action.payload.index1;
            const index2 = action.payload.index2;
            const questionId = action.payload.questionId;

            const temp = state.questions[questionId].categories[index1];
            state.questions[questionId].categories[index1] = state.questions[questionId].categories[index2];
            state.questions[questionId].categories[index2] = temp;
        },
        addOption: (state, action) => {
            // this function will add new option to categorized question
            // payload will have questionId
            state.questions[action.payload.questionId].options.push('');
            if (action.payload.question_type === "categorized-question")
                state.questions[action.payload.questionId].optionCategoryMapping.push('');
        },
        removeOption: (state, action) => {
            // remove option function for categorized question
            // payload will have 2 things, questionId and optionId
            state.questions[action.payload.questionId].options = state.questions[action.payload.questionId].options.filter(
                (ele, index) => {
                    return index !== action.payload.optionIndex;
                }
            )

            if (action.payload.question_type === "categorized-question") {
                state.questions[action.payload.questionId].optionCategoryMapping = state.questions[action.payload.questionId].optionCategoryMapping.filter(
                    (ele, index) => {
                        return index !== action.payload.optionIndex;
                    }
                );
            }
        },
        swapOption: (state, action) => {
            // we have dragging feature in our web so dragging categories with each other is handle by this function
            // payload have 2 indexes that need to be swapped, and questionIndex
            const index1 = action.payload.index1;
            const index2 = action.payload.index2;
            const questionId = action.payload.questionId;

            let temp = state.questions[questionId].options[index1];
            state.questions[questionId].options[index1] = state.questions[questionId].options[index2];
            state.questions[questionId].options[index2] = temp;

            if (action.payload.question_type === "categorized-question") {
                temp = state.questions[questionId].optionCategoryMapping[index1];
                state.questions[questionId].optionCategoryMapping[index1] = state.questions[questionId].optionCategoryMapping[index2];
                state.questions[questionId].optionCategoryMapping[index2] = temp;
            }
        },
        updateOptionValue: (state, action) => {
            // this function will have used to update category value when user type category
            // payload will have 3 things, questionId, optionIndex, value
            state.questions[action.payload.questionId].options[action.payload.optionIndex] = action.payload.value;
        },
        updateOptionCategoryMapping: (state, action) => {
            // this function will update option category mapping for categorized question
            // payload will have 3 things, questionId, optionIndex, category value
            state.questions[action.payload.questionId].optionCategoryMapping[action.payload.optionIndex] = action.payload.categoryValue;
        },

        //functions for cloze questions
        updateSentenceValue: (state, action) => {
            state.questions[action.payload.questionId].sentence = action.payload.value;
        },
        checkboxChange: (state, action) => {
            // this function will handle right option selection in fill in blank question type
            // payload will take 3 thing : questionId, optionIndex and value (true/false);

            state.questions[action.payload.questionId].correctOptions[action.payload.optionIndex] = action.payload.value;
        },

        // functions for comprehension question
        setParagraph: (state, action) => {
            // this function is used to set paragraph for comprehension question
            // payload: questionId And paragraph
            state.questions[action.payload.questionId].paragraph = action.payload.value;
        },
        addMCQ: (state, action) => {
            // this function will handle the new mCQ function in comprehension question
            // the payload will take 1 parameter that is questionID
            state.questions[action.payload].mcq.push({ question: '', options: [''], correctOptions: [false] });
        },
        removeMCQ: (state, action) => {
            // this function will remove a mcq from comprehension question
            // payload: questionId, mcqId
            state.questions[action.payload.questionId].mcq = state.questions[action.payload.questionId].mcq.filter(
                (ele, index) => {
                    return index !== action.payload.mcqId;
                }
            )
        },
        setMCQQuestion: (state, action) => {
            // this will set the question value for mcq in comprehension question
            // payload: questionId, mcqId, question value

            state.questions[action.payload.questionId].mcq[action.payload.mcqId].question = action.payload.value;
        },
        addMCQOption: (state, action) => {
            // this will add a option value for mcq in comprehension question
            // payload: questionId, mcqId
            state.questions[action.payload.questionId].mcq[action.payload.mcqId].options.push('');
            state.questions[action.payload.questionId].mcq[action.payload.mcqId].correctOptions.push(false);
        },
        setMCQOptionValue: (state, action) => {
            // this will set the option value for mcq in comprehension question
            // payload: questionId, mcqId, optionId, question value
            state.questions[action.payload.questionId].mcq[action.payload.mcqId].options[action.payload.optionId] = action.payload.value;
        },
        removeMCQOption: (state, action) => {
            // this will remove a option value for mcq in comprehension question
            // payload: questionId, mcqId, optionId
            state.questions[action.payload.questionId].mcq[action.payload.mcqId].options = state.questions[action.payload.questionId].mcq[action.payload.mcqId].options.filter(
                (ele, index) => {
                    return index !== action.payload.optionId;
                }
            )

            state.questions[action.payload.questionId].mcq[action.payload.mcqId].correctOptions = state.questions[action.payload.questionId].mcq[action.payload.mcqId].correctOptions.filter(
                (ele, index) => {
                    return index !== action.payload.optionId;
                }
            )

            // removing correction option mapping
        },
        handleMCQOptionCheckbox: (state, action) => {
            state.questions[action.payload.questionId].mcq[action.payload.mcqId].correctOptions[action.payload.optionId] = action.payload.value;
        },


        saveQuestion: (state, action) => {

        }
    }
});

export const actions = createFormSlice.actions;


export default createFormSlice.reducer;