import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";
import { useState } from "react";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      console.log("successful logout");
      navigate("/login");
    } catch (error) {
      setErrorMsg(error);
    }
  };
  return (
    <div>
      {errorMsg && (
        <div className="text-red-500 text-sm mb-2">
          {"Something went wrong, pleas retry."}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Log out
      </button>
    </div>
  );
}

export { LogoutButton };
