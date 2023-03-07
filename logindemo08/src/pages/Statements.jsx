import { useLoaderData, Form, useActionData, json, useSubmit } from "react-router-dom";
import axios from 'axios'
import * as z from "zod"
import {toast} from "react-toastify"
import { createErrorObject } from "../helpers/errorhandling";
export const loader = async () => {
    let response = await fetch("http://localhost:4000/statements");
     return await response.json();
   };
   export const action = async ({request}) => {
    let formData = await request.formData()
    let values = Object.fromEntries(await formData)

    console.log(values._action)
 if(values._action === "delete"){
   await axios.delete("http://localhost:4000/statements/" + values._id)
return null
 } else{

     let schema = z.object({
         sentence:z.string({required_error:"write her dumbass"}).min(1, {message:"you must write something"}),
         
        })
        
        
        let{success, data, error}  = schema.safeParse(values) // {success, data, error}
        if(success){
            await axios.post("http://localhost:4000/statements", data)
            return null
        } else{
            return createErrorObject(error);
        }
        
    }
        
    }
const Statements = () => {
    const statements = useLoaderData()
    let errors = useActionData()
    const submit = useSubmit()
    const handleDelete = (form) =>{
        console.log("delete item now")
        toast.dismiss()
        submit(form);
    }
      
      const handleConfirmation = (e) =>{
        e.preventDefault()
        let form = e.target
        console.log(form)
        
        toast(<div>
            <p>are you sure you want to delete this?</p>
            <button style={{backgroundColor:"red", color:"white"}} onClick={() => toast.dismiss()}>Cancel</button>
            <button onClick={() => handleDelete(form)}>Delete</button>
        </div>,{
          autoClose:false , 
          closeButton:false,
          closeOnClick:false
        })
       
      }
 console.log(errors)
    return( 
        <>
    <section>
    <h1>Statements</h1>
    {statements.map((statement) => (
        <div key={statement.id} style={{display:"flex", justifyContent:"center", gap:"1.5rem"}}>
            <p>{statement.sentence}</p> 
         <Form method="post" onSubmit={handleConfirmation}>
            <input type="hidden" name="_action" value="delete"/>
            <input type="hidden" name="_id" value={statement.id}/>
            <button>&times;</button>
            
            </Form> 
         </div>
    ))}
    </section>
    
    <Form method="post">
        <div>
        <input type="text" name="sentence" />
        <button type="submit"> add </button>
        {errors?.sentence && ( <p style={{color:"red"}}>{errors.sentence}</p> )} 
        </div>
    </Form>
   
  
    </>
    );
}
 
export default Statements;