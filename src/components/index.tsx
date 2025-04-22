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

  return (
    <Card
      style={{
        backgroundColor: tokens.colors.card,
        color: getTextColor(tokens.colors.card, tokens.colors.foreground),
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle style={{ color: "inherit" }}>
              Design System Customizer
            </CardTitle>
            <CardDescription style={{ color: "inherit", opacity: 0.8 }}>
              Customize your design system and see live previews
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
