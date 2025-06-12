import { useEffect, useState } from "react";
import { MoodEntryForm } from "../components/MoodEntryForm";
import { api } from "../services/api";
import Confetti from "react-confetti";
import { useAuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { getTodayDateAtMidnight } from "../utils/dateUtils";
import { HeroComponent } from "../components/HeroComponent";
import { handleApiError } from "../utils/handleApiError";

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
    }
  };
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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
      setTodayEntry(res.data);
    } catch (error) {
      handleApiError(error);
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
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {showConfetti && <Confetti />}
      <h1 className="text-4xl font-bold mb-4">
        Hello{user?.firstName ? `, ${user.firstName}` : "there"}! 👋
      </h1>
      {todayEntry ? (
        <div className="flex flex-col items-center">
          <h4 className="mb-4">
            Nice job! You already submitted for today! 😎
          </h4>
          <MoodEntryCard moodEntry={todayEntry} />
          {/* Conditional rendering based on user.team */}
          {user?.team ? (
            <>
              <h4 className="m-4">Check out how your team is doing</h4>
              <div className="flex gap-4">
                <a
                  href="/analytics/team"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View my team
                </a>
                <a
                  href="/analytics/user"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  View my history
                </a>
              </div>
            </>
          ) : (
            <>
              <h4 className="m-4">Check out how you've been doing</h4>
              <a
                href="/analytics/user"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                View my history
              </a>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <MoodEntryForm onSubmit={handleMoodEntry} />
        </div>
      )}
    </div>
  );
}

export { DashboardPage };
