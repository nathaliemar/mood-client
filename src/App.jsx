import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AnalyticsTeamPage,
  AnalyticsUserPage,
  AnswerFormPage,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  SignUpPage,
  TeamListPage,
  UserDetailsPage,
  UserListPage,
} from "./pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/answer" element={<AnswerFormPage />} />
            <Route path="/settings/users" element={<UserListPage />} />
            <Route path="/settings/users/:id" element={<UserDetailsPage />} />
            <Route path="/settings/teams" element={<TeamListPage />} />
            <Route path="/analytics/user" element={<AnalyticsUserPage />} />
            <Route path="/analytics/team" element={<AnalyticsTeamPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
