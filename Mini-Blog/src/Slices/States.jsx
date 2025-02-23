import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    useruid: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setemail: (state, action) => {
            state.email = action.payload;
        },
        setpassword: (state, action) => {
            state.password = action.payload;
        },
        setuid: (state, action) => {
            state.useruid = action.payload;
        }
    }
});

export const { setemail, setpassword, setuid } = authSlice.actions;

export default authSlice.reducer;
