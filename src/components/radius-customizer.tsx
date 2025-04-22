import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { DesignPreview } from "@/components/design-preview";
import { getContrastTextColor } from "@/lib/color-utils";

export default function RadiusCustomizer() {
  const {
    tokens,
    updateRadius,
    selectedRadius,
    setSelectedRadius,
    selectedShadow,
    resetRadius,
  } = useDesignStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius", tokens.radius[selectedRadius]);
  }, [tokens.radius, selectedRadius]);

  return (
    <div
      className="space-y-6"
      style={{ color: getContrastTextColor(tokens.colors.card) }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label style={{ color: "inherit" }}>Border Radius</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetRadius}
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
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(tokens.radius).map(([size]) => (
              <Button
                key={size}
                variant={selectedRadius === size ? "default" : "outline"}
                onClick={() =>
                  setSelectedRadius(size as keyof typeof tokens.radius)
                }
                className="h-8"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  ...(selectedRadius !== size
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
            value={tokens.radius[selectedRadius]}
            onChange={(e) => updateRadius(selectedRadius, e.target.value)}
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
