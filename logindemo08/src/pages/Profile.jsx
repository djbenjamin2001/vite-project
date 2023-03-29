import { useLoaderData, Form, useActionData, json, useNavigate, useSubmit } from "react-router-dom";
import { createErrorObject } from "../helpers/errorhandling";
import axios from "axios";
import * as z from "zod"

import {toast} from "react-toastify"
export const profileLoader= (user) => async() => {
  try {
    let response = await axios.get("http://localhost:4000/users/" + user.id,
  {
    headers:{
        Authorization:`Bearer ${user.accessToken}`,
}
})
  console.log(response)
  return response.data 
  } catch (error) {
    throw new Response("no user",{status:401})
  }
 
}

export const profileAction = (user) => async ({request}) =>{
  console.log(user)
    const formData = await request.formData()
    const values = Object.fromEntries(await formData)

    let schema = z.object({
        email:z.string().email("your email is not valid"),
        username:z.string({required_error:"username required"}).min(1, {message:"username required"}),

        firstname: z.string().optional(),
        lastname: z.string().optional(),
        birthday: z.coerce.date({invalid_type_error: "birthday must be a date", message: "please type a valid date"}),
        description: z.string().optional()
       })
       const {success, data, error} = schema.safeParse(values)
       console.log(success)
       if (success){
           console.log(values) 
        let response = await axios.patch("http://localhost:4000/users/" + user.id, data, {
               headers:{
                   Authorization:`Bearer ${user.accessToken}`,
            "Content-type": "application/json"
        }
        
    })
  toast.success( <p>your profile has been updated</p>, {
    autoClose:800
  } )
    /*UpdateUser(await response.data)*/
     return null
}else{
   return createErrorObject(error)
}
}

const Profile = () => {
   /* const {user} = useAuth() // {user, logInUser, logOutUser}*/
   const user = useLoaderData()
    const errors = useActionData()  
   
   
  
   /* user && console.log(user.birthday.split("T")[0])*/

    return ( 
  <>
   <h1>register</h1>
  <Form method="post" /*onSubmit={handleSubmit}*/ >
  <div>
  <input type="Email" name="email" placeholder="email" defaultValue={user.email} />
 
{errors?.email && ( <p style={{color:"red"}}>{errors.email}</p> )} 
  </div>

  <div>
  <input type="text" name="username" placeholder="username" defaultValue={user.username} />
 
{errors?.username && ( <p style={{color:"red"}}>{errors.username}</p> )} 
  </div>
 
  <div>
  <input type="text" name="firstname" placeholder="firstname" defaultValue={user.firstname}/>
 
{errors?.firstname && ( <p style={{color:"red"}}>{errors.firstname}</p> )} 
  </div>
  <div>
  <input type="text" name="lastname" placeholder="lastname" defaultValue={user.lastname} />
 
{errors?.lastname && ( <p style={{color:"red"}}>{errors.lastname}</p> )} 
  </div>
  <div>
  <input type="date" name="birthday" placeholder="birthday" defaultValue={user.birthday.split("T")[0]}/>

  {errors?.birthday && ( <p style={{color:"red"}}>{errors.birthday}</p> )} 
  </div>
  <div>
  <textarea name="description" id="description" placeholder="description" cols="30" rows="10" defaultValue={user.description} ></textarea>
  
  {errors?.description && ( <p style={{color:"red"}}>{errors.description}</p> )} 
  </div>
  <button type="submit"> add </button>
  
</Form>

</>
    );
}
 
export default Profile;