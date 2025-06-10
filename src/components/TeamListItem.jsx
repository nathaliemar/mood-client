import { useState, useEffect } from "react";
import { api } from "../services/api";

const TeamListItem = ({ team, refreshTeams }) => {
  const [expanded, setExpanded] = useState(false);
  const [editName, setEditName] = useState(team.teamName);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await api.get("/api/users");
        setUsers(res.data);
      } catch {
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (expanded && users.length === 0) {
      fetchUsers();
    }
  }, [expanded, users.length]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`api/teams/${team._id}`, { teamName: editName });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`api/teams/${team._id}`);
      refreshTeams();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="border rounded p-4 mb-2 bg-white shadow cursor-pointer hover:bg-gray-50 transition"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {!expanded ? (
        <div>
          <div className="font-semibold text-lg">{team.teamName}</div>
          <div className="text-gray-600 text-sm mt-1">
            {team.teamLeads && team.teamLeads.length > 0 ? (
              `Team Leads: ${team.teamLeads.join(", ")}`
            ) : (
              <span className="italic text-gray-400">
                No Team Lead assigned
              </span>
            )}
          </div>
        </div>
      ) : (
        <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Leads
            </label>
            <div className="mt-1 text-gray-800">
              {team.teamLeads && team.teamLeads.length > 0 ? (
                team.teamLeads.join(", ")
              ) : (
                <span className="italic text-gray-400">
                  No Team Lead assigned
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export { TeamListItem };
