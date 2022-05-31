import React, { useContext } from 'react'
import '../Css/NavBar.css'

import { CgNotes } from "react-icons/cg"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { FaRegLightbulb, FaPlusCircle } from "react-icons/fa"
import { TiTick } from "react-icons/ti"


import img1 from "../Reducer/Images/img.jpg"
import NotesContext from "../Context/NotesContext"

import { Link } from "react-router-dom"
const NavBar = () => {

    const { handleLogin, user, handleLogOut, handleUsercard, handleDarkMode } = useContext(NotesContext)

    return (
        <div id='nav' className='nav-bar'>
            <div className="left">
                <Link to="/">
                    Notes App
                </Link>
            </div>
            <div className="mid">
                <Link to="/notes">

                    <CgNotes size={35} />
                </Link>
                <Link to="/addnote">

                    <FaPlusCircle size={35} />
                </Link>
            </div>
            <div className="right">
                <div className="imgclass">
                    <img onClick={handleUsercard} className='img' src={user?.email ? user?.photo : img1} alt="profile" />
                </div>
                {!user?.email ? <BiLogIn onClick={handleLogin} size={35} /> : null}
                <div id='userCard' className="userCard">
                    <div className="img-class">
                        <img className='uimg' src={user?.email ? user?.photo : "null"} alt="profile" />
                    </div>
                    {user?.email ? <div className='userdetails'>
                        <span>Name: {user?.name} </span>
                        <span>Email: {user?.email} </span>
                        <span>verified: {user?.varifiedEmail ? <TiTick color='green' size={25} /> : ""}</span>
                        <span>last Login: {user?.lastlogin}  </span>
                    </div> : ""}

                    <div className="button">
                        {user?.email ? <BiLogOut size={30} onClick={handleLogOut} /> : ""}
                    </div>
                </div>
                <div onClick={handleDarkMode}>
                    <FaRegLightbulb size={33} />
                </div>
            </div>
        </div>
    )
}

export default NavBar