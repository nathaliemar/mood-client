import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { useAuthContext } from "../context/auth.context";

function SignUpPage() {
  const { signup } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState();

  const handleSignup = async (formData) => {
    try {
      await signup(formData);
    } catch (error) {
      setErrorMsg(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <SignUpForm onSubmit={handleSignup} errorMsg={errorMsg} />
      </div>
    </div>
  );
}

export { SignUpPage };
