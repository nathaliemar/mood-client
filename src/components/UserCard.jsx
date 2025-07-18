import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import { api } from "../services/api";
import { capitalize } from "../utils/capitalize";

const UserCard = ({ user, refreshUser, onDelete }) => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "",
    teamName: user?.team?.teamName || "",
    isTeamlead: user?.isTeamlead || false,
    imageUrl: user?.imageUrl,
  });

  const getTeams = async () => {
    try {
      const res = await api.get("/api/teams");
      setTeams(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };
  //Get all teams
  useEffect(() => {
    getTeams();
  }, []);

  // Update form state on edit
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "",
        teamId: user.team?._id || "",
        isTeamlead: user.isTeamlead || false,
        imageUrl: user.imageUrl || "",
      });
    }
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditMode(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${id}`, {
        ...form,
        team: form.teamId || null,
      }),
        setEditMode(false);
      refreshUser();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex items-start gap-6 border border-gray-200 rounded-lg p-6 ${
          !editMode ? "max-w-5xl" : "max-w-4xl"
        } bg-white shadow transition-all duration-200`}
      >
        <img
          src={form.imageUrl}
          alt={`${form.firstName} ${form.lastName}`}
          className="w-20 h-20 rounded-full object-cover bg-gray-100"
        />
        <div className="w-full">
          {!editMode ? (
            <>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="font-semibold text-left">First Name:</div>
                <div className="text-left break-words">{user.firstName}</div>
                <div className="font-semibold text-left">Last Name:</div>
                <div className="text-left break-words">{user.lastName}</div>
                <div className="font-semibold text-left">Email:</div>
                <div className="text-left break-all">{user.email}</div>
                <div className="font-semibold text-left">Role:</div>
                <div className="text-left break-words">
                  {capitalize(user.role)}
                </div>
                <div className="font-semibold text-left">Team:</div>
                <div className="text-left break-words">
                  {user.team?.teamName || "⚠️ No team assigned"}
                </div>
                <div className="font-semibold text-left">Is teamlead:</div>
                <div className="text-left break-words">
                  {user.isTeamlead ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex gap-2 mt-6 justify-center">
                <button
                  className="w-24 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="w-24 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-y-3">
              <div className="font-semibold text-left">First Name:</div>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              />
              <div className="font-semibold text-left">Last Name:</div>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              />
              <div className="font-semibold text-left">Email:</div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              />
              <div className="font-semibold text-left">Role:</div>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="font-semibold text-left">Team:</div>
              <select
                name="teamId"
                value={form.teamId}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              >
                <option value="">No team assigned</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.teamName}
                  </option>
                ))}
              </select>
              <div className="font-semibold text-left">Is teamlead:</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      isTeamlead: !prev.isTeamlead,
                    }))
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    form.isTeamlead ? "bg-green-500" : "bg-gray-300"
                  } cursor-pointer`}
                  aria-pressed={form.isTeamlead}
                  aria-label="Toggle teamlead"
                >
                  <span
                    className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ${
                      form.isTeamlead ? "translate-x-6" : ""
                    }`}
                  />
                </button>
                <span>{form.isTeamlead ? "Yes" : "No"}</span>
              </div>
              {/* Buttons */}
              <div className="col-span-2 flex gap-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export { UserCard };
