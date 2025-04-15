import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useDesignStore } from '@/lib/design-store';
import type { DesignTokens } from '@/lib/design-store';

type ColorScaleName = keyof Pick<
    DesignTokens['colors'],
    'primary' | 'secondary' | 'accent' | 'gray'
>;
const colorScales: Record<ColorScaleName, number[]> = {
    primary: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    secondary: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    accent: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
};

function ColorScale({
    name,
    scale,
}: {
    name: ColorScaleName;
    scale: number[];
}) {
    const { tokens } = useDesignStore();

    return (
        <div className="space-y-3">
            <Label className="text-xs text-muted-foreground capitalize">
                {name}
            </Label>
            <div className="grid grid-cols-11 gap-2">
                {scale.map((weight) => (
                    <div key={weight} className="space-y-1.5">
                        <div
                            className="h-10 w-full rounded-lg"
                            style={{
                                backgroundColor:
                                    tokens.colors[name][weight.toString()],
                            }}
                        />
                        <div className="px-0.5">
                            <div className="text-xs font-medium text-muted-foreground">
                                {weight}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SemanticColors() {
    const { tokens } = useDesignStore();
    const semanticColors = {
        background: tokens.colors.background,
        foreground: tokens.colors.foreground,
        card: tokens.colors.card,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        info: tokens.colors.info,
    };

    return (
        <div className="space-y-3">
            <Label className="text-xs text-muted-foreground">
                Semantic Colors
            </Label>
            <div className="grid grid-cols-6 gap-4">
                {Object.entries(semanticColors).map(([name, color]) => (
                    <div key={name} className="space-y-1.5">
                        <div
                            className="h-10 w-full rounded-lg border"
                            style={{ backgroundColor: color }}
                        />
                        <div className="px-0.5">
                            <div className="text-xs font-medium text-muted-foreground capitalize">
                                {name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {color}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ColorPalette() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>
                        Color scales and semantic colors used throughout the
                        application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(colorScales).map(([name, scale]) => (
                        <ColorScale
                            key={name}
                            name={name as ColorScaleName}
                            scale={scale}
                        />
                    ))}
                    <SemanticColors />
                </CardContent>
            </Card>
        </div>
    );
}
