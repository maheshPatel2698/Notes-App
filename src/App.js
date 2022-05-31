import React, { useState, useReducer, useEffect } from 'react'
// imorting css
import "./Css/App.css"


// importing components
import Notes from "./Components/Notes"
import ViewSingleNote from "./Components/ViewSingleNote"
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import AddNote from './Components/AddNote'

// importing react toast
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

// importing bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

// importing react-router-dom
import { Routes, Route, useNavigate } from "react-router-dom"

// importing notescontext
import NotesCotext from './Context/NotesContext'

// importing method
import { SET_NOTES } from "./Reducer/action.type"
// importing notes reducer

import NotesReducer from './Reducer/NoteReducer'

// importing firebase 
import firebase from "firebase/compat/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import firebaseconfig from "./Config/firebaseconfig"
import "firebase/compat/database"

const App = () => {
  // getting navigate to another page
  let navigate = useNavigate()

  // initializing state for reducer
  const initailState = {
    NoteItem: [],
    note: {},
    NoteToUpdate: null,
    NoteToUpdateKey: null,
  }

  // Method to check prev user
  const checkPrevUser = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    else {
      return null
    }
  }

  // creating state for user
  const [user, setUser] = useState(checkPrevUser())

  const checkPrevref = () => {
    const prevRef = localStorage.getItem('ref')
    if (prevRef) {
      return JSON.parse(prevRef)
    }
    else {
      return null
    }
  }
  // creating state for db ref
  const [dbref, setDbref] = useState(checkPrevref())
  // state for darkmode
  const [darkMode, setDarkMode] = useState('light')

  // creting method to check perv ref

  // creating state for update
  const [isUpdate, setIsUpdate] = useState(false)

  // creating reducer for initial state
  const [state, dispatch] = useReducer(NotesReducer, initailState)

  // creating method to handle login
  const app = firebase.initializeApp(firebaseconfig)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  // creating to method to handle Login
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const userData = {
          name: res.user.displayName,
          uid: res.user.uid,
          email: res.user.email,
          varifiedEmail: res.user.emailVerified,
          photo: res.user.photoURL,
          lastlogin: res.user.metadata.lastSignInTime
        }
        setUser(userData)
        const ref = res.user.displayName
        setDbref(ref)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('ref', JSON.stringify(ref))
        toast.success('Login Successfull',
          {
            autoClose: 500,
            position: "top-right"
          })
      }).catch((error) => {
        console.log(error)
      })
  }
  const handleLogOut = () => {
    signOut(auth)
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('ref')
    toast.success('Logout Successfull',
      {
        autoClose: 500,
        position: "top-right"
      })
  }

  const handleUsercard = () => {
    const element = document.getElementById('userCard')
    element.classList.toggle('userCardTransition')
  }

  const getAllNotes = () => {
    try {


      firebase.database().ref(dbref).child('Notes')
        .on('value', snapshot => {
          dispatch({
            type: SET_NOTES,
            payload: snapshot.val()
          })
        })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (dbref === null) {
      return;
    }
    else {
      getAllNotes()
    }
  }, [dbref])


  const handleDarkMode = () => {
    if (darkMode === "dark") {
      setDarkMode('light')
      const bodyEle = document.getElementById('body')
      bodyEle.style.transition = "all 0.55s"
      document.body.style.backgroundColor = "#121212"
      document.body.style.color = "#FFFFFF"
      const navEle = document.getElementById('nav')
      navEle.style.backgroundColor = "#BB86FC"
      navEle.style.color = "#O3DAC6"
      const ucard = document.getElementById('userCard')
      ucard.style.backgroundColor = "#BB86FC"
      ucard.style.color = "#O3DAC6"
    }
    else {
      setDarkMode('dark')
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
      const navEle = document.getElementById('nav')
      navEle.style.backgroundColor = "whitesmoke"
      navEle.style.color = "black"
      const ucard = document.getElementById('userCard')
      ucard.style.backgroundColor = "white"
      ucard.style.color = "#121212"
    }
  }

  return (
    <NotesCotext.Provider
      value={{
        user,
        setUser,
        state,
        dispatch,
        handleLogin,
        handleLogOut,
        handleUsercard,
        dbref,
        isUpdate,
        setIsUpdate,
        handleDarkMode,
        navigate
      }}
    >
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/note' element={<ViewSingleNote />} />
        <Route path='addnote' element={<AddNote />} />
        <Route path='/notes' element={<Notes />} />
      </Routes>
    </NotesCotext.Provider>
  )
}

export default App