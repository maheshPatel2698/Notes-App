import React, { useContext } from 'react'
import "../Css/ViewSingleNote.css"
import NotesContext from '../Context/NotesContext'
import { AiFillTag } from "react-icons/ai"
const ViewSinglenote = () => {
    const { state, navigate } = useContext(NotesContext)
    const { note } = state

    return (
        <div className='vsn'>
            <div className='img-Class'>
                <img className='i-vsn' src={note.downloadUrl} alt="" />
            </div>
            <h1 className='mt-2'>{note.title}</h1>
            <h3><AiFillTag size={28} />  {note?.tag}</h3>
            <div className="para">
                <p className='text-center'>{note.desc}</p>
            </div>
            <button onClick={() => navigate('/notes')} className="btn btn-primary m-2">Back To Notes</button>
        </div>
    )
}

export default ViewSinglenote