import { Link } from "react-router-dom"
import "./Menu.css"
function HomeMenu(){

    return(
        <div className = "menu">
            <Link to="/"><p>SIGNOUT</p></Link>
            <Link to="/favorites"><p>Favorites</p></Link>
        </div>
    )
}

export default HomeMenu