import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPalette } from "@/components/color-palette";
import { TokenCustomizer } from "@/components/token-customizer";
import { ComponentsShowcase } from "@/components/components-showcase";

export default function App() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-4">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-2xl font-bold">Design System Playground</h1>
        </div>
      </header>
      <main className="container py-6">
        <Tabs defaultValue="colors">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="colors" className="flex-1">
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              Typography
            </TabsTrigger>
            <TabsTrigger value="radius" className="flex-1">
              Border Radius
            </TabsTrigger>
            <TabsTrigger value="shadows" className="flex-1">
              Shadows
            </TabsTrigger>
            <TabsTrigger value="components" className="flex-1">
              Components
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="colors" className="space-y-8">
              <TokenCustomizer defaultTab="colors" />
              <ColorPalette />
            </TabsContent>
            <TabsContent value="typography">
              <TokenCustomizer defaultTab="typography" />
            </TabsContent>
            <TabsContent value="radius">
              <TokenCustomizer defaultTab="radius" />
            </TabsContent>
            <TabsContent value="shadows">
              <TokenCustomizer defaultTab="shadows" />
            </TabsContent>
            <TabsContent value="components">
              <ComponentsShowcase />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
