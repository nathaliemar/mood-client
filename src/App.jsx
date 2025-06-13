import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AnalyticsTeamPage,
  AnalyticsUserPage,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  SignUpPage,
  TeamListPage,
  UserDetailsPage,
  UserListPage,
} from "./pages";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100">
      <Toaster position="bottom-center" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/settings/users" element={<UserListPage />} />
            <Route path="/settings/users/:id" element={<UserDetailsPage />} />
            <Route path="/settings/teams" element={<TeamListPage />} />
            <Route path="/analytics/user" element={<AnalyticsUserPage />} />
            <Route path="/analytics/team" element={<AnalyticsTeamPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
