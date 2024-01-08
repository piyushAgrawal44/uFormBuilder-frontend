import { configureStore } from "@reduxjs/toolkit";
import createFormSlice  from "../reducers/formbuilder/createFormSlice";

export const store=configureStore({
    reducer: createFormSlice,
});

