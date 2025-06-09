import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams } from "react-router-dom";
import { UserCard } from "../components/UserCard";

function UserDetailsPage() {
  const [user, setUser] = useState();
  const { id } = useParams();
  const fetchUser = async () => {
    try {
      const res = await api.get(`/api/users/${id}`);
      setUser(res.data);
    } catch (err) {
      // Optionally handle error
      setUser();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex items-start justify-center min-h-screen pt-16">
      <UserCard user={user} />
    </div>
  );
}

export { UserDetailsPage };
