function TeamListHeader() {
  return (
    <div className="flex items-center gap-3 px-6 py-4 mb-2 bg-gray-100 rounded-lg text-sm sm:text-base font-semibold w-full min-w-0 box-border">
      {/* Expand/Collapse Button placeholder */}
      <div className="flex-shrink-0 w-8 h-8" />
      {/* Team Name */}
      <div className="flex-1 min-w-0 font-semibold truncate">Team Name</div>
      {/* Team Lead(s) */}
      <div className="flex-1 min-w-0 font-semibold truncate">Team Lead(s)</div>
      {/* Placeholder for button space to align with expanded mode */}
      <div className="flex-shrink-0 w-[180px] hidden sm:block" />
    </div>
  );
}

export { TeamListHeader };
