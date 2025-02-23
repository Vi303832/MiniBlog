import React from 'react'
import { Link } from "react-router";
import Bg from "./Bg.jpg"

function Home() {




    return (
        <div className="h-screen flex justify-center items-center w-full flex-col gap-14   ">
            <img src={Bg} className='absolute -z-10 h-screen w-full object-cover' />
            <div className='drop-shadow-lg text-2xl font-bold '>Welcome to my Mİ-Nİ-BLOG</div>

            <div className='text-center'>
                <Link to="/Blog">
                    <button className='border-2 rounded-4xl px-4 py-2 hover:bg-red-900 bg-red-700 cursor-pointer shadow-xl'>Go To Blogs</button>
                </Link>

            </div>

        </div >
    )
}

export default Home