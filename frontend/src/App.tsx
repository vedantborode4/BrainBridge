import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"

export const BackendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        {/* <Route path="/brain/:shareLink" element={<BrainView/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App