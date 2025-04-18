import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/design-store";
import { PreviewCard } from "./PreviewCard";

export function TypographyCustomizer() {
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

  const [selectedFontFamily, setSelectedFontFamily] = useState(
    tokens.typography.fontFamily || fontFamilies[0].value,
  );

  // Update font family when it changes
  useEffect(() => {
    const matchingFont = fontFamilies.find(
      (font) => font.value === tokens.typography.fontFamily,
    );
    if (matchingFont) {
      setSelectedFontFamily(matchingFont.value);
    }
  }, [tokens.typography.fontFamily]);

  // Update font family in store
  useEffect(() => {
    updateTypography("fontFamily", "", selectedFontFamily);
  }, [selectedFontFamily, updateTypography]);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Font Family</Label>
          <div className="grid grid-cols-3 gap-2">
            {fontFamilies.map((font) => (
              <Button
                key={font.name}
                variant={
                  selectedFontFamily === font.value ? "default" : "outline"
                }
                onClick={() => {
                  setSelectedFontFamily(font.value);
                }}
                className="h-8"
                style={{
                  fontFamily: font.value,
                  borderRadius: tokens.radius[selectedRadius],
                }}
              >
                {font.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Font Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontSize).map(([size]) => (
              <Button
                key={size}
                variant={selectedFontSize === size ? "default" : "outline"}
                onClick={() => setSelectedFontSize(size)}
                className="h-8"
                style={{ borderRadius: tokens.radius[selectedRadius] }}
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
          />
        </div>

        <div className="space-y-2">
          <Label>Font Weight</Label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(tokens.typography.fontWeight).map(([weight]) => (
              <Button
                key={weight}
                variant={selectedFontWeight === weight ? "default" : "outline"}
                onClick={() => setSelectedFontWeight(weight)}
                className="h-8"
                style={{ borderRadius: tokens.radius[selectedRadius] }}
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
          />
        </div>
      </div>

      <PreviewCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-md border p-4">
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: selectedFontFamily,
                }}
                className="mb-2"
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p
                style={{
                  fontSize: tokens.typography.fontSize[selectedFontSize],
                  fontWeight: tokens.typography.fontWeight[selectedFontWeight],
                  fontFamily: selectedFontFamily,
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              {selectedFontFamily.includes("Mono") && (
                <p
                  style={{
                    fontSize: tokens.typography.fontSize[selectedFontSize],
                    fontWeight:
                      tokens.typography.fontWeight[selectedFontWeight],
                    fontFamily: selectedFontFamily,
                  }}
                  className="mt-2"
                >
                  0123456789
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs">Current Font</Label>
                <p className="text-muted-foreground text-sm">
                  {fontFamilies.find((f) => f.value === selectedFontFamily)
                    ?.name || "Custom"}
                </p>
              </div>
              <div>
                <Label className="text-xs">Current Size</Label>
                <p className="text-muted-foreground text-sm">
                  {tokens.typography.fontSize[selectedFontSize]}
                </p>
              </div>
              <div>
                <Label className="text-xs">Current Weight</Label>
                <p className="text-muted-foreground text-sm">
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
