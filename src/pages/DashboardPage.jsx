import { useContext, useEffect, useState } from "react";
import { MoodEntryForm } from "../components/MoodEntryForm";
import { api } from "../services/api";
import Confetti from "react-confetti";
import { AuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { getTodayDateAtMidnight } from "../utils/dateUtils";

function DashboardPage() {
  const [errorMsg, setErrorMsg] = useState();
  const [showConfetti, setShowConfetti] = useState(false);
  const [todayEntry, setTodayEntry] = useState();
  const { user } = useContext(AuthContext);

  //First thing: Get today's entry if there is one
  const fetchTodayEntry = async () => {
    try {
      const res = await api.get(
        `/api/moodentries/user/${
          user._id
        }/today?date=${getTodayDateAtMidnight()}`
      );
      setTodayEntry(res.data);
    } catch (error) {
      if (error.response?.status === 404) setTodayEntry(null); //expected
      else setErrorMsg("Error fetching today's entry");
    }
  };
  //call in useeffect
  useEffect(() => {
    if (!user?._id) return;
    fetchTodayEntry();
  }, [user]);

  const handleMoodEntry = async ({ mood, comment }) => {
    const reqBody = {
      score: mood,
      note: comment,
      date: getTodayDateAtMidnight(),
    };
    try {
      const res = await api.post("/api/moodentries", reqBody);
      setShowConfetti(true); // Show confetti
      setTimeout(() => setShowConfetti(false), 5000); // Hide after 5s
      setTodayEntry(res.data);
    } catch (error) {
      setErrorMsg(error);
    }
  };

  //TODO: If error 409: you already submitted!

  return (
    <div>
      {showConfetti && <Confetti />}
      <h1>Hello there!</h1>
      {todayEntry ? (
        <div>
          You already submitted for today!
          <br />
          <MoodEntryCard moodEntry={todayEntry} />
        </div>
      ) : (
        <div>
          <MoodEntryForm onSubmit={handleMoodEntry} />
        </div>
      )}
    </div>
  );
}

export { DashboardPage };
