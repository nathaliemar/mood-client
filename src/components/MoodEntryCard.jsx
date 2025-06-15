import { userFacingDate } from "../utils/dateUtils";
import { moodOptions } from "../utils/moodOptions";

function MoodEntryCard({ moodEntry, user }) {
  const { createdBy, score, note, date } = moodEntry;
  // Prefer user prop if present, fallback to createdBy (for use outside Dashboard)
  const displayUser = user || createdBy;

  // Fallback if displayUser is null/undefined
  if (!displayUser) {
    return (
      <div className="flex items-center justify-center border border-gray-200 rounded-lg p-6 w-lg bg-white shadow text-gray-500">
        User information not available
      </div>
    );
  }
  const { imageUrl, firstName, lastName } = displayUser;

  const mood = moodOptions.find((option) => option.value === score);

  return (
    <div className="flex items-start gap-6 border border-gray-200 rounded-lg p-6 w-full max-w-md bg-white shadow">
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        className="w-20 h-20 rounded-full object-cover bg-gray-100"
      />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-y-3">
          <div className="font-semibold text-left">Name:</div>
          <div className="text-left">
            {firstName} {lastName}
          </div>
          <div className="font-semibold text-left">Date:</div>
          <div className="text-left">{userFacingDate(date)}</div>
          <div className="font-semibold text-left">Today's mood:</div>
          <div className="text-left">{mood ? mood.emoji : ""}</div>
          <div className="font-semibold text-left">Note:</div>
          <div className="text-left">{note}</div>
        </div>
      </div>
    </div>
  );
}

export { MoodEntryCard };
