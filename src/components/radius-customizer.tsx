import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { PreviewCard } from "@/components/preview-card";

export function RadiusCustomizer() {
  const { tokens, updateRadius, selectedRadius, setSelectedRadius } =
    useDesignStore();

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
