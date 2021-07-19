import React from 'react'
import * as FaIcons from "react-icons/fa";
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <>
          <div className="navbar">
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars/>
            </Link>
          </div>  
          <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
              
          </nav>
        </>
    )
}

export default NavBar
