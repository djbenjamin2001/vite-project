import { useLoaderData, Form, useActionData, json, useNavigate } from "react-router-dom";
import { createErrorObject } from "../helpers/errorhandling";
import { useState} from "react";
import axios from "axios";
import * as z from "zod"
import useAuth from "../hooks/useAuth";
const Register = () => {
    const [errors, setErrors] = useState();
    const auth = useAuth() // {user, logInUser, logOutUser}
const navigate = useNavigate()

let schema = z.object({
    email:z.string().email("your email is not valid"),
    password:z.string({required_error:"confirm password"}).min(1, {message:"confirm password"}),
    confirmpassword:z.string().min(1, {message:"passwords dont match!"}) 
  
   }).refine((values) => values.password == values.confirmpassword, {
    message:"Passwords do not match!",
    path:["confirmpassword"],
})
   console.log(schema)

   const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrors(null)
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData)
    let validated = schema.safeParse(values) 
    console.log(values)
    console.log(validated) // {succes, data, error}
    if(validated.success){
        let response = await axios.post("http://localhost:4000/register", {
           email: validated.data.email,
           password: validated.data.password
        })
        //console.log(response.data)
        if(response.status === 400) setErrors( {exists : "sorry that email is already registered"})
        auth.logInUser(response.data,() => navigate("/"))
    } else{
       setErrors(createErrorObject(validated.error))
        console.log(errors)
    }
   }

    return ( 
  <>
   <h1>register</h1>
  <Form method="post" onSubmit={handleSubmit}>
  <div>
  <input type="Email" name="email" placeholder="Email" />
 
{errors?.email && ( <p style={{color:"red"}}>{errors.email}</p> )} 
  </div>
  <div>
  <input type="Password" name="password" placeholder="password" />

  {errors?.password && ( <p style={{color:"red"}}>{errors.password}</p> )} 
  </div>
  <div>
  <input type="password" name="confirmpassword" placeholder="confrim password"/>
  
  {errors?.confirmpassword && ( <p style={{color:"red"}}>{errors.confirmpassword}</p> )} 
  </div>
  <button type="submit"> add </button>
</Form>
</>
    );
}
 
export default Register;