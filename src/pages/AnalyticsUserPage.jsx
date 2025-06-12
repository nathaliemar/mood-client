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
    <div>
      <h3 className="text-3xl font-bold text-center my-6">
        Your mood history:
      </h3>
      <div className="flex flex-col items-center">
        {entries.map((entry) => (
          <div key={entry._id} className="m-4">
            <MoodEntryCard moodEntry={entry} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center my-8">
        <h4 className="text-xl font-semibold mb-4">Your mood trend</h4>
        <WeeklyMoodChart entries={entries} />
      </div>
    </div>
  );
}

export { AnalyticsUserPage };
