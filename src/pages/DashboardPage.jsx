import React, { useState } from "react";
import { MoodEntryForm } from "../components/MoodEntryForm";
import { api } from "../services/api";
import Confetti from "react-confetti";

function DashboardPage() {
  const [errorMsg, setErrorMsg] = useState();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMoodEntry = async ({ mood, comment }) => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    const reqBody = { score: mood, note: comment, date: now.toISOString() };
    try {
      await api.post("/api/moodentries", reqBody);
      setShowConfetti(true); // Show confetti
      setTimeout(() => setShowConfetti(false), 5000); // Hide after 5s
    } catch (error) {
      setErrorMsg(error);
    }
  };

  //TODO: If error 409: you already submitted!

  return (
    <div>
      {showConfetti && <Confetti />}
      <h1>Hello there!</h1>
      <div>
        <MoodEntryForm onSubmit={handleMoodEntry} />
      </div>
    </div>
  );
}

export { DashboardPage };
