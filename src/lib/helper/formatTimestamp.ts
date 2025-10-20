export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
