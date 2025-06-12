import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { userFacingDate } from "../utils/dateUtils";
import { moodOptions } from "../utils/moodOptions";

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    const mood = moodOptions.find((opt) => opt.value === entry.score);
    return (
      <div
        style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}
      >
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
    <LineChart width={600} height={400} data={data}>
      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={4} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="displayDate" tick={{ dy: 12, fontSize: 14 }} />
      <YAxis domain={[1, 5]} tickFormatter={emojiTickFormatter} />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
}

export { WeeklyMoodChart };
