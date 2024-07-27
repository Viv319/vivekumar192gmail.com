import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandlingPage from "./pages/LandingPage/LandingPage";
import SettingPage from "./pages/Setting/SettingPage";
import WorkspacePage from "./pages/WorkspacePage/WorkspacePage";
import ThemePage from "./pages/ThemePage/ThemePage";
import ResponsePage from "./pages/ResponsePage/ResponsePage";
import FormbotPage from "./pages/FormbotPage/FormbotPage";
import axios from "axios";
import FolderPage from "./components/FolderPage/FolderPage";

function App() {
  axios.defaults.withCredentials = true;
  // const
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandlingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/workspace/theme" element={<ThemePage />} />
        <Route path="/workspace/response" element={<ResponsePage />} />
        <Route path="/dashboard/folder" element={<FolderPage />} />
        {/* <Route path="/formbot" element={<FormbotPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
