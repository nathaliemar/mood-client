import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TeamListItem } from "../components/TeamListItem";
import { Link } from "react-router-dom";

function TeamListPage() {
  const [teams, setTeams] = useState([]);
  const fetchTeams = async () => {
    try {
      const teams = await api.get("/api/teams");
      setTeams(teams.data);
    } catch (error) {
      console.log(error);
      setTeams([]);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <Link>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition m-4">
          Add new Team
        </button>
      </Link>
      <div>
        {teams.map((team) => (
          <TeamListItem key={team._id} team={team} refreshTeams={fetchTeams} />
        ))}
      </div>
    </>
  );
}

export { TeamListPage };
