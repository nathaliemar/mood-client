import { useState } from "react";
import { moodOptions } from "../utils/moodOptions";

function MoodEntryForm({ onSubmit }) {
  const [mood, setMood] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ mood, comment });
  };

  return (
    <form
      className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-6 md:max-w-2xl"
      onSubmit={handleSubmit}
    >
      {/* Mood selection */}
      <div>
        <label className="block text-lg font-semibold mb-3">
          How are you feeling today?
        </label>
        <div className="flex justify-between items-center gap-2">
          {moodOptions.map((option) => (
            <label
              key={option.value}
              className="flex flex-col items-center flex-1"
            >
              <input
                type="radio"
                name="mood"
                value={option.value}
                checked={mood === option.value}
                onChange={() => setMood(option.value)}
                className="sr-only"
                required
              />
              <span
                className={`
                  flex items-center justify-center
                  w-full h-14
                  border border-gray-300
                  text-3xl
                  transition
                  cursor-pointer
                  select-none
                  rounded-md
                  ${
                    mood === option.value
                      ? "bg-blue-100 border-blue-400 shadow"
                      : "bg-white hover:bg-blue-50 hover:border-blue-300"
                  }
                `}
                title={option.label}
              >
                {option.emoji}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Divider */}
      <hr className="border-t border-gray-200 my-2" />

      {/* Comment box */}
      <div>
        <label className="block font-medium mb-1">
          Leave a comment for your team to see
        </label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-2 bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}

export { MoodEntryForm };
