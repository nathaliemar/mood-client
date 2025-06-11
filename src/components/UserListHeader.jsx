function UserListHeader() {
  return (
    <div
      className="
        flex items-center gap-3 px-4 py-2 mb-2
        bg-gray-100 rounded-lg
        text-sm sm:text-base font-semibold
      "
      style={{ minWidth: 0 }}
    >
      <div className="w-10 h-10" /> {/* Empty for image */}
      <div className="flex-1 min-w-0">First Name</div>
      <div className="flex-1 min-w-0">Last Name</div>
      <div className="flex-1 min-w-0">Email</div>
      <div className="flex-1 min-w-0">Team</div>
      <div className="flex-1 min-w-0">Team Lead Status</div>
      <div className="flex-1 min-w-0">Platform Role</div>
    </div>
  );
}

export { UserListHeader };
