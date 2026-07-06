interface StatCircleProps {
  label: string;
  value: number;
  suffix?: string;
  accent?: "maroon" | "sienna" | "mustard";
}

const ACCENT_COLORS: Record<string, string> = {
  maroon: "#7A1F2B",
  sienna: "#B15C2E",
  mustard: "#E0A526",
};

export default function StatCircle({
  label,
  value,
  suffix = "%",
  accent = "mustard",
}: StatCircleProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const color = ACCENT_COLORS[accent];

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 bg-cream-light p-5 shadow-soft">
      <div className="relative flex h-[110px] w-[110px] items-center justify-center">
        <svg width="110" height="110" viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={radius} stroke="#E7DFD1" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-bold text-maroon">
          {value.toFixed(1)}
          {suffix}
        </span>
      </div>
      <p className="text-center text-sm font-medium text-neutral-700">{label}</p>
    </div>
  );
}
