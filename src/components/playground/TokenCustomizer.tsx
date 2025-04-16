import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/design-store";

import { ColorPicker } from "@/components/ui/color-picker";
import { useState, useEffect } from "react";
import type { DesignTokens } from "@/lib/design-store";

const shadeValues = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
type ShadeNumber = (typeof shadeValues)[number];

function getContrastTextColor(color: string) {
  // Handle OKLCH colors
  if (color.startsWith("oklch(")) {
    // Extract lightness value from OKLCH
    const match = color.match(/oklch\(([\d.]+)/);
    if (match) {
      const lightness = Number.parseFloat(match[1]);
      // Return white for dark colors (lightness < 0.5), black for light colors
      return lightness < 0.5 ? "#ffffff" : "#000000";
    }
  }

  // Handle hex colors (fallback)
  const hexColor = color.replace("#", "");
  const r = Number.parseInt(hexColor.substr(0, 2), 16);
  const g = Number.parseInt(hexColor.substr(2, 2), 16);
  const b = Number.parseInt(hexColor.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

function PreviewCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-card border-2 p-6 ${className}`}
      style={{
        borderRadius: "0.5rem", // Fixed border radius for preview
        boxShadow: "var(--shadow-default)",
      }}
    >
      {children}
    </div>
  );
}

function ColorCustomizer() {
  const { tokens, updateColor } = useDesignStore();
  const [selectedShade, setSelectedShade] = useState<ShadeNumber>(500);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Color Palette</h2>
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <Label>Shade:</Label>
          {shadeValues.map((shade) => (
            <Button
              key={shade}
              variant={selectedShade === shade ? "default" : "outline"}
              onClick={() => setSelectedShade(shade)}
              className="h-8 w-12"
              size="sm"
            >
              {shade}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <ColorPicker
            label="Primary Color"
            color={tokens.colors.primary[selectedShade]}
            onChange={(value) =>
              updateColor("primary", selectedShade.toString(), value)
            }
          />
        </div>

        <div>
          <ColorPicker
            label="Secondary Color"
            color={tokens.colors.secondary[selectedShade]}
            onChange={(value) =>
              updateColor("secondary", selectedShade.toString(), value)
            }
          />
        </div>

        <div>
          <ColorPicker
            label="Accent Color"
            color={tokens.colors.accent[selectedShade]}
            onChange={(value) =>
              updateColor("accent", selectedShade.toString(), value)
            }
          />
        </div>
      </div>

      <div className="space-y-6 border-t pt-6">
        <h3 className="text-lg font-semibold">Semantic Colors</h3>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <ColorPicker
              label="Background"
              color={tokens.colors.background}
              onChange={(value) => updateColor("background", "", value)}
            />
          </div>
          <div>
            <ColorPicker
              label="Foreground"
              color={tokens.colors.foreground}
              onChange={(value) => updateColor("foreground", "", value)}
            />
          </div>
          <div>
            <ColorPicker
              label="Card"
              color={tokens.colors.card}
              onChange={(value) => updateColor("card", "", value)}
            />
          </div>
        </div>

        <div className="grid gap-8 border-b-2 pb-4 md:grid-cols-3">
          <div>
            <ColorPicker
              label="Success"
              color={tokens.colors.success}
              onChange={(value) => updateColor("success", "", value)}
            />
          </div>
          <div>
            <ColorPicker
              label="Warning"
              color={tokens.colors.warning}
              onChange={(value) => updateColor("warning", "", value)}
            />
          </div>
          <div>
            <ColorPicker
              label="Info"
              color={tokens.colors.info}
              onChange={(value) => updateColor("info", "", value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div
            className="flex h-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: tokens.colors.background,
              color: getContrastTextColor(tokens.colors.background),
            }}
          >
            Background
          </div>
          <div
            className="flex h-12 items-center justify-center rounded-lg border"
            style={{
              backgroundColor: tokens.colors.card,
              color: getContrastTextColor(tokens.colors.card),
            }}
          >
            Card
          </div>
          <div
            className="flex h-12 items-center justify-center rounded-lg border"
            style={{
              backgroundColor: tokens.colors.foreground,
              color: getContrastTextColor(tokens.colors.foreground),
            }}
          >
            Foreground
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div
            className="flex h-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: tokens.colors.success,
              color: getContrastTextColor(tokens.colors.success),
            }}
          >
            Success
          </div>
          <div
            className="flex h-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: tokens.colors.warning,
              color: getContrastTextColor(tokens.colors.warning),
            }}
          >
            Warning
          </div>
          <div
            className="flex h-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: tokens.colors.info,
              color: getContrastTextColor(tokens.colors.info),
            }}
          >
            Info
          </div>
        </div>
      </div>

      <div className="bg-card mt-6 rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Preview</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Button
                className="w-full"
                style={{
                  backgroundColor: tokens.colors.primary[selectedShade],
                  color: getContrastTextColor(
                    tokens.colors.primary[selectedShade],
                  ),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Primary Button
              </Button>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.primary[100],
                  color: getContrastTextColor(tokens.colors.primary[100]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Light
              </div>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.primary[950],
                  color: getContrastTextColor(tokens.colors.primary[950]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Dark
              </div>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                style={{
                  backgroundColor: tokens.colors.secondary[selectedShade],
                  color: getContrastTextColor(
                    tokens.colors.secondary[selectedShade],
                  ),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Secondary Button
              </Button>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.secondary[100],
                  color: getContrastTextColor(tokens.colors.secondary[100]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Light
              </div>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.secondary[950],
                  color: getContrastTextColor(tokens.colors.secondary[950]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Dark
              </div>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                style={{
                  backgroundColor: tokens.colors.accent[selectedShade],
                  color: getContrastTextColor(
                    tokens.colors.accent[selectedShade],
                  ),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Accent Button
              </Button>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.accent[100],
                  color: getContrastTextColor(tokens.colors.accent[100]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Light
              </div>
              <div
                className="flex h-12 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: tokens.colors.accent[950],
                  color: getContrastTextColor(tokens.colors.accent[950]),
                  borderRadius: "var(--radius-default)",
                  boxShadow: "var(--shadow-default)",
                }}
              >
                Dark
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyCustomizer() {
  const {
    tokens,
    updateTypography,
    selectedFontSize,
    selectedFontWeight,
    setSelectedFontSize,
    setSelectedFontWeight,
    selectedRadius,
  } = useDesignStore();

  const fontFamilies = [
    { name: "Inter", value: "Inter, system-ui, sans-serif" },
    { name: "Roboto", value: "Roboto, system-ui, sans-serif" },
    { name: "Open Sans", value: "'Open Sans', system-ui, sans-serif" },
    { name: "Lato", value: "Lato, system-ui, sans-serif" },
    { name: "Montserrat", value: "Montserrat, system-ui, sans-serif" },
    { name: "Roboto Mono", value: "'Roboto Mono', monospace" },
  ];

  const [selectedFontFamily, setSelectedFontFamily] = useState(
    tokens.typography.fontFamily || fontFamilies[0].value,
  );

  // Update font family when it changes
  useEffect(() => {
    const matchingFont = fontFamilies.find(
      (font) => font.value === tokens.typography.fontFamily,
    );
    if (matchingFont) {
      setSelectedFontFamily(matchingFont.value);
    }
  }, [tokens.typography.fontFamily]);

  // Update font family in store
  useEffect(() => {
    updateTypography("fontFamily", "", selectedFontFamily);
  }, [selectedFontFamily, updateTypography]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Font Family</Label>
          <div className="grid grid-cols-3 gap-2">
            {fontFamilies.map((font) => (
              <Button
                key={font.name}
                variant={
                  selectedFontFamily === font.value ? "default" : "outline"
                }
                onClick={() => {
                  setSelectedFontFamily(font.value);
                }}
                className="h-8"
                style={{
                  fontFamily: font.value,
                  borderRadius: tokens.radius[selectedRadius],
                }}
              >
                {font.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Font Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontSize).map(([size]) => (
              <Button
                key={size}
                variant={selectedFontSize === size ? "default" : "outline"}
                onClick={() => setSelectedFontSize(size)}
                className="h-8"
                style={{ borderRadius: tokens.radius[selectedRadius] }}
              >
                {size}
              </Button>
            ))}
          </div>
          <Input
            value={tokens.typography.fontSize[selectedFontSize] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              updateTypography("fontSize", selectedFontSize, value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Font Weight</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontWeight).map(([weight]) => (
              <Button
                key={weight}
                variant={selectedFontWeight === weight ? "default" : "outline"}
                onClick={() => setSelectedFontWeight(weight)}
                className="h-8"
                style={{ borderRadius: tokens.radius[selectedRadius] }}
              >
                {weight}
              </Button>
            ))}
          </div>
          <Input
            value={tokens.typography.fontWeight[selectedFontWeight] || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              updateTypography("fontWeight", selectedFontWeight, value);
            }}
          />
        </div>
      </div>

      <PreviewCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-md border p-4">
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: selectedFontFamily,
                }}
                className="mb-2"
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: selectedFontFamily,
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              {selectedFontFamily.includes("Mono") && (
                <p
                  style={{
                    fontSize: tokens.typography.fontSize[selectedFontSize],
                    fontWeight:
                      tokens.typography.fontWeight[selectedFontWeight],
                    fontFamily: selectedFontFamily,
                  }}
                  className="mt-2"
                >
                  0123456789
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs">Current Font</Label>
                <p className="text-muted-foreground text-sm">
                  {fontFamilies.find((f) => f.value === selectedFontFamily)
                    ?.name || "Custom"}
                </p>
              </div>
              <div>
                <Label className="text-xs">Current Size</Label>
                <p className="text-muted-foreground text-sm">
                  {tokens.typography.fontSize[selectedFontSize]}
                </p>
              </div>
              <div>
                <Label className="text-xs">Current Weight</Label>
                <p className="text-muted-foreground text-sm">
                  {tokens.typography.fontWeight[selectedFontWeight]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

function RadiusCustomizer() {
  const { tokens, updateRadius, selectedRadius, setSelectedRadius } =
    useDesignStore();

  // Apply the selected radius globally when it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius", tokens.radius[selectedRadius]);
  }, [tokens.radius, selectedRadius]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Border Radius</Label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(tokens.radius).map(([size]) => (
              <Button
                key={size}
                variant={selectedRadius === size ? "default" : "outline"}
                onClick={() =>
                  setSelectedRadius(size as keyof typeof tokens.radius)
                }
                className="h-8"
              >
                {size}
              </Button>
            ))}
          </div>
          <Input
            value={tokens.radius[selectedRadius]}
            onChange={(e) => updateRadius(selectedRadius, e.target.value)}
          />
        </div>
      </div>

      <PreviewCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="grid gap-4">
            <div
              className="bg-primary/20 h-20"
              style={{
                borderRadius: tokens.radius[selectedRadius],
              }}
            />
            <Button
              className="w-full"
              style={{
                borderRadius: tokens.radius[selectedRadius],
              }}
            >
              Button Example
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <div
                className="bg-secondary/20 h-12"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                }}
              />
              <div
                className="bg-accent/20 h-12"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                }}
              />
              <div
                className="bg-destructive/20 h-12"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                }}
              />
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

function ShadowCustomizer() {
  const { tokens, updateShadow, selectedShadow, setSelectedShadow } =
    useDesignStore();

  // Apply the selected shadow globally when it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--shadow", tokens.shadows[selectedShadow]);
  }, [tokens.shadows, selectedShadow]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Shadow Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.shadows).map(([size]) => (
              <Button
                key={size}
                variant={selectedShadow === size ? "default" : "outline"}
                onClick={() =>
                  setSelectedShadow(size as keyof typeof tokens.shadows)
                }
                className="h-8"
              >
                {size}
              </Button>
            ))}
          </div>
          <Input
            value={tokens.shadows[selectedShadow]}
            onChange={(e) => updateShadow(selectedShadow, e.target.value)}
          />
        </div>
      </div>

      <PreviewCard className="bg-background">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="grid gap-4">
            <div
              className="bg-card h-20 rounded-lg"
              style={{
                boxShadow: tokens.shadows[selectedShadow],
              }}
            />
            <div className="grid grid-cols-3 gap-2">
              <div
                className="bg-card h-12 rounded-lg"
                style={{
                  boxShadow: tokens.shadows[selectedShadow],
                }}
              />
              <div
                className="bg-card h-12 rounded-lg"
                style={{
                  boxShadow: tokens.shadows[selectedShadow],
                }}
              />
              <div
                className="bg-card h-12 rounded-lg"
                style={{
                  boxShadow: tokens.shadows[selectedShadow],
                }}
              />
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

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

interface TokenCustomizerProps {
  defaultTab?: "colors" | "typography" | "radius" | "shadows" | "export";
}

export function TokenCustomizer({
  defaultTab = "colors",
}: TokenCustomizerProps) {
  const { resetTokens } = useDesignStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Design System Customizer</CardTitle>
            <CardDescription>
              Customize your design tokens and see live previews
            </CardDescription>
          </div>
          <Button variant="outline" onClick={resetTokens}>
            Reset to Defaults
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {defaultTab === "colors" && <ColorCustomizer />}
        {defaultTab === "typography" && <TypographyCustomizer />}
        {defaultTab === "radius" && <RadiusCustomizer />}
        {defaultTab === "shadows" && <ShadowCustomizer />}
      </CardContent>
    </Card>
  );
}
