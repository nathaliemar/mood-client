import React, { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { useAuthContext } from "../context/auth.context";

function LoginPage() {
  const { login, user } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState();

  const handleLogin = async (formData) => {
    try {
      await login(formData);
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
