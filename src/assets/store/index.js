import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";

const store =configureStore({
    reducer:{employeeHandler:employeeSlice}
})

export default store;