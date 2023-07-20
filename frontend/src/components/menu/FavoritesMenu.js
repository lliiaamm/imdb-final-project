import { Link } from "react-router-dom"
import "./Menu.css"
function FavoritesMenu(){

    return(
        <div className = "menu">
            <Link to="/"><p>SIGNOUT</p></Link>
            <Link to="/home"><p>HOME</p></Link>
        </div>
    )
}

export default FavoritesMenu