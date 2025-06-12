//If you're admin, you see own team + all teams here
import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { getTodayDateAtMidnight } from "../utils/dateUtils";
import { AuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { handleApiError } from "../utils/handleApiError";
import { AverageMoodComponent } from "../components/AverageMoodComponent";

function AnalyticsTeamPage() {
  const [todayEntries, setTodayEntries] = useState([]);
  const { user } = useContext(AuthContext);
  //API returns teams based on user's role & team membership
  const fetchTodaysEntries = async () => {
    try {
      const res = await api.get(
        `/api/moodentries/today?date=${getTodayDateAtMidnight()}`
      );
      setTodayEntries(res.data);
    } catch (error) {
      if (error.response?.status === 404) setTodayEntries(null); //expected
      handleApiError(error);
    }
  };
  //Call in useeffect
  useEffect(() => {
    fetchTodaysEntries();
  }, [user]);

  // todo: adjust context for admins
  return (
    <>
      <h3 className="text-3xl font-bold text-center my-6">
        {`Today's mood Entries for ${user?.team?.teamName || "your"} team:`}
      </h3>
      <AverageMoodComponent context={"Today's"} entries={todayEntries} />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayEntries.map((entry) => (
            <div key={entry._id} className="m-4">
              <MoodEntryCard moodEntry={entry} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { AnalyticsTeamPage };
