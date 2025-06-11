import { useContext, useEffect, useState } from "react";
import { MoodEntryForm } from "../components/MoodEntryForm";
import { api } from "../services/api";
import Confetti from "react-confetti";
import { useAuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { getTodayDateAtMidnight } from "../utils/dateUtils";
import { HeroComponent } from "../components/HeroComponent";

function DashboardPage() {
  const [errorMsg, setErrorMsg] = useState();
  const [showConfetti, setShowConfetti] = useState(false);
  const [todayEntry, setTodayEntry] = useState(null);
  const [entryIsLoading, setEntryIsLoading] = useState(false);
  const { user, isLoading } = useAuthContext();

  //First thing: Get today's entry if there is one
  const fetchTodayEntry = async () => {
    setEntryIsLoading(true);
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
      console.log(errorMsg);
    } finally {
      setEntryIsLoading(false);
      console.log("get entry is done", todayEntry);
    }
  };
  //call in useeffect
  useEffect(() => {
    // Only fetch if auth is done and user is present
    if (!isLoading && user?._id) {
      fetchTodayEntry();
    }
  }, [user?._id, isLoading]);

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

  if (isLoading || entryIsLoading) {
    return <div>Loading...</div>;
  }

  //Dispayed for not logged in users
  if (!user?._id) {
    return <HeroComponent />;
  }

  return (
    <div>
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        Hello{user?.firstName ? `, ${user.firstName}` : "there"}!
      </h1>
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
      {errorMsg && <div className="text-red-600">{errorMsg.toString()}</div>}
    </div>
  );
}

export { DashboardPage };
