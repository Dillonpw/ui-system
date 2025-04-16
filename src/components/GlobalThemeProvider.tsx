import { useEffect } from "react";
import { useDesignStore } from "@/lib/design-store";

function getContrastTextColor(color: string) {
  // Handle OKLCH colors
  if (color.startsWith("oklch(")) {
    // Extract lightness value from OKLCH
    const match = color.match(/oklch\(([\d.]+)/);
    if (match) {
      const lightness = parseFloat(match[1]);
      // Return white for dark colors (lightness < 0.5), black for light colors
      return lightness < 0.5 ? "#ffffff" : "#000000";
    }
  }

  // Handle hex colors (fallback)
  const hexColor = color.replace("#", "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function GlobalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tokens, selectedRadius, selectedShadow } = useDesignStore();

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--font-family", tokens.typography.fontFamily);

    root.style.setProperty("--background", tokens.colors.background);
    root.style.setProperty(
      "--background-text",
      getContrastTextColor(tokens.colors.background),
    );

    root.style.setProperty("--foreground", tokens.colors.foreground);
    root.style.setProperty(
      "--foreground-text",
      getContrastTextColor(tokens.colors.foreground),
    );

    root.style.setProperty("--card-bg", tokens.colors.card);
    root.style.setProperty(
      "--card-text",
      getContrastTextColor(tokens.colors.card),
    );

    root.style.setProperty("--success", tokens.colors.success);
    root.style.setProperty(
      "--success-text",
      getContrastTextColor(tokens.colors.success),
    );

    root.style.setProperty("--warning", tokens.colors.warning);
    root.style.setProperty(
      "--warning-text",
      getContrastTextColor(tokens.colors.warning),
    );

    root.style.setProperty("--info", tokens.colors.info);
    root.style.setProperty(
      "--info-text",
      getContrastTextColor(tokens.colors.info),
    );

    Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
      root.style.setProperty(`--primary-${shade}`, value);
      root.style.setProperty(
        `--primary-${shade}-text`,
        getContrastTextColor(value),
      );
    });

    Object.entries(tokens.colors.secondary).forEach(([shade, value]) => {
      root.style.setProperty(`--secondary-${shade}`, value);
      root.style.setProperty(
        `--secondary-${shade}-text`,
        getContrastTextColor(value),
      );
    });

    Object.entries(tokens.colors.accent).forEach(([shade, value]) => {
      root.style.setProperty(`--accent-${shade}`, value);
      root.style.setProperty(
        `--accent-${shade}-text`,
        getContrastTextColor(value),
      );
    });

    Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
      root.style.setProperty(`--font-size-${size}`, value);
    });

    Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
      root.style.setProperty(`--font-weight-${weight}`, value.toString());
    });

    Object.entries(tokens.radius).forEach(([size, value]) => {
      root.style.setProperty(`--radius-${size}`, value);
    });

    Object.entries(tokens.shadows).forEach(([size, value]) => {
      root.style.setProperty(`--shadow-${size}`, value);
    });

    // Apply default radius and shadow values globally
    root.style.setProperty("--radius", tokens.radius.md);
    root.style.setProperty("--shadow", tokens.shadows.md);

    // Set the selected radius and shadow as the default for all components
    root.style.setProperty("--radius-default", tokens.radius[selectedRadius]);
    root.style.setProperty("--shadow-default", tokens.shadows[selectedShadow]);

    document.body.style.fontFamily = tokens.typography.fontFamily;
  }, [tokens, selectedRadius, selectedShadow]);

  return <>{children}</>;
}
