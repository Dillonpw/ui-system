import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/design-store";
import { getTextColor } from "@/lib/color-utils";
import ColorCustomizer from "./color-customizer";
import TypographyCustomizer from "./typography-customizer";
import RadiusCustomizer from "./radius-customizer";
import ShadowCustomizer from "./shadow-customizer";

interface DesignCustomizerProps {
  defaultTab?: "colors" | "typography" | "radius" | "shadows" | "export";
}

export function DesignCustomizer({
  defaultTab = "colors",
}: DesignCustomizerProps) {
  const { resetTokens, tokens } = useDesignStore();
  const { selectedRadius, selectedFontSize, selectedFontWeight } =
    useDesignStore((state) => ({
      selectedRadius: state.selectedRadius,
      selectedFontSize: state.selectedFontSize,
      selectedFontWeight: state.selectedFontWeight,
    }));

  return (
    <Card
      style={{
        backgroundColor: tokens.colors.card,
        color: getTextColor(tokens.colors.card, tokens.colors.foreground),
      }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle style={{ color: "inherit" }}>
              Design System Customizer
            </CardTitle>
            <CardDescription style={{ color: "inherit", opacity: 0.8 }}>
              Customize your design system and see live previews
              <br />
              <br />
              <div className="flex gap-2">
                <p className="text-muted-foreground text-xs">
                  <span className="font-bold">Your Colors:</span>
                  {Object.entries(tokens.colors).map(([key, value]) => (
                    <p key={key}>
                      {key}: {typeof value === "object" ? value["500"] : value}
                    </p>
                  ))}
                </p>
                <p className="text-muted-foreground text-xs">
                  <span className="font-bold">Your Typography:</span>
                  <p>fontFamily: {tokens.typography.fontFamily}</p>
                  <p>
                    fontSize ({selectedFontSize}):{" "}
                    {tokens.typography.fontSize[selectedFontSize]}
                  </p>
                  <p>
                    fontWeight ({selectedFontWeight}):{" "}
                    {tokens.typography.fontWeight[selectedFontWeight]}
                  </p>
                </p>
                <p className="text-muted-foreground text-xs">
                  <span className="font-bold">Your Radius:</span>
                  <p>
                    {selectedRadius}: {tokens.radius[selectedRadius]}
                  </p>
                </p>
              </div>
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={resetTokens}
            style={{
              color: getTextColor(tokens.colors.card, tokens.colors.foreground),
              borderColor: getTextColor(
                tokens.colors.card,
                tokens.colors.foreground,
              ),
              backgroundColor: "transparent",
              borderRadius: "var(--radius-default)",
              boxShadow: "var(--shadow-default)",
            }}
            className="hover:bg-transparent hover:opacity-80"
          >
            Reset All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {defaultTab === "colors" && <ColorCustomizer />}
        {defaultTab === "typography" && <TypographyCustomizer />}
        {defaultTab === "radius" && <RadiusCustomizer />}
        {defaultTab === "shadows" && <ShadowCustomizer />}
      </CardContent>
    </Card>
  );
}
