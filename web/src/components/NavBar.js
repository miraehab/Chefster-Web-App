import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Recipes",
            path: "/recipes"
        },
        {
            name: "Groups",
            path: "/groups"
        },
        {
            name: "Profile",
            path: "/users"
        },
        {
            name: "Settings",
            path: "/settings"
        },
        {
            name: "Sign In",
            path: "/signin"
        }
    ]
    return(
        <>
            <div className= "navbar container">
                <a href="#!" className= "logo"><span>Chef</span>ster</a>
                <div className= "nav-links">
                    {
                        links.map(link => (
                            <a href={links.path} key={link.name}>{link.name}</a>
                        ))
                    }
                </div>
                <div onClick = {() => {setShowSidebar(!showSidebar)}} className= {showSidebar? "sidebar-btn active" : "sidebar-btn"}>
                    <div className= "bar"></div>
                    <div className= "bar"></div>
                    <div className= "bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar links = {links}/>}
            
        </>
    )
}