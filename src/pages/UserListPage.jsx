import { useEffect, useState } from "react";
import { api } from "../services/api";
import { UserListItem } from "../components/UserListItem";
import { Link } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import { UserListHeader } from "../components/UserListHeader";
import { useAuthContext } from "../context/auth.context";
import toast from "react-hot-toast";

function UserListPage() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  const handleCopyInviteLink = () => {
    if (!user?.company) {
      toast.error("No company ID found.");
      return;
    }
    const inviteUrl = `${window.location.origin}/signup?companyId=${user.company}`;
    navigator.clipboard.writeText(inviteUrl);
    toast.success("Invite link copied!");
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      handleApiError(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleCopyInviteLink}
      >
        Copy Invite Link
      </button>
      <UserListHeader />
      <div>
        {users
          .slice() // avoid mutating state
          .sort((a, b) => {
            // Users without team come first
            if (!a.team && b.team) return -1;
            if (a.team && !b.team) return 1;
            // Both have or don't have a team: sort by firstName
            return a.firstName.localeCompare(b.firstName);
          })
          .map((user) => (
            <Link to={`/settings/users/${user._id}`} key={user._id}>
              <UserListItem user={user} />
            </Link>
          ))}
      </div>
    </>
  );
}

export { UserListPage };
