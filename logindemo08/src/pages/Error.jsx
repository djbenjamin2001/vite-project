import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    if(isRouteErrorResponse(error) && error.status === 404){
        return(
            <div>
                <h1>Hov!</h1>
                <p>{error.data}</p>
                <Link to="/">tilbage til forsiden</Link>
            </div>
        )
      
    } useEffect(() => {
        if(isRouteErrorResponse(error) && error.status === 401){
      setTimeout(() =>{
        navigate("/login", {state: {from: {pathname:error.data.from}}})
      }, 500)
      
    } 
    }, []);
   
    if(isRouteErrorResponse(error) && error.status === 401){
      return(<div>
            <h1>have you not logged in or is your tokken missing </h1>
            <p>redirecting</p>
            <Link to="/login">click to log in now</Link>
        </div>)
        
        
      } 
    console.log(error)
    return ( <>
    <h1>OOP!</h1>
    <p>sumtin wong</p>
    </> );
}
 
export default Error;