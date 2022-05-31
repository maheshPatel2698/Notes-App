import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import NotesContext from '../Context/NotesContext'
import "../Css/Notes.css"
import Note from "./Note"

const Notes = () => {
    const { user, state } = useContext(NotesContext)
    const { NoteItem } = state
    if (!user?.email) {
        return <Navigate to="/" />
    }
    else {
        return (
            <div className="notescontainer">
                {
                    NoteItem === null ? <h1>There is No Notes</h1> : Object.entries(NoteItem).map(([key, value]) => {
                        return (
                            <div key={key}>
                                <Note Notekey={key} data={value} />
                            </div>
                        )
                    })
                }
            </div >
        )
    }
}

export default Notes