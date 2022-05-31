import React from 'react'
// importing css
import "../Css/Home.css"

import { CgNotes } from "react-icons/cg"
import { BiLogIn } from "react-icons/bi"
import { FaPlusCircle } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { FaPen } from "react-icons/fa"
const Home = () => {
    return (
        <div className='container'>
            <ol>
                <h2 className='text-center'>Steps How to Add Note</h2>
                <li>Click on <BiLogIn size={27} /> to login on your Account</li>
                <li> To Add Note <FaPlusCircle size={25} />  </li>
                <li> To View All Your Notes <CgNotes size={25} />  </li>
                <li>To Update Note Click On <FaPen size={23} />  </li>
                <li>To Delete Note <AiFillDelete size={25} /> </li>
            </ol>
        </div>
    )
}

export default Home