import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AuthStatus = () =>{
const auth = useAuth()
const navigate = useNavigate()
const handleLogout = () => {
    auth.logOutUser(() => navigate("/"))
}

return !auth.user ?(
    <button onClick={() => navigate("/login")}>Log in</button>
) : (<p>wekcome! <button onClick={handleLogout}>log out</button>{" "}</p> )
}

export default AuthStatus