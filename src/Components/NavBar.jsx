import React, { useContext } from 'react'
import '../Css/NavBar.css'

import { FaRegLightbulb, FaUser } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import { BsArrowBarRight } from "react-icons/bs"
import NotesContext from "../Context/NotesContext"
import { Image } from 'react-bootstrap'

const NavBar = () => {

    const { handleLogin, user, handleLogOut, navigate, darkMode, handleDarkMode } = useContext(NotesContext)

    const handleAction = () => {
        user?.email ? handleLogOut() : handleLogin()
    }
    const handleUsercard = () => {
        const element = document.getElementById('userCard')
        element.classList.toggle('userCardTransition')


    }



    const handleNavCard = () => {
        const navEle = document.getElementById('navCard')
        navEle.classList.toggle("navCardTransition")
        const ele2 = document.getElementById('arrow')
        ele2.classList.toggle('a')
    }
    return (
        <div style={darkMode} className="nav-bar">
            <div className="left">
                <span onClick={() => navigate('/')}>Notes App</span>
                <BsArrowBarRight onClick={handleNavCard} id='arrow' size={25} />
            </div>
            <div className="mid">
                <span onClick={() => navigate('/notes')}  > Notes</span>
                <span onClick={() => navigate('/addnote')} >Add Notes</span>
            </div>
            <div className="right">
                {user?.email ? <Image onClick={handleUsercard} className='i' fluid src={user?.photo} roundedCircle /> : <FaUser size={25} />}

                <span onClick={handleAction}>{user?.email ? "Log out" : "Log In"}</span>
                <FaRegLightbulb onClick={handleDarkMode} size={32} />
            </div>
            <div id='userCard' className='userCard'>
                <span>User Name: {user?.name} </span>
                <span>User Email: {user?.email} </span>
                <span>Verified: {user?.varifiedEmail ? <TiTick size={20} color='green' /> : ""} </span>
                <span>Last Login: {user?.lastlogin}</span>
            </div>
            <div id='navCard' className="navCard">
                <span onClick={() => navigate('/notes')} >Notes</span>
                <span onClick={() => navigate('/addnote')} >All Notes</span>
                <span onClick={handleAction}>{user?.email ? "Log out" : "Log In"}</span>
                {user?.email ? <Image onClick={handleUsercard} className='i' fluid src={user?.photo} roundedCircle /> : <FaUser size={25} />}
                <FaRegLightbulb onClick={handleDarkMode} size={32} />
            </div>
        </div>
    )
}

export default NavBar