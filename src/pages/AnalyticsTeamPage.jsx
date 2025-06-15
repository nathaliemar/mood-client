import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { getTodayDateAtMidnight } from "../utils/dateUtils";
import { AuthContext } from "../context/auth.context";
import { MoodEntryCard } from "../components/MoodEntryCard";
import { handleApiError } from "../utils/handleApiError";
import { AverageMoodComponent } from "../components/AverageMoodComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TextBox } from "../components/TextBox";

function AnalyticsTeamPage() {
  const [todayEntries, setTodayEntries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("my-team");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Fetch all teams for admin dropdown
  useEffect(() => {
    const fetchTeams = async () => {
      if (user?.role === "admin") {
        try {
          const res = await api.get("/api/teams");
          setTeams(res.data);
        } catch (error) {
          setTeams([]);
        }
      }
    };
    fetchTeams();
  }, [user]);

  // Fetch entries based on selection
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const today = getTodayDateAtMidnight();
        let res;
        if (user?.role === "admin") {
          if (selectedTeam === "everyone") {
            res = await api.get(`/api/moodentries/all/today?date=${today}`);
          } else if (selectedTeam === "my-team") {
            res = await api.get(`/api/moodentries/today?date=${today}`);
          } else {
            res = await api.get(
              `/api/moodentries/team/${selectedTeam}?date=${today}`
            );
          }
        } else {
          res = await api.get(`/api/moodentries/today?date=${today}`);
        }
        setTodayEntries(res.data);
      } catch (error) {
        if (error.response?.status === 404) setTodayEntries(null);
        handleApiError(error);
      }
      setLoading(false);
    };
    if (user) fetchEntries();
    // eslint-disable-next-line
  }, [user, selectedTeam]);

  // Helper: get team name for dropdown label
  const getTeamName = (id) => {
    if (id === "everyone") return "Everyone";
    if (id === "my-team") return user?.team?.teamName || "My Team";
    const t = teams.find((t) => t._id === id);
    return t ? t.teamName : "";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const noEntries =
    !todayEntries || (Array.isArray(todayEntries) && todayEntries.length === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100">
      <div className="flex flex-col items-center p-4">
        {/* Admin dropdown */}
        {user?.role === "admin" && (
          <div className="mb-4 flex flex-col items-center">
            <label className="mb-1 font-semibold">
              Show results results for team:
            </label>
            <select
              className="border rounded px-3 py-2"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="my-team">
                {user?.team?.teamName
                  ? `My Team (${user.team.teamName})`
                  : "My Team"}
              </option>
              {teams.map((team) => (
                <option value={team._id} key={team._id}>
                  {team.teamName}
                </option>
              ))}
              <option value="everyone">Everyone</option>
            </select>
          </div>
        )}
        <h3 className="text-3xl font-bold text-center p-4">
          {`Today's mood Entries for ${
            user?.role === "admin"
              ? getTeamName(selectedTeam)
              : user?.team?.teamName || "your"
          } team:`}
        </h3>
        {/* Show TextBox if no entries */}
        {noEntries ? (
          <div className="flex justify-center items-center min-h-[300px] m-4 w-full">
            <TextBox
              title="Not enough answers yet"
              text="There are not enough mood entries from this team today to display analytics. Encourage your team to submit their mood!"
            />
          </div>
        ) : (
          <>
            <AverageMoodComponent context={"Today's"} entries={todayEntries} />
            <div className="flex justify-center">
              {todayEntries && todayEntries.length === 1 ? (
                <div className="flex justify-center">
                  <div className="m-4">
                    <MoodEntryCard moodEntry={todayEntries[0]} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todayEntries &&
                    todayEntries.map((entry) => (
                      <div key={entry._id} className="mx-auto my-4">
                        <MoodEntryCard moodEntry={entry} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { AnalyticsTeamPage };
