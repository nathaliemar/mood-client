import { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import { api } from "../services/api";
import { useAuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { WeeklyMoodChart } from "../components/WeeklyMoodChart";

function AnalyticsUserPage() {
  const [entries, setEntries] = useState([]);
  const { user } = useAuthContext();

  const fetchEntries = async () => {
    try {
      const res = await api.get(`/api/moodentries/user/${user._id}`);
      setEntries(res.data);
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };
  useEffect(() => {
    if (user?._id) {
      fetchEntries();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100">
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
  );
}

export { AnalyticsUserPage };
