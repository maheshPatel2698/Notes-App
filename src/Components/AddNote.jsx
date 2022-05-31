import React, { useState, useContext, useEffect } from 'react'
import "../Css/AddNote.css"

// importing firebase
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import "firebase/compat/storage"

import NotesCotext from '../Context/NotesContext'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { UPDATE_NOTE } from '../Reducer/action.type'

const AddNote = () => {

    // getting ref
    const { dbref, user, state, isUpdate, setIsUpdate, dispatch, navigate } = useContext(NotesCotext)
    const { NoteToUpdateKey, NoteToUpdate } = state

    // creting state for input
    const [title, setTitle] = useState("")
    const [desc, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [date, setDate] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("")

    // image picker
    const imagePicker = (e) => {

        let image = e.target.files[0]
        firebase.storage().ref('images/' + v4()).put(image)
            .on("state_changed", toast.success("Image Uploded",
                {
                    autoClose: 500, position: "top-right",
                    closeButton: false
                }
            )
            );
        firebase.storage().ref(`/images/${image.name}`).getDownloadURL().then(img => {
            setDownloadUrl(img)

        })
            .catch(err => console.log(err))

    }

    // creting notes under ref of user email   
    const addNotes = () => {
        if (!title || !desc || !tag) {
            return toast.warning("Please fill all fields",
                {
                    autoClose: 800,
                    position: "top-right",
                    closeButton: false
                })
        }
        try {
            firebase.database().ref(dbref).child('Notes/' + v4())
                .set({
                    title,
                    desc,
                    tag,
                    date,
                    downloadUrl

                })
            toast.success("Notes Added",
                {
                    autoClose: 900,
                    position: "top-right",
                    closeButton: false
                })
            setTitle("")
            setDescription("")
            setTag("")
            setDate("")
            setDownloadUrl("")

        } catch (error) {
            toast.error(error, { autoClose: 500, position: "top-right" })
        }
    }
    useEffect(() => {
        if (NoteToUpdate) {
            setTitle(NoteToUpdate.title)
            setDescription(NoteToUpdate.desc)
            setTag(NoteToUpdate.tag)
            setDate(NoteToUpdate.date)
            setDownloadUrl(NoteToUpdate.downloadUrl)
        }
    }, [NoteToUpdate])

    // method to updateNote
    const updateNote = () => {
        firebase.database().ref(dbref).child('Notes/' + NoteToUpdateKey)
            .set({
                title,
                desc,
                tag,
                date,
                downloadUrl
            })

        navigate('/notes')
        setIsUpdate(false)
        dispatch({
            type: UPDATE_NOTE,
            payload: null,
            key: null
        })
        toast.success("Note Updated", {
            autoClose: 500,
            position: "top-right",
            closeButton: false
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        isUpdate ? updateNote() : addNotes()
    }
    if (!user?.email) {
        return <Navigate to='/' />
    }
    else {
        return (
            <div className='main-container'>
                <form id='form' onSubmit={handleSubmit} >
                    <label htmlFor="image">Upload Image Here</label>
                    <div>
                        <img className='imgclass' src={downloadUrl} alt="" />
                    </div>
                    <input
                        type="file"
                        onChange={imagePicker}
                    />

                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Type your notes title Here'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="desc">Description</label>
                    <textarea
                        type="text"
                        name="desc"
                        id="desc"
                        placeholder='Type your notes description here'
                        value={desc}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        id="tag"
                        placeholder='Type your tag here'
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <label htmlFor="date">Date</label>
                    <input type="date"
                        name='date'
                        id='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}

                    />
                    <button type='submit' className='btn btn-primary m-2'>{isUpdate ? "Update Note" : "Add Note"}</button>
                </form>
            </div>
        )
    }

}

export default AddNote