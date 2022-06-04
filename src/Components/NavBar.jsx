import React, { useContext } from 'react'
import '../Css/NavBar.css'

import { CgNotes } from "react-icons/cg"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { FaRegLightbulb, FaPlusCircle } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import { BsArrowDownCircleFill } from "react-icons/bs"


import img1 from "../Reducer/Images/img.jpg"
import NotesContext from "../Context/NotesContext"

import { Link } from "react-router-dom"
const NavBar = () => {

    const { handleLogin, user, handleLogOut, handleUsercard, handleDarkMode } = useContext(NotesContext)

    const handleNavbar = () => {
        console.log("effect activated")
        const midNav = document.getElementById('mid')
        midNav.classList.toggle('navEffect')
        const rightNav = document.getElementById('right')
        rightNav.classList.toggle('navEffect')
        const arrow = document.getElementById('adc')
        arrow.classList.toggle('adcEffect')
    }
    return (
        <div id='nav' className='navbar'>
        </div>
    )
}

export default NavBar