import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { db } from '../Firebase';
import { collection, getDocs, where, query, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';



function Display() {
    let [newname, setnewname] = useState("")
    let [buttonmode, setbuttonmode] = useState(false)
    let [newtext, setnewtext] = useState("")
    let [editid, seteditid] = useState("");
    let navigate = useNavigate();
    let { useruid } = useSelector(s => s.auth);
    let [blogss, setblogposts] = useState([]);

    useEffect(() => {

        if (!useruid) {

            navigate("/Login")
            return;
        }


        const fetchposts = async () => {
            const querySnapshot = await getDocs(collection(db, "Blogs"));
            const Bloglist = querySnapshot.docs.map((doc) =>
            ({
                id: doc.id,
                ...doc.data()
            }))
            setblogposts(Bloglist)

        }
        fetchposts();



    }, [useruid, navigate])


    let handleadjust = () => {


        navigate("/AddBlog")



    }

    const formatDate = (timestamp) => {
        if (!timestamp) return "No date available";
        const date = timestamp.toDate(); // Firestore timestamp'i Date nesnesine dönüştür
        return date.toLocaleString(); // Kullanıcı dostu bir tarih formatına çevir
    };


    const handleremove = async (blogId, id) => {



        try {

            if (id == useruid) {

                let collectionref = collection(db, "Blogs")


                const q = query(collectionref,
                    where("blogId", "==", blogId)
                )

                let querySnapshot = await getDocs(q)
                let thatdoc = doc(db, "Blogs", querySnapshot.docs[0].id)
                await deleteDoc(thatdoc);

                setblogposts(prevBlogs => prevBlogs.filter(blog => blog.blogId !== blogId));


            }
            else {
                toast.error("Sadece kendi postlarını düzenleyebilirsin");
            }




            /*const qEuerySnapshot = await getDocs(collection(db, "Blogs"));
            const Bloglist = qEuerySnapshot.docs.map((doc) =>
            ({
                id: doc.id,
                ...doc.data()
            }))
            setblogposts(Bloglist)*/

        }
        catch (error) {
            console.error('Hata oluştu: ', error);
        }
    };



    let changedone = async (blogId, id) => {

        if (id == useruid) {

            let collectionref = collection(db, "Blogs")


            const q = query(collectionref,
                where("blogId", "==", blogId)
            )

            let querySnapshot = await getDocs(q)
            let thatdoc = doc(db, "Blogs", querySnapshot.docs[0].id)
            await updateDoc(thatdoc, {

                title: newname,
                content: newtext,
            })



            setblogposts(prevBlogs =>
                prevBlogs.map(blog =>
                    blog.blogId === blogId ? { ...blog, content: newtext, title: newname } : blog
                )
            );

            setbuttonmode(false)
            seteditid("")

        }
        else {

            toast.error("Sadece kendi postlarını düzenleyebilirsin");
        }


    }

    /*  
        if (id == useruid){
        
        
        
        }
        else {

            toast.error("Sadece kendi postlarını düzenleyebilirsin" + error.message);
        }


     */



    let changeblog = async (blogId, id) => {

        if (id == useruid) {

            setbuttonmode(true)
            const q = query(collection(db, "Blogs"),
                where("blogId", "==", blogId)
            );

            let querySnapshot = await getDocs(q)

            setnewtext(querySnapshot.docs[0].data().content)
            setnewname(querySnapshot.docs[0].data().title)

            seteditid(blogId)


        }
        else {

            toast.error("Sadece kendi postlarını düzenleyebilirsin");
        }





    }


    return (
        <div className='min-h-screen bg-amber-200 pt-5' >

            <div className='h-[100%]    '>

                <div className=' h-[15%] flex justify-between items-end pb-3 mb-1   '>

                    <div className='text-5xl ml-5'>Recent posts</div>

                    <div className='cursor-pointer' onClick={() => handleadjust()}>
                        <div className='text-2xl mr-5 flex gap-1 items-center'><FontAwesomeIcon className="text-3xl" icon={faNewspaper} />Add Blog</div>
                    </div>



                </div>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>
                <hr className='w-[95%] mx-auto min-md:w-[98%]'></hr>


                <div className=' h-[75%] pt-5'>

                    {blogss.length > 0 ? (
                        blogss.map((blog) => (
                            <div key={blog.blogId} className="bg-white p-4 mb-3 rounded-lg shadow-lg mx-9 ">


                                {editid == blog.blogId ?
                                    <input
                                        onChange={(e) => setnewname(e.target.value)}
                                        value={newname}
                                        className='mt-2 overflow-wrap break-words px-2 py-1 w-[100%]'
                                        maxLength={50}
                                    /> :

                                    <h2 className="text-xl font-bold break-words">{blog.title}</h2>
                                }



                                <p className="text-sm text-gray-600">By {blog.author}</p>
                                {editid == blog.blogId ?



                                    <textarea
                                        onChange={(e) => setnewtext(e.target.value)}
                                        value={newtext}
                                        className='mt-2 overflow-wrap break-words px-2 py-1 w-[100%]'
                                    />


                                    :




                                    <p className="mt-2 overflow-wrap break-words px-2">{blog.content}</p>










                                }
                                <span className='flex justify-between items-center'>
                                    <span className="text-xs text-gray-500 mt-1">{formatDate(blog.date)}</span>
                                    <span >

                                        <button onClick={() => handleremove(blog.blogId, blog.id)} className='border-2 rounded-4xl px-2 py-1 bg-red-500 cursor-pointer shadow-xl'>Delete</button>

                                        {editid == blog.blogId && buttonmode ?


                                            <button onClick={() => changedone(blog.blogId, blog.id)} className='border-2 rounded-4xl px-2 py-1 bg-yellow-500 cursor-pointer shadow-xl ml-2 mr-5'>Done</button> : <button onClick={() => changeblog(blog.blogId, blog.id)} className='border-2 rounded-4xl px-2 py-1 bg-yellow-500 cursor-pointer shadow-xl ml-2 mr-5'>Adjust</button>
                                        }



                                    </span>


                                </span>

                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">No posts available</p>
                    )}






                </div>

            </div>
        </div>
    )
}

export default Display