import { NavLink } from "react-router-dom";

function NavBar (){

    return(
        <div id="nav">
            <NavLink
                to="/"
                // exact
            >
             <button type="button" className="btn btn-outline-light">Home Page</button>
            </NavLink>
            <NavLink
                to="/search"
                // exact
            >
             <button type="button" className="btn btn-outline-light">Search</button>
            </NavLink>
            <NavLink
                to="/history"
                // exact
            >
             <button type="button" className="btn btn-outline-light">History</button>
            </NavLink>
        </div>
    )
}

export default NavBar;