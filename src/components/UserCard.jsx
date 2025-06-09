import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 max-w-sm bg-white shadow">
      <img
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-16 h-16 rounded-full object-cover bg-gray-100"
      />
      <div>
        <div>
          <span className="font-semibold">First Name:</span> {user.firstName}
        </div>
        <div>
          <span className="font-semibold">Last Name:</span> {user.lastName}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {user.role}
        </div>
      </div>
    </div>
  );
};

export { UserCard };
