import DashboardPage from "./pages/DashboardPage"
import IntakePage from "./pages/IntakePage"
import './App.css'
import { Routes, Route } from "react-router-dom"

function App() {


  return (
   
    <Routes>

      <Route
        path="/"
        element={<IntakePage />}
       />

      <Route
        path="/dashboard"
        element={<DashboardPage />} 
       /> 
    </Routes>
  )
}

export default App
