import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { auth } from "../Firebase"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {


    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,


} from "firebase/auth";
import { useNavigate } from 'react-router';
import { setemail, setpassword, setuid } from "../Slices/States"


function Login() {
    let navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    let { email, password, useruid } = useSelector(state => state.auth)
    let dispatch = useDispatch();






    let handleregister = async (e) => {
        try {
            const Registerİnfo = await createUserWithEmailAndPassword(auth, email, password);
            let user = Registerİnfo.user


            const userData = {

                uid: user.uid,
                email: user.email,

            };

            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(setemail("")),
                dispatch(setpassword(""))
            toast.success("Registered");

        } catch (error) {
            toast.error("Kayıt Hatası:" + error.message);
        }
    }

    let handlelogin = async (e) => {
        try {
            let Logininfo = await signInWithEmailAndPassword(auth, email, password)
            let loginuser = Logininfo.user
            dispatch(setemail(""))
            dispatch(setpassword(""))

            dispatch(setuid(loginuser.uid))
            if (loginuser) {
                toast.success("Login Success")
                navigate("/Blog")
            }


        } catch (error) {
            toast.error("Kayıt Hatası:" + error.message);
        }



    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            let user = result.user
            dispatch(setuid(user.uid))
            toast.success("Login Success")
            navigate("/Blog")

        } catch (error) {
            toast.error("Kayıt Hatası:" + error.message);
        }
    };








    return (
        <div className='h-screen bg-amber-200'>
            <div className='container mx-auto relative top-20 bg-white w-[400px] h-[350px] rounded-2xl shadow-md shadow-black'>
                <div className='flex flex-col items-center justify-center gap-7 py-20 '>

                    <input className='border-2 rounded-2xl text-center px-4 ' value={email} onChange={e => dispatch(setemail(e.target.value))} type="email" placeholder='Enter your email'></input>
                    <input className='border-2 rounded-2xl text-center px-4 ' value={password} onChange={e => dispatch(setpassword(e.target.value))} type='password' placeholder='Enter your password'></input>

                    <span className='flex gap-2 mt-10'>
                        <button className='border-2 px-3 py-1 rounded-4xl cursor-pointer ' onClick={(e) => handlelogin(e)} >Login</button>
                        <button className='border-2 px-3 py-1 rounded-4xl cursor-pointer' onClick={(e) => handleregister(e)} >Register</button>
                        <button className='border-2 px-3 py-1 rounded-4xl cursor-pointer' onClick={() => signInWithGoogle()} >Login With Google</button>


                    </span>



                </div>







            </div>





        </div>
    )
}

export default Login