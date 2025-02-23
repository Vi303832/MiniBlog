import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    title: '',
    content: '',
    author: "",
};

const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        settitle: (state, action) => {
            state.title = action.payload;
        },
        setcontent: (state, action) => {
            state.content = action.payload;
        },
        setauthor: (state, action) => {
            state.author = action.payload;
        }

    }
});

export const { settitle, setcontent, setauthor } = BlogSlice.actions;

export default BlogSlice.reducer;
