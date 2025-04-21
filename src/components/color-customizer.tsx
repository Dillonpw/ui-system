import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { useDesignStore } from "@/lib/design-store";
import { getTextColor } from "../lib/color-utils";
import { defaultTokens } from "../lib/default-tokens";
import type { DesignTokens } from "@/lib/design-store";

const shadeValues = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
type ShadeNumber = (typeof shadeValues)[number];

const SHADED_COLORS = [
  { key: "primary", label: "Primary Color" },
  { key: "secondary", label: "Secondary Color" },
  { key: "accent", label: "Accent Color" },
  { key: "muted", label: "Muted Color" },
] as const;

const SINGLE_COLORS = [
  { key: "foreground", label: "Foreground" },
  { key: "card", label: "Container" },
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
] as const;

export default function ColorCustomizer() {
  const { tokens, updateColor } = useDesignStore();
  const [selectedShade, setSelectedShade] = useState<ShadeNumber>(500);

  const restoreColor = (
    colorKey: keyof DesignTokens["colors"],
    shade?: string,
  ) => {
    const defaultColor = defaultTokens.colors[colorKey];
    if (shade && typeof defaultColor !== "string") {
      updateColor(
        colorKey,
        shade,
        defaultColor[shade as keyof typeof defaultColor],
      );
    } else if (!shade && typeof defaultColor === "string") {
      updateColor(colorKey, "", defaultColor);
    }
  };

  const renderColorPicker = (
    colorKey: keyof DesignTokens["colors"],
    label: string,
    hasShades: boolean = false,
  ) => {
    const color = hasShades
      ? tokens.colors[colorKey][selectedShade].toString()
      : tokens.colors[colorKey].toString();

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-start gap-2">
            <Label
              style={{
                color: getTextColor(
                  tokens.colors.card,
                  tokens.colors.foreground,
                ),
              }}
            >
              {label}
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                restoreColor(
                  colorKey,
                  hasShades ? selectedShade.toString() : undefined,
                )
              }
              style={{
                color: getTextColor(
                  tokens.colors.card,
                  tokens.colors.foreground,
                ),
                borderColor: getTextColor(
                  tokens.colors.card,
                  tokens.colors.foreground,
                ),
                backgroundColor: "transparent",
                borderRadius: "var(--radius-default)",
              }}
            >
              Restore
            </Button>
          </div>
          <ColorPicker
            color={color}
            onChange={(value) =>
              updateColor(
                colorKey,
                hasShades ? selectedShade.toString() : "",
                value,
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Button
            className="mx-auto block w-full max-w-[316px]"
            style={{
              backgroundColor: color,
              color: getTextColor(color, tokens.colors.foreground),
              borderRadius: "var(--radius-default)",
              boxShadow: "var(--shadow-default)",
            }}
          >
            {label}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="space-y-4"
      style={{
        color: getTextColor(tokens.colors.card, tokens.colors.foreground),
      }}
    >
      <h2 className="text-lg font-semibold" style={{ color: "inherit" }}>
        Colors
      </h2>
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <Label style={{ color: "inherit" }}>Shade:</Label>
          {shadeValues.map((shade) => (
            <Button
              key={shade}
              variant={selectedShade === shade ? "default" : "outline"}
              onClick={() => setSelectedShade(shade)}
              className="h-8 w-12 sm:w-10"
              size="sm"
              style={
                selectedShade !== shade
                  ? {
                      color: getTextColor(
                        tokens.colors.card,
                        tokens.colors.foreground,
                      ),
                      borderColor: getTextColor(
                        tokens.colors.card,
                        tokens.colors.foreground,
                      ),
                      backgroundColor: "transparent",
                      borderRadius: "var(--radius-default)",
                    }
                  : {
                      backgroundColor: getTextColor(
                        tokens.colors.card,
                        tokens.colors.foreground,
                      ),
                      color: tokens.colors.card,
                      borderRadius: "var(--radius-default)",
                    }
              }
            >
              {shade}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {SHADED_COLORS.map(({ key, label }) => (
          <div key={key}>
            {renderColorPicker(
              key as keyof DesignTokens["colors"],
              label,
              true,
            )}
          </div>
        ))}
        {SINGLE_COLORS.map(({ key, label }) => (
          <div key={key}>
            {renderColorPicker(key as keyof DesignTokens["colors"], label)}
          </div>
        ))}
      </div>
    </div>
  );
}
