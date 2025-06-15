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
import { useEffect, useRef, useState } from "react";
import { useContainerWidth } from "../hooks/useContainerWidth";

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
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

  // Responsive tick renderer for XAxis using custom hook
  const [containerRef, containerWidth] = useContainerWidth();

  const renderCustomTick = (props) => {
    const { x, y, payload } = props;
    // Rotate and shrink font if container is narrow (mobile)
    const isMobile = containerWidth < 500;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor={isMobile ? "end" : "middle"}
          fill="#666"
          fontSize={isMobile ? 10 : 14}
          transform={isMobile ? "rotate(-45)" : ""}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full max-w-[600px] overflow-x-auto" ref={containerRef}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 60, left: 20, bottom: 45 }}
        >
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            strokeWidth={4}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="displayDate"
            interval={0}
            tickLine={true}
            tick={renderCustomTick}
          />
          <YAxis domain={[1, 5]} tickFormatter={emojiTickFormatter} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export { WeeklyMoodChart };
