import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPalette } from "@/components/color-palette";
import { ComponentsShowcase } from "@/components/components-showcase";
import { DesignCustomizer } from "@/components";

export default function App() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center px-4">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-14 items-center">
          <img
            src="/dsp-logo.png"
            alt="Design System Playground"
            width={32}
            height={32}
          />
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
              <DesignCustomizer defaultTab="colors" />
              <ColorPalette />
            </TabsContent>
            <TabsContent value="typography">
              <DesignCustomizer defaultTab="typography" />
            </TabsContent>
            <TabsContent value="radius">
              <DesignCustomizer defaultTab="radius" />
            </TabsContent>
            <TabsContent value="shadows">
              <DesignCustomizer defaultTab="shadows" />
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
