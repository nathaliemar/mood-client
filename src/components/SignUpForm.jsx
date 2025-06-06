import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUpForm({ onSubmit, errorMsg }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    company: "",
  });
  const passwordHint =
    "At least 8 characters, incl. an uppercase,number, and symbol";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    console.log("Form submitted:", form);
  };

  return (
    <>
      {" "}
      {errorMsg && <div className="text-red-500 mb-2">{errorMsg}</div>}
      <form
        className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
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

        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm flex items-center gap-1">
            Company Name <span className="text-red-500">*</span>
            <span
              className="ml-1 text-blue-400"
              title="This will help us find your colleagues"
              aria-label="Info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4m0-4h.01"
                />
              </svg>
            </span>
          </label>
          <input
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 border-gray-300"
            type="text"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={handleChange}
            onBlur={handleChange}
          />
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-4m0-4h.01"
              />
            </svg>
            This will help us find your colleagues
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
        >
          Sign up!
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

export default SignUpForm;
