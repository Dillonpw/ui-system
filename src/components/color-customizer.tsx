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

export default function ColorCustomizer() {
  const { tokens, updateColor } = useDesignStore();
  const [selectedShade, setSelectedShade] = useState<ShadeNumber>(500);

  return (
    <div
      className="space-y-4"
      style={{ color: getContrastTextColor(tokens.colors.card) }}
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
              className="h-8 w-12"
              size="sm"
              style={
                selectedShade !== shade
                  ? {
                      color: getContrastTextColor(tokens.colors.card),
                      borderColor: getContrastTextColor(tokens.colors.card),
                      backgroundColor: "transparent",
                    }
                  : {
                      backgroundColor: getContrastTextColor(tokens.colors.card),
                      color: tokens.colors.card,
                    }
              }
            >
              {shade}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <ColorPicker
            label="Primary Color"
            color={tokens.colors.primary[selectedShade]}
            onChange={(value) =>
              updateColor("primary", selectedShade.toString(), value)
            }
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
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
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.primary[selectedShade]}33`,
                color: getContrastTextColor(
                  `${tokens.colors.primary[selectedShade]}33`,
                ),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Secondary Color"
            color={tokens.colors.secondary[selectedShade]}
            onChange={(value) =>
              updateColor("secondary", selectedShade.toString(), value)
            }
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
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
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.secondary[selectedShade]}33`,
                color: getContrastTextColor(
                  `${tokens.colors.secondary[selectedShade]}33`,
                ),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Accent Color"
            color={tokens.colors.accent[selectedShade]}
            onChange={(value) =>
              updateColor("accent", selectedShade.toString(), value)
            }
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
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
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.accent[selectedShade]}33`,
                color: getContrastTextColor(
                  `${tokens.colors.accent[selectedShade]}33`,
                ),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <ColorPicker
            label="Muted Color"
            color={tokens.colors.muted[selectedShade]}
            onChange={(value) =>
              updateColor("muted", selectedShade.toString(), value)
            }
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.muted[selectedShade],
                color: getContrastTextColor(tokens.colors.muted[selectedShade]),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Muted Button
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.muted[selectedShade]}33`,
                color: getContrastTextColor(
                  `${tokens.colors.muted[selectedShade]}33`,
                ),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Foreground"
            color={tokens.colors.foreground}
            onChange={(value) => updateColor("foreground", "", value)}
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.foreground,
                color: getContrastTextColor(tokens.colors.foreground),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Foreground Button
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.foreground}33`,
                color: getContrastTextColor(`${tokens.colors.foreground}33`),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Container Background"
            color={tokens.colors.card}
            onChange={(value) => updateColor("card", "", value)}
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.card,
                color: getContrastTextColor(tokens.colors.card),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Container Background
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.card}33`,
                color: getContrastTextColor(`${tokens.colors.card}33`),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <ColorPicker
            label="Success"
            color={tokens.colors.success}
            onChange={(value) => updateColor("success", "", value)}
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.success,
                color: getContrastTextColor(tokens.colors.success),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Success Button
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.success}33`,
                color: getContrastTextColor(`${tokens.colors.success}33`),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Warning"
            color={tokens.colors.warning}
            onChange={(value) => updateColor("warning", "", value)}
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.warning,
                color: getContrastTextColor(tokens.colors.warning),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Warning Button
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.warning}33`,
                color: getContrastTextColor(`${tokens.colors.warning}33`),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ColorPicker
            label="Info"
            color={tokens.colors.info}
            onChange={(value) => updateColor("info", "", value)}
            labelProps={{
              style: { color: getContrastTextColor(tokens.colors.card) },
            }}
          />
          <div className="space-y-2">
            <Button
              className="w-full"
              style={{
                backgroundColor: tokens.colors.info,
                color: getContrastTextColor(tokens.colors.info),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Info Button
            </Button>
            <div
              className="flex h-12 items-center justify-center"
              style={{
                backgroundColor: `${tokens.colors.info}33`,
                color: getContrastTextColor(`${tokens.colors.info}33`),
                borderRadius: "var(--radius-default)",
                boxShadow: "var(--shadow-default)",
              }}
            >
              Light
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
