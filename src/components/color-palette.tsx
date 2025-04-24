import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDesignStore } from "@/lib/design-store";
import type { DesignTokens } from "@/lib/design-store";
import { getTextColor } from "@/lib/color-utils";

type ColorScaleName = keyof Pick<
  DesignTokens["colors"],
  "primary" | "secondary" | "accent" | "muted"
>;
const colorScales: Record<ColorScaleName, number[]> = {
  primary: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  secondary: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  accent: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  muted: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

function ColorScale({
  name,
  scale,
}: {
  name: ColorScaleName;
  scale: number[];
}) {
  const { tokens } = useDesignStore();

  return (
    <div className="space-y-3">
      <Label className="text-card-text text-xs capitalize">{name}</Label>
      <div className="grid grid-cols-11 gap-2">
        {scale.map((weight) => (
          <div key={weight} className="space-y-1.5">
            <div
              className="flex h-10 w-full items-center justify-center text-base"
              style={{
                backgroundColor: tokens.colors[name][weight.toString()],
                borderRadius: "var(--radius-default)",
                color: getTextColor(
                  tokens.colors[name][weight.toString()],
                  tokens.colors.foreground,
                ),
              }}
            >
              {weight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorPalette() {
  const { tokens } = useDesignStore();

  return (
    <div className="space-y-8">
      <Card
        style={{
          backgroundColor: tokens.colors.card,
          color: getTextColor(tokens.colors.card, tokens.colors.foreground),
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: "inherit" }}>Color Palette</CardTitle>
          <CardDescription style={{ color: "inherit", opacity: 0.8 }}>
            Color scales and semantic colors used throughout the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(colorScales).map(([name, scale]) => (
            <ColorScale
              key={name}
              name={name as ColorScaleName}
              scale={scale}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
