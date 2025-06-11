import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TeamListItem } from "../components/TeamListItem";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

function TeamListPage() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [createdTeamName, setCreatedTeamName] = useState();

  const fetchTeams = async () => {
    try {
      const teams = await api.get("/api/teams");
      setTeams(teams.data);
    } catch (error) {
      handleApiError(error);
      setTeams([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      handleApiError(error);
      setUsers([]);
    }
  };
  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/teams", { teamName: createdTeamName });
      setCreateMode(false);
      fetchTeams();
      toast.success("Team created successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCancelCreateTeam = (e) => {
    e.preventDefault();
    setCreateMode(false);
    setCreatedTeamName("");
  };
  return (
    <>
      {!createMode && (
        <button
          onClick={() => setCreateMode(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition m-4"
        >
          Add new Team
        </button>
      )}
      {createMode && (
        <form className="flex items-center gap-2 m-4 bg-white p-4 rounded shadow">
          <label className="mr-2 font-medium">Team Name</label>
          <input
            type="text"
            onChange={(e) => setCreatedTeamName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleCreateTeam}
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Create
          </button>
          <button
            onClick={handleCancelCreateTeam}
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </form>
      )}
      <div className="m-4">
        {teams.map((team) => (
          <TeamListItem
            key={team._id}
            team={team}
            users={users}
            refreshTeams={fetchTeams}
          />
        ))}
      </div>
    </>
  );
}

export { TeamListPage };
