import React, { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";
import { useAuthContext } from "../context/auth.context";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SignUpPage() {
  const { signup } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState();
  const [companyName, setCompanyName] = useState("");
  const query = useQuery();
  const companyId = query.get("companyId");
  const fromNewSignup = query.get("from") === "newsignup";

  useEffect(() => {
    const fetchCompanyName = async () => {
      if (companyId) {
        try {
          const res = await api.get(`/api/companies/${companyId}`);
          setCompanyName(res.data.name);
        } catch (error) {
          handleApiError(error);
        }
      }
    };
    fetchCompanyName();
  }, [companyId]);

  const handleSignup = async (formData) => {
    try {
      if (!companyId) {
        // New company flow
        const companyRes = await api.post("/api/companies", {
          name: formData.company,
        });
        const newCompanyId = companyRes.data._id;
        await signup({ ...formData, company: newCompanyId });
      } else {
        // Existing company flow
        await signup(formData);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <SignUpForm
          onSubmit={handleSignup}
          errorMsg={errorMsg}
          companyId={companyId}
          companyName={companyName}
          fromNewSignup={fromNewSignup}
        />
      </div>
    </div>
  );
}

export { SignUpPage };
