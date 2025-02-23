import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { faChessKnight } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { setuid } from '../Slices/States';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';


function Header() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let { useruid } = useSelector(state => state.auth);


    let handleout = async () => {

        let outinfo = await signOut(auth)
        dispatch(setuid(""))
        navigate("/Login")
        toast.success("Signed Out")

    }





    return (
        <div className='w-full'>
            <div className=' box-border bg-red-700  mx-auto  h-20 relative flex justify-between items-center shadow-md shadow-black'>
                <Link to="/" className='flex gap-2 items-center ml-5 '>
                    <div><FontAwesomeIcon className="text-4xl" icon={faChessKnight} /></div>
                    <div className=''>Mİ-Nİ-BLOG</div>
                </Link>
                <div className='flex gap-10 justify-center items-center'>
                    {useruid ? <div className="mr-3" onClick={() => handleout()} >Log Out</div> : <Link className='flex  flex-col  mr-3 items-center cursor-pointer' to="/Login">
                        <div><FontAwesomeIcon className="text-3xl max-md:text-2xl" icon={faCircleUser} /></div>
                        <div className="text-[9px] font-bold  relative  ">Login/Register</div>

                    </Link>}

                </div>
            </div>







        </div>
    )
}

export default Header