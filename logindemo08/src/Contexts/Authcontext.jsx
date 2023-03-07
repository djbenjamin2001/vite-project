import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const Authcontext = createContext()
const AuthProvider = ({children}) => {
const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
    );

const logInUser = (newUser, callback) => {
 let userObj = {
    id:newUser.user.id,
    accessToken: newUser.accessToken,

    
}
setUser(userObj)
Cookies.set("user", JSON.stringify(userObj))
callback()
}


const logOutUser = (callback) => {
    Cookies.remove("user")
    setUser(null)
    callback()
}


    return ( <Authcontext.Provider value={{user, logInUser,logOutUser}}>
        {children}
    </Authcontext.Provider> );
}
 
export default AuthProvider;