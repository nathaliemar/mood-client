import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import { api } from "../services/api";
import { capitalize } from "../utils/capitalize";

const UserCard = ({ user, refreshUser }) => {
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
  const navigate = useNavigate();

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

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      //Todo: pretty modal
      "Are you sure you want to delete this user? This cannot be undone."
    );
    if (!confirmed) return;
    try {
      await api.delete(`/api/users/${id}`);
      navigate("/settings/users");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="flex items-start gap-6 border border-gray-200 rounded-lg p-6 max-w-4xl bg-white shadow">
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
              <div className="text-left">{user.firstName}</div>
              <div className="font-semibold text-left">Last Name:</div>
              <div className="text-left">{user.lastName}</div>
              <div className="font-semibold text-left">Email:</div>
              <div className="text-left">{user.email}</div>
              <div className="font-semibold text-left">Role:</div>
              <div className="text-left">{capitalize(user.role)}</div>
              <div className="font-semibold text-left">Team:</div>
              <div className="text-left">
                {user.team?.teamName || "⚠️ No team assigned"}
              </div>
              <div className="font-semibold text-left">Is teamlead:</div>
              <div className="text-left">{user.isTeamlead ? "Yes" : "No"}</div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
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
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isTeamlead"
                checked={form.isTeamlead}
                onChange={handleChange}
              />
              <span>{form.isTeamlead ? "Yes" : "No"}</span>
            </label>
            {/* Buttons */}
            <div className="col-span-2 flex gap-2 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export { UserCard };
