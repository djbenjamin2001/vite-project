import "../App.css";
import AuthStatus from "./Authstatus";
import { Outlet, useNavigation } from "react-router-dom";
import Navigation from "./Navigation";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const navigation = useNavigation();
  return (
      <div className="App">
        {navigation.state === "loading" ? <h1>loading</h1> : <h1>idle</h1>}
        <header>
          <p>header</p>
          <AuthStatus />
          <Navigation />
        </header>
        <main>
          {navigation.state === "loading" ? <p>loading</p> : <Outlet />}
        </main>
        <footer>
          <p>footer</p>
        </footer>
        <ToastContainer autoClose={5000} hideProgressBar position="top-center" />
      </div>
   
  );
}

export default Layout;
