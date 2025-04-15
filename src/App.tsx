import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPalette } from '@/components/playground/ColorPalette';
import { Spacing } from '@/components/playground/Spacing';
import { ComponentPreview } from '@/components/playground/ComponentPreview';
import { TokenCustomizer } from '@/components/playground/TokenCustomizer';
import { Button } from '@/components/ui/button';
import { useDesignStore } from '@/lib/design-store';
import { toast } from '@/components/ui/use-toast';
import { generateTailwindConfig } from '@/components/playground/TokenCustomizer';

export default function App() {
    const { tokens } = useDesignStore();

    const handleExport = () => {
        const config = generateTailwindConfig(tokens);
        navigator.clipboard.writeText(config);
        toast({
            title: 'Copied to clipboard',
            description: 'Design tokens exported as Tailwind config',
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Design System Playground
                    </h1>
                    <Button onClick={handleExport}>Export Config</Button>
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
                        <TabsTrigger value="spacing" className="flex-1">
                            Spacing
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
                        <TabsContent value="spacing">
                            <Spacing />
                        </TabsContent>
                        <TabsContent value="components">
                            <ComponentPreview />
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
        </div>
    );
}
