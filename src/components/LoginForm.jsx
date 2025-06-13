import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };

  return (
    <>
      <form
        className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="text-xl font-semibold text-center mb-4">
          Welcome back! 👋
        </div>
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
            required
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
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
        >
          Log in
        </button>

        {/* Divider and Sign Up Link */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <hr className="w-full border-t border-gray-200 my-2" />
          <span className="text-xs text-gray-500">
            No account yet?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up now!
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export { LoginForm };
