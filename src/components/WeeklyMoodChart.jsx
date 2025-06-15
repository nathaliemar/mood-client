import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { userFacingDate } from "../utils/dateUtils";
import { moodOptions } from "../utils/moodOptions";

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const mood = moodOptions.find((opt) => opt.value === entry.score);
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow text-sm">
        <div>
          <strong>Date:</strong> {entry.displayDate}
        </div>
        <div>
          <strong>Mood:</strong>{" "}
          {mood ? `${mood.emoji} ${mood.label}` : entry.score}
        </div>
      </div>
    );
  }
  return null;
};

function WeeklyMoodChart({ entries }) {
  //cut data : last 5 moodentries
  const data = [...entries]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map((entry) => {
      const mood = moodOptions.find((opt) => opt.value === entry.score);
      return {
        ...entry,
        displayDate: userFacingDate(entry.date),
        emoji: mood ? mood.emoji : "",
      };
    })
    .reverse();

  // Formatter for Y axis ticks
  const emojiTickFormatter = (score) => {
    const mood = moodOptions.find((opt) => opt.value === score);
    return mood ? mood.emoji : score;
  };

  return (
    <div className="w-full max-w-[600px] overflow-x-auto">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            strokeWidth={4}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="displayDate" tick={{ dy: 12, fontSize: 14 }} />
          <YAxis domain={[1, 5]} tickFormatter={emojiTickFormatter} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { WeeklyMoodChart };
