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
    <div className="flex flex-col border border-gray-200 rounded-lg p-6 w-full max-w-md bg-white shadow h-full">
      <div className="flex items-start gap-4">
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          className="w-14 h-14 rounded-full object-cover bg-gray-100"
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
          </div>
        </div>
      </div>
      {note && (
        <div className="mt-6 w-full">
          <div className="bg-gray-100 rounded p-3 text-left whitespace-pre-line break-words text-gray-700">
            {note}
          </div>
        </div>
      )}
    </div>
  );
}

export { MoodEntryCard };
