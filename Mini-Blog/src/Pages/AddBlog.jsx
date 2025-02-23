import React, { useEffect } from 'react'
import store from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { settitle, setcontent, setauthor } from "../Slices/BlogStates"
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase'
import { v4 as uuidv4 } from 'uuid';

function AddBlog() {
    let blogId = uuidv4();
    let { title, content, author } = useSelector(s => s.blog)

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { useruid } = useSelector(s => s.auth);

    useEffect(() => {
        if (!useruid) {

            navigate("/Login")

        }


    }, [])


    let handleClick = async () => {
        try {
            let docRef = await addDoc(collection(db, "Blogs"), {

                blogId,
                id: useruid,
                title,
                content,
                author,
                date: serverTimestamp(),


            }

            )

            console.log(docRef.id)
            dispatch(settitle(""));
            dispatch(setcontent(""));
            dispatch(setauthor(""));
            navigate("/Blog")
        } catch (error) {
            console.error(error)
        }




    }





    return (
        <div className='h-screen bg-amber-200 overflow-hidden'>
            <div className=' container bg-white mx-auto my-30 h-[60%]  w-auto min-xl:w-6xl max-md:h-[75%] max-md:my-20  rounded-4xl shadow-black shadow-2xl '>
                <div className='p-8 flex flex-col h-[100%]  gap-8'>

                    <div>

                        <input maxLength={50} value={title} type='text' onChange={(e) => dispatch(settitle(e.target.value))
                        } className=' w-[40%] shadow-neutral-500 shadow pl-4  rounded-2xl py-1 ' placeholder='Title'></input>


                    </div>

                    <div className='h-[60%]  max-md:h-[75%] align-text-top'>

                        <textarea value={content} onChange={(e) => dispatch(setcontent(e.target.value))
                        } placeholder="Enter Your Text" className='resize-none shadow p-3 rounded-2xl  shadow-neutral-500 max-md:w-[100%] w-[90%] h-[100%] text-left align-text-top '>

                        </textarea>

                    </div>
                    <span className='flex justify-between w-[90%] '>
                        <div><input value={author} onChange={(e) => dispatch(setauthor(e.target.value))
                        } className='shadow pl-2 py-1 rounded-2xl shadow-neutral-500 ' placeholder='Author Name'></input></div>

                        <button onClick={() => handleClick()} className=' shadow-neutral-500 shadow rounded-2xl px-6 cursor-pointer '>Send</button>
                    </span>
                </div>






            </div>
        </div>
    )
}

export default AddBlog