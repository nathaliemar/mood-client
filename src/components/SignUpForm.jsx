import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Simple info icon with tooltip
function InfoTooltip({ message }) {
  return (
    <span className="relative group ml-2 inline-block align-middle">
      <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold cursor-pointer">
        i
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-200">
        {message}
      </span>
    </span>
  );
}

function SignUpForm({ onSubmit, companyId, companyName }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",
  });
  const passwordHint =
    "At least 8 characters, incl. an uppercase, number, and symbol";

  useEffect(() => {
    if (companyId) {
      setForm((prev) => ({ ...prev, company: companyId }));
    }
  }, [companyId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanForm = {
      ...form,
      email: form.email.trim().toLowerCase(),
    };
    onSubmit(cleanForm);
  };

  // Dynamic title and button text
  const isInvite = !!companyId;
  const title = isInvite ? (
    <span>
      Create your user account with{" "}
      <span className="text-blue-600 font-semibold">
        {companyName || "this company"}
      </span>
    </span>
  ) : (
    <span>
      Create a new company account
      <InfoTooltip message="You create a new account for your company. Upon signup, you will have Admin rights and can invite your colleagues to the platform." />
    </span>
  );
  const buttonText = isInvite
    ? "Create my account"
    : "Create company and my admin account";

  return (
    <>
      <form
        className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          {title}
        </h2>
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300"
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleChange}
          />
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs text-gray-400">{passwordHint}</span>
          </div>
        </div>

        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-medium text-sm">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300"
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="font-medium text-sm">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300"
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleChange}
            />
          </div>
        </div>

        {/* Company Field */}
        {companyId ? (
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">Company</label>
            <input
              className="border rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
              type="text"
              name="company"
              value={companyName || companyId}
              disabled
              readOnly
            />
            <span className="text-xs text-gray-400">
              You are signing up for <b>{companyName || companyId}</b>
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label className="font-medium text-sm">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border rounded px-3 py-2 text-sm"
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
            />
            <span className="text-xs text-gray-400">
              This will create a new company account.
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>

        {/* Divider and Login Link */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <hr className="w-full border-t border-gray-200 my-2" />
          <span className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export { SignUpForm };
