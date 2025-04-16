import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useDesignStore } from "@/lib/design-store";

export function Typography() {
  const { tokens, selectedFontSize, selectedFontWeight } = useDesignStore();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>
            Font sizes and styles used throughout the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-muted-foreground text-xs">Font Family</Label>
            <p className="font-sans">
              Inter (sans): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-mono">
              Mono: The quick brown fox jumps over the lazy dog
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs">Font Sizes</Label>
            <div className="space-y-2">
              <p className="text-8xl">Text 8xl</p>
              <p className="text-7xl">Text 7xl</p>
              <p className="text-6xl">Text 6xl</p>
              <p className="text-5xl">Text 5xl</p>
              <p className="text-4xl">Text 4xl</p>
              <p className="text-3xl">Text 3xl</p>
              <p className="text-2xl">Text 2xl</p>
              <p className="text-xl">Text xl</p>
              <p className="text-lg">Text lg</p>
              <p className="text-base">Text base</p>
              <p className="text-sm">Text sm</p>
              <p className="text-xs">Text xs</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs">
              Font Weights
            </Label>
            <div className="space-y-2">
              <p className="font-black">Font Black (900)</p>
              <p className="font-extrabold">Font Extra Bold (800)</p>
              <p className="font-bold">Font Bold (700)</p>
              <p className="font-semibold">Font Semi Bold (600)</p>
              <p className="font-medium">Font Medium (500)</p>
              <p className="font-normal">Font Normal (400)</p>
              <p className="font-light">Font Light (300)</p>
              <p className="font-extralight">Font Extra Light (200)</p>
              <p className="font-thin">Font Thin (100)</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs">
              Current Settings
            </Label>
            <div className="space-y-2">
              <p>
                <strong>Selected Font Size:</strong> {selectedFontSize} (
                {tokens.typography.fontSize[selectedFontSize]})
              </p>
              <p>
                <strong>Selected Font Weight:</strong> {selectedFontWeight} (
                {tokens.typography.fontWeight[selectedFontWeight]})
              </p>
              <p>
                <strong>Font Family:</strong> {tokens.typography.fontFamily}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-muted-foreground text-xs">Text Styles</Label>
            <div className="space-y-2">
              <p className="italic">Italic text style</p>
              <p className="underline">Underlined text style</p>
              <p className="line-through">Strikethrough text style</p>
              <p className="uppercase">Uppercase text transform</p>
              <p className="lowercase">Lowercase text transform</p>
              <p className="capitalize">Capitalized text transform</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
