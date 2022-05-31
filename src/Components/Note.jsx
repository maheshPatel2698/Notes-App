import React, { useContext } from 'react'
import "../Css/Note.css"
import { AiFillTag, AiFillDelete } from "react-icons/ai"
import { FaPen } from "react-icons/fa"
import { UPDATE_NOTE, VIEW_NOTE } from "../Reducer/action.type"
import { useNavigate } from "react-router-dom"
import NotesContext from "../Context/NotesContext"
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import { toast } from 'react-toastify'



const Note = ({ Notekey, data }) => {
    let navigate = useNavigate()
    const { dbref, dispatch, setIsUpdate } = useContext(NotesContext)

    // creating delete method
    const handleDelete = (key) => {
        firebase.database().ref(dbref).child(`Notes/${key}`)
            .remove()
            .then(() => {
                toast.success("Data Removed", {
                    autoClose: 900,
                    position: "top-right",
                    closeButton: false

                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdate = (data, Notekey) => {
        dispatch({
            type: UPDATE_NOTE,
            payload: data,
            key: Notekey
        })
        setIsUpdate(true)
        navigate('/addnote')

    }
    const handleNaigate = (data) => {
        dispatch({
            type: VIEW_NOTE,
            payload: data
        })

        navigate('/note')
    }


    return (
        <div>
            <div id='card' key={Notekey} >
                <div className='card-img'>
                    <img className='i' src={data?.downloadUrl} alt="" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{data?.title}</h5>
                    <span><AiFillTag size={20} /> {data?.tag}</span>
                    <p className="card-text">{data?.desc.substr(0, 10)}...</p>
                    <span>Add On: {data?.date}</span>
                    <button onClick={() => handleNaigate(data)} className='btn btn-primary m-2'>Read Full Note</button>
                    <div className="buttons">
                        <AiFillDelete onClick={() => handleDelete(Notekey)} size={28} color='red' />
                        <FaPen onClick={() => handleUpdate(data, Notekey)} size={24} />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Note