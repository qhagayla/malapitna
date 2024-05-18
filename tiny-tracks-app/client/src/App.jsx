import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/shared/Layout.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import ClientsPage from "@/pages/dashboard/ClientsPage.jsx";
import CalendarPage from "@/pages/dashboard/CalendarPage.jsx";
import ReportsPage from "@/pages/dashboard/ReportsPage.jsx";
import ProgressTrackingPage from "@/pages/dashboard/ProgressTrackingPage.jsx";
import MessagesPage from "@/pages/dashboard/MessagesPage.jsx";
import SettingsPage from "@/pages/dashboard/config/SettingsPage.jsx";
import HelpCenterPage from "@/pages/dashboard/config/HelpCenterPage.jsx";
import LoginPage from "@/pages/authentication/LoginPage.jsx";
import RegistrationPage from "@/pages/authentication/RegistrationPage.jsx";
import VideoDashboard from "@/pages/dashboard/video/VideoDashboard.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} /> */}
                <Route path="/" element={<Layout />}>
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                    <Route path="/" element={<ClientsPage />} />
                    <Route path="/video-dashboard" element={<VideoDashboard />} />
                    {/*<Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route
                        path="/progress-tracking"
                        element={<ProgressTrackingPage />}
                    />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/help-center" element={<HelpCenterPage />} /> 
            */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
