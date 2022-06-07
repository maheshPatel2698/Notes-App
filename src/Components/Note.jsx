import React, { useContext } from 'react'
import "../Css/Note.css"
import { AiFillTag, AiFillDelete } from "react-icons/ai"
import { FaPen } from "react-icons/fa"
import { UPDATE_IMAGE, UPDATE_NOTE, VIEW_NOTE } from "../Reducer/action.type"
import { useNavigate } from "react-router-dom"
import NotesContext from "../Context/NotesContext"
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import { toast } from 'react-toastify'



const Note = ({ Notekey, data }) => {
    let navigate = useNavigate()
    const { dbref, dispatch, setIsUpdate, darkMode } = useContext(NotesContext)

    // creating delete method
    const handleDelete = (key, imgKey) => {
        firebase.database().ref(dbref).child(`Notes/${key}`)
            .remove()
            .then(() => {
                toast.success("Notes Removed", {
                    autoClose: 900,
                    position: "top-right",
                    closeButton: false

                })
            })
            .catch(error => {
                console.log(error)
            })
        firebase.storage().ref(dbref).child(`images/${imgKey}`)
            .delete()
            .then(() => {
                toast.success("Image Deleted",
                    {
                        autoClose: 500,
                        closeButton: false,
                        position: "top-right"
                    }
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUpdate = (data, Notekey, imgName) => {
        dispatch({
            type: UPDATE_NOTE,
            payload: data,
            key: Notekey
        })
        dispatch({
            type: UPDATE_IMAGE,
            key: imgName
        })
        setIsUpdate(true)
        console.log(imgName)
        navigate('/addnote')

    }
    const handleNavigate = (data) => {
        dispatch({
            type: VIEW_NOTE,
            payload: data
        })

        navigate('/note')
    }


    return (
        <div>
            <div id='card' key={Notekey} style={darkMode} >
                <div className='cardImg'>
                    <img className='im' src={data?.downloadUrl} alt="" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{data?.title}</h5>
                    <span><AiFillTag size={20} /> {data?.tag}</span>
                    <p className="card-text">{data?.desc.substr(0, 10)}...</p>
                    <span>Add On: {data?.date}</span>
                    <button onClick={() => handleNavigate(data)} className='btn btn-primary m-2'>Read Full Note</button>
                    <div className="buttons">
                        <AiFillDelete onClick={() => handleDelete(Notekey, data?.imageName)} size={28} color='red' />
                        <FaPen onClick={() => handleUpdate(data, Notekey, data?.imageName)} size={24} />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Note