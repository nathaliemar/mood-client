import { useState } from "react";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

const TeamListItem = ({ team, refreshTeams, users = [], onDelete }) => {
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
      setExpanded(false);
      refreshTeams();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete) onDelete(team);
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-6 py-4 mb-2
        bg-white rounded-lg shadow-sm
        hover:bg-blue-50 transition-colors
        text-sm sm:text-base
        border border-gray-200
        ${expanded ? "ring-2 ring-indigo-200" : ""}
        min-w-0
      `}
    >
      {/* Expand/Collapse Button */}
      <button
        type="button"
        aria-label={expanded ? "Collapse" : "Expand"}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-100 transition cursor-pointer"
        onClick={() => setExpanded((prev) => !prev)}
        tabIndex={0}
      >
        <span
          className={`text-xl transition-transform duration-200 inline-block ${
            expanded ? "rotate-90" : "rotate-0"
          }`}
        >
          ›
        </span>
      </button>
      {!expanded ? (
        <>
          {/* Team Name */}
          <div className="flex-1 min-w-0 font-medium truncate">
            {team.teamName}
          </div>
          {/* Team Lead(s) */}
          <div className="flex-1 min-w-0 text-gray-600 truncate">
            {teamLeads.length > 0 ? (
              teamLeads.join(", ")
            ) : (
              <span className="italic text-gray-400">
                No Team Lead assigned
              </span>
            )}
          </div>
          {/* Placeholder for button space to align with expanded mode */}
          <div className="flex-shrink-0 w-[180px] hidden sm:block" />
        </>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-4 w-full items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Team Name
            </label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded px-3 py-1 shadow-sm focus:ring-indigo-400 focus:border-indigo-400 text-base font-medium"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Team Lead(s)
            </label>
            <div className="text-gray-800">
              {teamLeads.length > 0 ? (
                teamLeads.join(", ")
              ) : (
                <span className="italic text-gray-400">
                  No Team Lead assigned
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0 w-[180px] justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
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
