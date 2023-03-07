import { useContext } from "react";
import { Authcontext } from "../Contexts/Authcontext";

const useAuth = () =>{
    return useContext(Authcontext)
}

export default useAuth
