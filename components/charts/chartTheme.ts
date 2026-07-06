export const CHART_COLORS = {
  maroon: "#7A1F2B",
  sienna: "#B15C2E",
  mustard: "#E0A526",
  gridLine: "#E7DFD1",
  text: "#5C544A",
};

export function shortenLabel(label: string, maxLength = 14): string {
  if (label.length <= maxLength) return label;
  return `${label.slice(0, maxLength - 1)}…`;
}
