import React from "react";

function UserListItem({ user }) {
  return (
    <div
      className="
        flex items-center gap-3 px-4 py-2 mb-2
        bg-white rounded-lg shadow-sm
        hover:bg-blue-50 transition-colors
        text-sm sm:text-base
      "
      style={{ minWidth: 0 }}
    >
      {/* User Image */}
      <img
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      {/* Firstname */}
      <div className="flex-1 min-w-0 font-medium truncate">
        {user.firstName}
      </div>
      {/* Lastname */}
      <div className="flex-1 min-w-0 truncate">{user.lastName}</div>
      {/* Email */}
      <div className="flex-1 min-w-0 text-gray-600 truncate">{user.email}</div>
      {/* Team */}
      <div className="flex-1 min-w-0  text-gray-600 truncate">
        {user.team?.teamName ? (
          user.team.teamName
        ) : (
          <span className=" text-gray-600 font-semibold">
            ⚠️ No team assigned!
          </span>
        )}
      </div>
      {/* TeamLead */}
      <div className="flex-1 min-w-0 text-gray-600 truncate">
        {user.teamLead ? "Yes" : "No"}
      </div>
      {/* Role */}
      <div className="flex-1 min-w-0 text-gray-600 truncate">{user.role}</div>
    </div>
  );
}

export { UserListItem };
