function getSmartSummary(avg) {
  if (avg >= 1.0 && avg <= 1.4) {
    return "Your team is deeply struggling. It’s time to check in—privately and supportively. Even a small gesture of empathy can mean a lot right now. ❤️‍🩹";
  }
  if (avg >= 1.5 && avg <= 2.4) {
    return "Morale is low. Consider asking how your team is feeling in a 1:1 or anonymous check-in. Transparency and active listening go a long way. 🔎";
  }
  if (avg >= 2.5 && avg <= 3.4) {
    return "Your team is in a neutral state. This could mean things feel “just okay” — a good chance to nudge positivity with appreciation or a light team ritual. 🧘";
  }
  if (avg >= 3.5 && avg <= 4.4) {
    return "Team mood is positive. Nice! Maintain this by recognizing wins and keeping the communication open and inclusive. 🤗";
  }
  if (avg >= 4.5 && avg <= 5.0) {
    return "Your team is thriving. Celebrate the energy! Consider sharing their vibes with others — it could boost company-wide morale. 🚀";
  }
  return null;
}

export function SmartSummary({ avg }) {
  const summary = getSmartSummary(avg);
  if (!summary) return null;
  return (
    <div className="p-6 bg-gray-50 rounded shadow text-center border border-gray-200">
      <h4 className="text-lg font-bold mb-2 text-gray-700">Mood Summary 🔮</h4>
      <div className="text-gray-700">{summary}</div>
    </div>
  );
}
