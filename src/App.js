import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import Onlineusers from "./components/Onlineusers";

function App() {
  // practice code
  const arr = [200, 300, -200, 4000];

  console.log(arr.reduce((acc, cur) => acc + cur, 0));

  const { user, authIsReady } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={
                  user ? (
                    <Dashboard />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path='/login'
                element={
                  !user ? <Login /> : <Navigate to='/' />
                }
              />
              <Route
                path='/signup'
                element={
                  !user ? <Signup /> : <Navigate to='/' />
                }
              />
              <Route
                path='/create'
                element={
                  user ? (
                    <Create />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
              <Route
                path='/projects/:id'
                element={
                  user ? (
                    <Project />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
            </Routes>
          </div>
          {user && <Onlineusers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
