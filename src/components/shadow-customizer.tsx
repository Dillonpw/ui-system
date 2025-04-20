import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { PreviewCard } from "@/components/preview-card";

export default function ShadowCustomizer() {
  const { tokens, updateShadow, selectedShadow, setSelectedShadow } =
    useDesignStore();

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
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Shadow Size</Label>
          <div className="grid grid-cols-4 gap-2">
            {shadowOptions.map((size) => (
              <Button
                key={size}
                variant={selectedShadow === size ? "default" : "outline"}
                onClick={() => setSelectedShadow(size)}
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
              className="bg-card border-muted h-20 rounded-lg border"
              style={{
                boxShadow: "var(--shadow-preview)",
              }}
            />
            <div className="grid grid-cols-3 gap-2">
              <div
                className="bg-card border-muted h-12 rounded-lg border"
                style={{
                  boxShadow: "var(--shadow-preview)",
                }}
              />
              <div
                className="bg-card border-muted h-12 rounded-lg border"
                style={{
                  boxShadow: "var(--shadow-preview)",
                }}
              />
              <div
                className="bg-card border-muted h-12 rounded-lg border"
                style={{
                  boxShadow: "var(--shadow-preview)",
                }}
              />
            </div>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}
