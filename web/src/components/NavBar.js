export default function NavBar(){
    return(
        <div className= "navbar container">
            <a href="#!" className= "logo"><span>Chef</span>ster</a>
            <div className= "nav-links">
                <a href="#!" className= "active">Recipes</a>
                <a href="#!">Groups</a>
                <a href="#!">Profile</a>
                <a href="#!">Settings</a>
                <a href="#!">Log In</a>
            </div>
        </div>
    )
}