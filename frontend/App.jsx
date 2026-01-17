import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/IndexWebsite/Home";
import Login from "./components/IndexWebsite/Login";
import AdminDashboard from "./components/AdminWebsite/AdminDashboard";
import TeacherDashboard from "./components/TeacherWebsite/TeacherDashboard";
import ParentDashboard from "./components/ParentWebsite/ParentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
