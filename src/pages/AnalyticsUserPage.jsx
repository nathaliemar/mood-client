import { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import { api } from "../services/api";
import { useAuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { WeeklyMoodChart } from "../components/WeeklyMoodChart";
import { TextBox } from "../components/TextBox";
import { LoadingSpinner } from "../components/LoadingSpinner";

function AnalyticsUserPage() {
  const [entries, setEntries] = useState([]);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await api.get(`/api/moodentries/user/${user._id}`);
      setEntries(res.data);
      console.log(entries);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      fetchEntries();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100 relative">
      {entries.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <TextBox
            title="Unlock analytics by submitting your first mood entry!"
            text="Once you have submitted your first mood entry, you can see your mood history here. What are you waiting for?"
          />
        </div>
      )}
      <div
        className={
          entries.length === 0
            ? "filter blur-sm pointer-events-none select-none"
            : ""
        }
      >
        <div className="flex flex-col items-center p-4">
          <h3 className="text-2xl font-semibold mb-4">Your mood trend</h3>
          <WeeklyMoodChart entries={entries} />
        </div>
        <h3 className="text-2xl font-bold text-center my-6">
          View all mood entries
        </h3>
        <div className="flex flex-col items-center">
          {entries.map((entry) => (
            <div key={entry._id} className="m-4">
              <MoodEntryCard moodEntry={entry} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AnalyticsUserPage };
