import { useEffect, useState } from "react";
import { api } from "../services/api";
import { UserListItem } from "../components/UserListItem";
import { Link } from "react-router-dom";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      // Optionally handle error
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <Link to={`/settings/users/${user._id}`} key={user._id}>
          <UserListItem user={user} />
        </Link>
      ))}
    </div>
  );
}

export { UserListPage };
