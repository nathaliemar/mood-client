import React, { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login, user } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      setErrorMsg(error);
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
        <LoginForm onSubmit={handleLogin} errorMsg={errorMsg} />
      </div>
    </div>
  );
}

export { LoginPage };
