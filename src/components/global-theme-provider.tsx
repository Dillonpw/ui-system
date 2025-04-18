import { useEffect } from "react";
import { useDesignStore } from "@/lib/design-store";
import { getContrastTextColor } from "@/lib/color-utils";



export function GlobalThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    tokens,
    selectedRadius,
    selectedShadow,
    selectedFontSize,
    selectedFontWeight,
  } = useDesignStore();

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--font-family", tokens.typography.fontFamily);

    Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
      root.style.setProperty(`--font-size-${size}`, value);
    });

    Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
      root.style.setProperty(`--font-weight-${weight}`, value.toString());
    });

    root.style.setProperty(
      "--font-size-base",
      tokens.typography.fontSize[selectedFontSize],
    );
    root.style.setProperty(
      "--font-weight-normal",
      tokens.typography.fontWeight[selectedFontWeight].toString(),
    );

    document.body.style.fontFamily = tokens.typography.fontFamily;
    document.body.style.fontSize = tokens.typography.fontSize[selectedFontSize];
    document.body.style.fontWeight =
      tokens.typography.fontWeight[selectedFontWeight].toString();

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

    Object.entries(tokens.radius).forEach(([size, value]) => {
      root.style.setProperty(`--radius-${size}`, value);
    });

    Object.entries(tokens.shadows).forEach(([size, value]) => {
      root.style.setProperty(`--shadow-${size}`, value);
    });

    root.style.setProperty("--radius", tokens.radius.md);
    root.style.setProperty("--shadow", tokens.shadows.md);

    root.style.setProperty("--radius-default", tokens.radius[selectedRadius]);
    root.style.setProperty("--shadow-default", tokens.shadows[selectedShadow]);
  }, [
    tokens,
    selectedRadius,
    selectedShadow,
    selectedFontSize,
    selectedFontWeight,
  ]);

  return <>{children}</>;
}
