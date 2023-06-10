export default function Sidebar({links}) {
    return(
        <div className= "side-bar">
            {
                links.map(link => (
                    <a className= "sidebar-link" href={links.path} key={link.name}>{link.name}</a>
                ))
            }
        </div>
    )
}