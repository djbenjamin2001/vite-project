import axios from "axios";
import { useLoaderData,Form, useActionData } from "react-router-dom";
import * as z from "zod"
import { createErrorObject } from "../helpers/errorhandling";
import Cookies from "js-cookie";

export const Secretsloader = (user) => async () => {
    console.log(user)
    let response = await axios("http://localhost:4000/secrets", {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
     return await response.data;
   };
   export const action = (user) => async ({request}) => {
    let formData = await request.formData()
    let values = Object.fromEntries(await formData)
   let schema = z.object({
    quote:z.string({required_error:"write her dumbass"}).min(1, {message:"you must write something"}),
    author:z.string({required_error:"write her dumbass"}).min(1, {message:"you must write something"}),
    origin:z.string().optional(),
 
   })

 
    let{success, data, error}  = schema.safeParse(values) // {success, data, error}
if(success){
    await axios.post("http://localhost:4000/secrets", data, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`
        }
    });
    return null
    } else{
        return createErrorObject(error);
    }
   

   }
   const Secrets = () => {
    let errors = useActionData()
    const secrets = useLoaderData()
    console.log(secrets)
    return (  
<>
<h1>Secrets</h1>
{secrets.map((secret) => (
    <p key={secret.id}>{secret.quote} - {secret.author} - {secret.origin}</p>
))}
<Form method="post">
<div>
<input type="text" name="quote" />
<input type="text" name="author" />
<input type="text" name="origin" />
<button type="submit"> add </button>
{errors?.quote && ( <p style={{color:"red"}}>{errors.quote}</p> )} 
{errors?.author && ( <p style={{color:"red"}}>{errors.author}</p> )} 
{errors?.origin && ( <p style={{color:"red"}}>{errors.origin}</p> )} 
</div>
</Form>
</>
    );
   }
    
   export default Secrets;