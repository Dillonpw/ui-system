import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { PreviewCard } from "@/components/preview-card";
import { getContrastTextColor } from "@/lib/color-utils";

export default function TypographyCustomizer() {
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

  return (
    <div
      className="space-y-6"
      style={{ color: getContrastTextColor(tokens.colors.card) }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label style={{ color: "inherit" }}>Font Family</Label>
          <div className="grid grid-cols-3 gap-2">
            {fontFamilies.map((font) => (
              <Button
                key={font.name}
                variant={
                  tokens.typography.fontFamily === font.value
                    ? "default"
                    : "outline"
                }
                onClick={() => {
                  updateTypography("fontFamily", "", font.value);
                }}
                className="h-8"
                style={{
                  fontFamily: font.value,
                  borderRadius: tokens.radius[selectedRadius],
                  ...(tokens.typography.fontFamily !== font.value
                    ? {
                        color: getContrastTextColor(tokens.colors.card),
                        borderColor: getContrastTextColor(tokens.colors.card),
                        backgroundColor: "transparent",
                      }
                    : {
                        backgroundColor: getContrastTextColor(
                          tokens.colors.card,
                        ),
                        color: tokens.colors.card,
                      }),
                }}
              >
                {font.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label style={{ color: "inherit" }}>Font Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontSize).map(([size]) => (
              <Button
                key={size}
                variant={selectedFontSize === size ? "default" : "outline"}
                onClick={() => setSelectedFontSize(size)}
                className="h-8"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  ...(selectedFontSize !== size
                    ? {
                        color: getContrastTextColor(tokens.colors.card),
                        borderColor: getContrastTextColor(tokens.colors.card),
                        backgroundColor: "transparent",
                      }
                    : {
                        backgroundColor: getContrastTextColor(
                          tokens.colors.card,
                        ),
                        color: tokens.colors.card,
                      }),
                }}
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
            style={{
              color: getContrastTextColor(tokens.colors.card),
              borderColor: getContrastTextColor(tokens.colors.card),
            }}
          />
        </div>

        <div className="space-y-2">
          <Label style={{ color: "inherit" }}>Font Weight</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontWeight).map(([weight]) => (
              <Button
                key={weight}
                variant={selectedFontWeight === weight ? "default" : "outline"}
                onClick={() => setSelectedFontWeight(weight)}
                className="h-8"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  ...(selectedFontWeight !== weight
                    ? {
                        color: getContrastTextColor(tokens.colors.card),
                        borderColor: getContrastTextColor(tokens.colors.card),
                        backgroundColor: "transparent",
                      }
                    : {
                        backgroundColor: getContrastTextColor(
                          tokens.colors.card,
                        ),
                        color: tokens.colors.card,
                      }),
                }}
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
            style={{
              color: getContrastTextColor(tokens.colors.card),
              borderColor: getContrastTextColor(tokens.colors.card),
            }}
          />
        </div>
      </div>

      <PreviewCard>
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold"
            style={{ color: getContrastTextColor(tokens.colors.card) }}
          >
            Preview
          </h3>
          <div className="space-y-4">
            <div
              className="rounded-md border p-4"
              style={{
                backgroundColor: tokens.colors.muted[200],
                borderColor: getContrastTextColor(tokens.colors.muted[200]),
              }}
            >
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: tokens.typography.fontFamily,
                  color: getContrastTextColor(tokens.colors.muted[200]),
                }}
                className="mb-2"
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: tokens.typography.fontFamily,
                  color: getContrastTextColor(tokens.colors.muted[200]),
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              {tokens.typography.fontFamily.includes("Mono") && (
                <p
                  style={{
                    fontSize: tokens.typography.fontSize[selectedFontSize],
                    fontWeight:
                      tokens.typography.fontWeight[selectedFontWeight],
                    fontFamily: tokens.typography.fontFamily,
                    color: getContrastTextColor(tokens.colors.muted[200]),
                  }}
                  className="mt-2"
                >
                  0123456789
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label
                  className="text-xs"
                  style={{ color: getContrastTextColor(tokens.colors.card) }}
                >
                  Current Font
                </Label>
                <p
                  className="text-sm"
                  style={{
                    color: getContrastTextColor(tokens.colors.card),
                    opacity: 0.8,
                  }}
                >
                  {fontFamilies.find(
                    (f) => f.value === tokens.typography.fontFamily,
                  )?.name || "Custom"}
                </p>
              </div>
              <div>
                <Label
                  className="text-xs"
                  style={{ color: getContrastTextColor(tokens.colors.card) }}
                >
                  Current Size
                </Label>
                <p
                  className="text-sm"
                  style={{
                    color: getContrastTextColor(tokens.colors.card),
                    opacity: 0.8,
                  }}
                >
                  {tokens.typography.fontSize[selectedFontSize]}
                </p>
              </div>
              <div>
                <Label
                  className="text-xs"
                  style={{ color: getContrastTextColor(tokens.colors.card) }}
                >
                  Current Weight
                </Label>
                <p
                  className="text-sm"
                  style={{
                    color: getContrastTextColor(tokens.colors.card),
                    opacity: 0.8,
                  }}
                >
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
