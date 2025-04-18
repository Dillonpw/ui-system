import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/design-store";
import { ColorCustomizer } from "./color-customizer";
import { TypographyCustomizer } from "./typography-customizer";
import { RadiusCustomizer } from "./radius-customizer";
import { ShadowCustomizer } from "./shadow-customizer";

interface TokenCustomizerProps {
  defaultTab?: "colors" | "typography" | "radius" | "shadows" | "export";
}

export function TokenCustomizer({
  defaultTab = "colors",
}: TokenCustomizerProps) {
  const { resetTokens } = useDesignStore();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Design System Customizer</CardTitle>
            <CardDescription>
              Customize your design system and see live previews
            </CardDescription>
          </div>
          <Button variant="outline" onClick={resetTokens}>
            Reset to Defaults
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

