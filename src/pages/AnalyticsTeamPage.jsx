//If you're admin, you see own team + all teams here
import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { getTodayDateAtMidnight } from "../utils/dateUtils";
import { AuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";

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
      console.log(error);
    }
  };
  //Call in useeffect
  useEffect(() => {
    fetchTodaysEntries();
    console.log(user);
  }, [user]);

  //todo: add page for users w/o team
  // todo: adjust context for admins
  return (
    <>
      <h3>Today's mood Entries for your team: </h3>
      <div>
        {todayEntries.map((entry) => (
          <MoodEntryCard moodEntry={entry} key={entry._id} />
        ))}
      </div>
    </>
  );
}

export { AnalyticsTeamPage };
