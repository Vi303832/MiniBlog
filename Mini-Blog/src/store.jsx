import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/States';
import BlogReducer from "./Slices/BlogStates"

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: BlogReducer,
    }
});

export default store;
