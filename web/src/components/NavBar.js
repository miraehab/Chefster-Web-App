import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const token = localStorage.getItem("token");
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
        (token)?{name: "Log Out", path: "/signin"} : {name: "Sign In", path: "/signin"}
    ]

    const logOut = (e) => {
        localStorage.removeItem("token");
    };

    return(
        <>
            <div className= "navbar container">
                <a href="/" className= "logo"><span>Chef</span>ster</a>
                <div className= "nav-links">
                    {
                        links.map(link => (
                            (link.name == "Log Out")? <a href={link.path} key={link.name} onClick={logOut}>{link.name}</a> : <a href={link.path} key={link.name}>{link.name}</a>
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