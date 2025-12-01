import { Link } from "react-router-dom"

export function Navbar () {
    return (
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/Register">Register</Link> 
        </nav>
    )
}