import type { DesignTokens } from "@/lib/design-store";

export function generateTailwind(tokens: DesignTokens) {
  const config = {
    theme: {
      extend: {
        colors: {
          primary: Object.entries(tokens.colors.primary).reduce<
            Record<string, string>
          >(
            (acc, [shade, value]) => ({
              ...acc,
              [shade]: value,
            }),
            {},
          ),
          secondary: Object.entries(tokens.colors.secondary).reduce<
            Record<string, string>
          >(
            (acc, [shade, value]) => ({
              ...acc,
              [shade]: value,
            }),
            {},
          ),
          accent: Object.entries(tokens.colors.accent).reduce<
            Record<string, string>
          >(
            (acc, [shade, value]) => ({
              ...acc,
              [shade]: value,
            }),
            {},
          ),
          muted: Object.entries(tokens.colors.muted).reduce<
            Record<string, string>
          >(
            (acc, [shade, value]) => ({
              ...acc,
              [shade]: value,
            }),
            {},
          ),
          "page-background": tokens.colors.page,
        },
        fontSize: tokens.typography.fontSize,
        fontWeight: tokens.typography.fontWeight,
        borderRadius: tokens.radius,
        boxShadow: tokens.shadows,
      },
    },
  };

  return `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)}`;
}

export function generateCSSVariables(tokens: DesignTokens) {
  let css = ":root {\n";

  Object.entries(tokens.colors).forEach(([palette, shades]) => {
    if (typeof shades === "object") {
      Object.entries(shades).forEach(([shade, value]) => {
        css += `  --${palette}-${shade}: ${value};\n`;
      });
    }
  });

  Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
    css += `  --font-size-${size}: ${value};\n`;
  });

  Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
    css += `  --font-weight-${weight}: ${value};\n`;
  });

  Object.entries(tokens.radius).forEach(([size, value]) => {
    css += `  --radius-${size}: ${value};\n`;
  });

  Object.entries(tokens.shadows).forEach(([size, value]) => {
    css += `  --shadow-${size}: ${value};\n`;
  });

  css += "}";
  return css;
}
