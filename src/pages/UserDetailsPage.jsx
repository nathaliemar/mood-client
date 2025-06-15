import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserCard } from "../components/UserCard";
import { handleApiError } from "../utils/handleApiError";
import { ConfirmModal } from "../components/ConfirmModal";

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get(`/api/users/${id}`);
      setUser(res.data);
      console.log("user object", user);
    } catch (err) {
      handleApiError(err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Delete logic moved up
  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/users/${id}`);
      navigate("/settings/users");
    } catch (error) {
      handleApiError(error);
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => setShowDeleteModal(false);

  return (
    <>
      <ConfirmModal
        open={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this user? This cannot be undone."
      />
      <div
        className={`flex flex-col items-center justify-center min-h-screen pt-16 ${
          showDeleteModal ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <UserCard user={user} refreshUser={fetchUser} onDelete={handleDelete} />
        <Link to={"/settings/users"}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition mt-6 cursor-pointer">
            Back to user list
          </button>
        </Link>
      </div>
    </>
  );
}

export { UserDetailsPage };
