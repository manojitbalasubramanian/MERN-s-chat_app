import { Navigate,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/login'
import SignUp from './pages/SignUp/SignUp'
import {Toaster} from "react-hot-toast"
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser}=useAuthContext();
  return (
    <div className='p-4 flex h-screen items-center justify-center'>
      <Routes> 
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} /> } />
        <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login />} />
        <Route path="/signUp" element={authUser ? <Navigate to="/"/> : <SignUp />} />
      </Routes>
      <Toaster />
    </div> 
  )
}

export default App
