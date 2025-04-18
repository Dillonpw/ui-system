import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { useDesignStore } from "@/lib/design-store";
import { getContrastTextColor } from "../lib/color-utils";

const shadeValues = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
type ShadeNumber = (typeof shadeValues)[number];

export function ColorCustomizer() {
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
