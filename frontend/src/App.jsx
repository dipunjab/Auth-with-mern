import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-500 to-teal-900 flex items-center justify-center relative overflow-hidden">
      
    <Routes>
    <Route path="/" element={"Home"}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>

    </div>
  )
}

export default App
