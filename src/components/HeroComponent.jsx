import React from "react";

const HeroComponent = () => (
  <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-100">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full px-6 py-16">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Start your team's journey to a happier, more connected workplace—one
          mood at a time.
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-xl">
          Discover how your team is <span className="italic">really</span>{" "}
          feeling and grow closer together – building trust, boosting morale,
          and unlocking productivity all at once.
        </p>
        <div className="flex gap-4">
          <a
            href="/signup"
            className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold shadow transition text-lg"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="px-8 py-3 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow transition text-lg"
          >
            Log In
          </a>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center mt-12 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
          alt="Happy team in a modern office"
          className="rounded-2xl shadow-lg w-full max-w-md object-cover"
        />
      </div>
    </div>
  </div>
);

export { HeroComponent };
