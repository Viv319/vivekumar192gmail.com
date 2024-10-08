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
import axios from "axios";
import FolderPage from "./components/FolderPage/FolderPage";
import Share from "./components/Share/Share";
import SavedResponse from "./components/SavedResponse/SavedResponse";

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
        <Route path="/share/fillForm" element={<Share />} />
        <Route path="/share/fillForm/:id" element={<Share />} />

        <Route path="/savedResponse/:id" element={<SavedResponse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
