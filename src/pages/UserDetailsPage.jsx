import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link, useParams } from "react-router-dom";
import { UserCard } from "../components/UserCard";
import { handleApiError } from "../utils/handleApiError";

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
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

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <UserCard user={user} refreshUser={fetchUser} />
        <Link to={"/settings/users"}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition mt-6">
            Back to user list
          </button>
        </Link>
      </div>
    </>
  );
}

export { UserDetailsPage };
