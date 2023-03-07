import {
    useLoaderData,
    Form,
    useActionData,
    json,
    useNavigate,
    useLocation
  } from "react-router-dom";
  import { createErrorObject } from "../helpers/errorhandling";
  import { useState } from "react";
  import axios from "axios";
  import * as z from "zod";
  import useAuth from "../hooks/useAuth";
  const Login = () => {
    const [errors, setErrors] = useState();
    const auth = useAuth(); // {user, logInUser, logOutUser}
    const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
    let schema = z
      .object({
        email: z.string().email("your email is not valid"),
        password: z
          .string({ required_error: "confirm password" })
          .min(1, { message: "confirm password" }),
      });
    console.log(schema);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors(null);
      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData);
      let validated = schema.safeParse(values);
      console.log(values);
      console.log(validated); // {succes, data, error}
      if (validated.success) {
       
         try {
     let response = await axios.post("http://localhost:4000/login", {
          email: validated.data.email,
          password: validated.data.password,
        });
 
         auth.logInUser(response.data, () => navigate(from));
         } catch (error) {
         setErrors({status:error.response.data})
         }
      } else {
        setErrors(createErrorObject(validated.error));
        console.log(errors);
      }
    };
  
    return (
      <>
        <h1>register</h1>
        <Form method="post" onSubmit={handleSubmit}>
          <div>
            <input type="Email" name="email" placeholder="Email" />
  
            {errors?.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <input type="Password" name="password" placeholder="password" />
  
            {errors?.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          {errors?.status && (
              <p style={{ color: "red" }}>{errors.status}</p>
            )}
          <button type="submit"> Login </button>
        </Form>
      </>
    );
  };
  
  export default Login;
  