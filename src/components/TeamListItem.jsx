import { useState, useEffect } from "react";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

const TeamListItem = ({ team, refreshTeams, users = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const [editName, setEditName] = useState(team.teamName);

  const teamLeads = users
    .filter(
      (u) =>
        u.isTeamlead === true &&
        u.team &&
        (typeof u.team === "object"
          ? u.team._id === team._id
          : u.team === team._id)
    )
    .map((u) => `${u.firstName} ${u.lastName}`);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`api/teams/${team._id}`, { teamName: editName });
    } catch (error) {
      handleApiError(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`api/teams/${team._id}`);
      refreshTeams();
    } catch (error) {
      handleApiError(error);
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
            {teamLeads.length > 0 ? (
              `Team Leads: ${teamLeads.join(", ")}`
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
              {teamLeads.length > 0 ? (
                teamLeads.join(", ")
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
