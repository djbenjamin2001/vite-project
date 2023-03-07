import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
const Navigation = () => {
    const auth = useAuth()
    return (  <nav style={{display:"flex", gap:"1rem", justifyContent:"center"}}>
        <Link to="/">Home</Link>  <Link to="/about">About</Link>{" "}
        <Link to="/statements">Statements</Link>{" "}
        {auth.user && <Link to="/secrets">secrets</Link> }{" "}
        {!auth.user && <Link to="/register">Register</Link>}
        {auth.user && <Link to="/profile">Profile</Link>}
      </nav>  );
}
 
export default Navigation;