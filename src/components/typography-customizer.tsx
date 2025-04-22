import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { DesignPreview } from "@/components/design-preview";
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
    selectedShadow,
    resetFontFamily,
    resetFontSize,
    resetFontWeight,
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
          <div className="flex items-center justify-between">
            <Label style={{ color: "inherit" }}>Font Family</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFontFamily}
              style={{
                color: getContrastTextColor(tokens.colors.card),
                borderColor: getContrastTextColor(tokens.colors.card),
                backgroundColor: "transparent",
                borderRadius: tokens.radius[selectedRadius],
              }}
              className="h-7 px-2 text-xs hover:bg-transparent hover:opacity-80"
            >
              Restore Default
            </Button>
          </div>
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
          <div className="flex items-center justify-between">
            <Label style={{ color: "inherit" }}>Font Size</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFontSize}
              style={{
                color: getContrastTextColor(tokens.colors.card),
                borderColor: getContrastTextColor(tokens.colors.card),
                backgroundColor: "transparent",
                borderRadius: tokens.radius[selectedRadius],
              }}
              className="h-7 px-2 text-xs hover:bg-transparent hover:opacity-80"
            >
              Restore Default
            </Button>
          </div>
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
          <div className="flex items-center justify-between">
            <Label style={{ color: "inherit" }}>Font Weight</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFontWeight}
              style={{
                color: getContrastTextColor(tokens.colors.card),
                borderColor: getContrastTextColor(tokens.colors.card),
                backgroundColor: "transparent",
                borderRadius: tokens.radius[selectedRadius],
              }}
              className="h-7 px-2 text-xs hover:bg-transparent hover:opacity-80"
            >
              Restore Default
            </Button>
          </div>
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

      <DesignPreview
        tokens={tokens}
        selectedRadius={selectedRadius}
        selectedShadow={selectedShadow}
      />
    </div>
  );
}
