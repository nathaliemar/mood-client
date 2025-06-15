import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TeamListItem } from "../components/TeamListItem";
import { TextBox } from "../components/TextBox";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TeamListHeader } from "../components/TeamListHeader";
import { ConfirmModal } from "../components/ConfirmModal";

function TeamListPage() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [createdTeamName, setCreatedTeamName] = useState();
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

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
      console.log(users);
    } catch (error) {
      handleApiError(error);
      setUsers([]);
    }
  };
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchTeams(), fetchUsers()]);
      setLoading(false);
    };
    fetchAll();
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

  const handleDelete = (team) => {
    setTeamToDelete(team);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!teamToDelete) return;
    try {
      await api.delete(`/api/teams/${teamToDelete._id}`);
      setShowDeleteModal(false);
      setTeamToDelete(null);
      fetchTeams();
      toast.success("Team deleted successfully");
    } catch (error) {
      handleApiError(error);
      setShowDeleteModal(false);
      setTeamToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  return (
    <>
      <ConfirmModal
        open={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this team? This cannot be undone."
      />
      <div
        className={
          showDeleteModal ? "blur-sm pointer-events-none select-none" : ""
        }
      >
        {!createMode && (
          <button
            onClick={() => setCreateMode(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition m-4 cursor-pointer"
          >
            Add new Team
          </button>
        )}
        {createMode && (
          <div className="flex sm:block justify-center sm:justify-start mx-2 sm:mx-4">
            <form className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4 bg-white p-4 rounded shadow w-full max-w-lg">
              <label className="mr-2 font-medium min-w-[90px]">Team Name</label>
              <input
                type="text"
                onChange={(e) => setCreatedTeamName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex-1 min-w-0"
              />
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCreateTeam}
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer w-full sm:w-auto"
                >
                  Create
                </button>
                <button
                  onClick={handleCancelCreateTeam}
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition cursor-pointer w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="m-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px] m-4">
              <LoadingSpinner />
            </div>
          ) : teams.length === 0 ? (
            <div className="flex justify-center items-center min-h-[300px] m-4">
              <TextBox
                title="Start creating your first team"
                text="Only when being part of a team, users will be able to see data of their collegues. Get started by creating your first team now. Afterwards, you can assign it to your users via the user list"
              />
            </div>
          ) : (
            <>
              <div className="">
                <TeamListHeader />
              </div>
              {teams.map((team) => (
                <TeamListItem
                  key={team._id}
                  team={team}
                  users={users}
                  refreshTeams={fetchTeams}
                  onDelete={() => handleDelete(team)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { TeamListPage };
