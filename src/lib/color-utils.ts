export function getContrastTextColor(color: string) {
  if (color.startsWith("oklch(")) {
    const match = color.match(/oklch\(([\d.]+)/);
    if (match) {
      const lightness = Number.parseFloat(match[1]);
      return lightness < 0.5 ? "#ffffff" : "#000000";
    }
  }

  const hexColor = color.replace("#", "");
  const r = Number.parseInt(hexColor.substr(0, 2), 16);
  const g = Number.parseInt(hexColor.substr(2, 2), 16);
  const b = Number.parseInt(hexColor.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
