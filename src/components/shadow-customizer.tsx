import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { DesignPreview } from "@/components/design-preview";
import { getContrastTextColor } from "@/lib/color-utils";

export default function ShadowCustomizer() {
  const {
    tokens,
    updateShadow,
    selectedShadow,
    setSelectedShadow,
    selectedRadius,
    resetShadow,
  } = useDesignStore();

  const shadowOptions = [
    "none",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
  ] as const;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--shadow", tokens.shadows[selectedShadow]);
    root.style.setProperty("--shadow-preview", tokens.shadows[selectedShadow]);
  }, [tokens.shadows, selectedShadow]);

  return (
    <div
      className="space-y-6"
      style={{ color: getContrastTextColor(tokens.colors.card) }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label style={{ color: "inherit" }}>Shadow Size</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetShadow}
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
            {shadowOptions.map((size) => (
              <Button
                key={size}
                variant={selectedShadow === size ? "default" : "outline"}
                onClick={() => setSelectedShadow(size)}
                className="h-8"
                style={{
                  borderRadius: tokens.radius[selectedRadius],
                  ...(selectedShadow !== size
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
            value={tokens.shadows[selectedShadow]}
            onChange={(e) => updateShadow(selectedShadow, e.target.value)}
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
