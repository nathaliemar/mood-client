const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-start gap-6 border border-gray-200 rounded-lg p-6 max-w-4xl bg-white shadow">
      <img
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-20 h-20 rounded-full object-cover bg-gray-100"
      />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-y-3">
          <div className="font-semibold text-left">First Name:</div>
          <div className="text-left">{user.firstName}</div>
          <div className="font-semibold text-left">Last Name:</div>
          <div className="text-left">{user.lastName}</div>
          <div className="font-semibold text-left">Email:</div>
          <div className="text-left">{user.email}</div>
          <div className="font-semibold text-left">Role:</div>
          <div className="text-left">{user.role}</div>
          <div className="font-semibold text-left">Team:</div>
          <div className="text-left">{user.team.teamName}</div>
          <div className="font-semibold text-left">Is teamlead:</div>
          <div className="text-left">{user.isTeamlead ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
};

export { UserCard };
