import { moodOptions } from "../utils/moodOptions";

function AverageMoodComponent({ entries, context }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="p-6 bg-white rounded shadow text-center">
        <h3 className="text-xl font-bold mb-2">Today's average mood</h3>
        <div className="text-gray-500">No entries yet.</div>
      </div>
    );
  }

  const avg =
    entries.reduce((sum, entry) => sum + (entry.score || 0), 0) /
    entries.length;
  const rounded = Math.round(avg);

  const mood = moodOptions.find((m) => m.value === rounded);

  return (
    <div className="p-6 bg-white rounded shadow text-center">
      <h3 className="text-xl font-bold mb-2">{`${context} average mood`}</h3>
      {mood ? (
        <div>
          <div className="text-6xl mb-2">{mood.emoji}</div>
          <div className="text-lg font-semibold">{mood.label}</div>
          <div className="text-gray-500 mt-2">({avg.toFixed(2)} / 5)</div>
        </div>
      ) : (
        <div className="text-gray-500">No mood data</div>
      )}
    </div>
  );
}

export { AverageMoodComponent };
