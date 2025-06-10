import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

function LoginPage() {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
    }
  }, [user]);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export { LoginPage };
