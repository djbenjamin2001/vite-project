
import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import Layout from "./Components/Layout"
import Home from "./pages/Home"
import About, {loader as aboutLoader} from "./pages/About"
import Statements, {loader as statementsLoader, action as statementsAction} from "./pages/Statements"
import Register from "./pages/Register"
import Profile, { profileAction, profileLoader } from "./pages/Profile"
import Login from "./pages/Login"
import Secrets, {Secretsloader, action as SecretsAction} from "./pages/Secrets"
import RequiredAuth from "./Components/RequiredAuth"
import useAuth from './hooks/useAuth'

function App(){
  const {user, UpdateUser,LogoutUser} = useAuth()
const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    
    <Route path="about" element={<About/>} loader={aboutLoader}/>
    
    <Route path="statements" element={<Statements/>} loader={statementsLoader} action={statementsAction}/>
    <Route path="register" element={<Register/>}/>
    <Route path="profile" element={<RequiredAuth><Profile/></RequiredAuth>} loader={profileLoader(user)} action={profileAction(user, UpdateUser)}/>

    <Route path="login" element={<Login/>}/>
    <Route path="secrets" element={<RequiredAuth><Secrets/></RequiredAuth>} loader={Secretsloader(user)} action={SecretsAction(user)}/>

    </Route>
))
  return (
<RouterProvider router={router}/>
  )
}

export default App;
