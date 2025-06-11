import { moodOptions } from "../utils/moodOptions";

function MoodEntryCard({ moodEntry }) {
  const {
    createdBy: { imageUrl, firstName, lastName },
    score,
    note,
  } = moodEntry;
  const mood = moodOptions.find((option) => option.value === score);

  return (
    <div className="flex items-start gap-6 border border-gray-200 rounded-lg p-6 max-w-lg bg-white shadow">
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        className="w-20 h-20 rounded-full object-cover bg-gray-100"
      />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-y-3">
          <div className="font-semibold text-left">First Name:</div>
          <div className="text-left">{firstName}</div>
          <div className="font-semibold text-left">Last Name:</div>
          <div className="text-left">{lastName}</div>
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
