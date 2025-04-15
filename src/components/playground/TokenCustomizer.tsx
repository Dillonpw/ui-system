import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDesignStore } from '@/lib/design-store';

import { ColorPicker } from '@/components/ui/color-picker';
import { useState } from 'react';
import type { DesignTokens } from '@/lib/design-store';

const shadeValues = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
type ShadeNumber = (typeof shadeValues)[number];

function getContrastTextColor(hexColor: string) {
    // Remove the '#' if present
    const color = hexColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate relative luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

function PreviewCard({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={`p-6 rounded-lg border bg-card ${className}`}>
            {children}
        </div>
    );
}

function ColorCustomizer() {
    const { tokens, updateColor } = useDesignStore();
    const [selectedShade, setSelectedShade] = useState<ShadeNumber>(500);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Color Palette</h2>
                <div className="space-x-2">
                    <Label className="mr-2">Shade:</Label>
                    {shadeValues.map((shade) => (
                        <Button
                            key={shade}
                            variant={
                                selectedShade === shade ? 'default' : 'outline'
                            }
                            onClick={() => setSelectedShade(shade)}
                            className="h-8 w-12"
                            size="sm"
                        >
                            {shade}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div>
                    <ColorPicker
                        label="Primary Color"
                        color={tokens.colors.primary[selectedShade]}
                        onChange={(value) =>
                            updateColor(
                                'primary',
                                selectedShade.toString(),
                                value
                            )
                        }
                    />
                </div>

                <div>
                    <ColorPicker
                        label="Secondary Color"
                        color={tokens.colors.secondary[selectedShade]}
                        onChange={(value) =>
                            updateColor(
                                'secondary',
                                selectedShade.toString(),
                                value
                            )
                        }
                    />
                </div>

                <div>
                    <ColorPicker
                        label="Accent Color"
                        color={tokens.colors.accent[selectedShade]}
                        onChange={(value) =>
                            updateColor(
                                'accent',
                                selectedShade.toString(),
                                value
                            )
                        }
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-semibold">Semantic Colors</h3>
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <ColorPicker
                            label="Background"
                            color={tokens.colors.background}
                            onChange={(value) =>
                                updateColor('background', '', value)
                            }
                        />
                    </div>
                    <div>
                        <ColorPicker
                            label="Foreground"
                            color={tokens.colors.foreground}
                            onChange={(value) =>
                                updateColor('foreground', '', value)
                            }
                        />
                    </div>
                    <div>
                        <ColorPicker
                            label="Card"
                            color={tokens.colors.card}
                            onChange={(value) => updateColor('card', '', value)}
                        />
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <ColorPicker
                            label="Success"
                            color={tokens.colors.success}
                            onChange={(value) =>
                                updateColor('success', '', value)
                            }
                        />
                    </div>
                    <div>
                        <ColorPicker
                            label="Warning"
                            color={tokens.colors.warning}
                            onChange={(value) =>
                                updateColor('warning', '', value)
                            }
                        />
                    </div>
                    <div>
                        <ColorPicker
                            label="Info"
                            color={tokens.colors.info}
                            onChange={(value) => updateColor('info', '', value)}
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Preview</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                style={{
                                    backgroundColor:
                                        tokens.colors.primary[selectedShade],
                                    color: getContrastTextColor(
                                        tokens.colors.primary[selectedShade]
                                    ),
                                }}
                            >
                                Primary Button
                            </Button>
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.primary[selectedShade],
                                }}
                            />
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.primary[
                                            selectedShade >= 500 ? 200 : 800
                                        ],
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                style={{
                                    backgroundColor:
                                        tokens.colors.secondary[selectedShade],
                                    color: getContrastTextColor(
                                        tokens.colors.secondary[selectedShade]
                                    ),
                                }}
                            >
                                Secondary Button
                            </Button>
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.secondary[selectedShade],
                                }}
                            />
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.secondary[
                                            selectedShade >= 500 ? 200 : 800
                                        ],
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Button
                                className="w-full"
                                style={{
                                    backgroundColor:
                                        tokens.colors.accent[selectedShade],
                                    color: getContrastTextColor(
                                        tokens.colors.accent[selectedShade]
                                    ),
                                }}
                            >
                                Accent Button
                            </Button>
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.accent[selectedShade],
                                }}
                            />
                            <div
                                className="h-12 rounded-lg"
                                style={{
                                    backgroundColor:
                                        tokens.colors.accent[
                                            selectedShade >= 500 ? 200 : 800
                                        ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypographyCustomizer() {
    const { tokens, updateTypography } = useDesignStore();
    const [selectedSize, setSelectedSize] =
        useState<keyof typeof tokens.typography.fontSize>('base');
    const [selectedWeight, setSelectedWeight] =
        useState<keyof typeof tokens.typography.fontWeight>('normal');

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Font Size</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(tokens.typography.fontSize).map(
                            ([size]) => (
                                <Button
                                    key={size}
                                    variant={
                                        selectedSize === size
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() =>
                                        setSelectedSize(
                                            size as keyof typeof tokens.typography.fontSize
                                        )
                                    }
                                    className="h-8"
                                >
                                    {size}
                                </Button>
                            )
                        )}
                    </div>
                    <Input
                        value={tokens.typography.fontSize[selectedSize]}
                        onChange={(e) =>
                            updateTypography(
                                'fontSize',
                                selectedSize as string,
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label>Font Weight</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(tokens.typography.fontWeight).map(
                            ([weight]) => (
                                <Button
                                    key={weight}
                                    variant={
                                        selectedWeight === weight
                                            ? 'default'
                                            : 'outline'
                                    }
                                    onClick={() =>
                                        setSelectedWeight(
                                            weight as keyof typeof tokens.typography.fontWeight
                                        )
                                    }
                                    className="h-8"
                                >
                                    {weight}
                                </Button>
                            )
                        )}
                    </div>
                    <Input
                        type="number"
                        min="100"
                        max="900"
                        step="100"
                        value={tokens.typography.fontWeight[selectedWeight]}
                        onChange={(e) =>
                            updateTypography(
                                'fontWeight',
                                selectedWeight as string,
                                e.target.value
                            )
                        }
                    />
                </div>
            </div>

            <PreviewCard>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="space-y-4">
                        <p
                            style={{
                                fontSize:
                                    tokens.typography.fontSize[selectedSize],
                                fontWeight:
                                    tokens.typography.fontWeight[
                                        selectedWeight
                                    ],
                            }}
                        >
                            The quick brown fox jumps over the lazy dog
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-xs">Current Size</Label>
                                <p className="text-sm text-muted-foreground">
                                    {tokens.typography.fontSize[selectedSize]}
                                </p>
                            </div>
                            <div>
                                <Label className="text-xs">
                                    Current Weight
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {
                                        tokens.typography.fontWeight[
                                            selectedWeight
                                        ]
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PreviewCard>
        </div>
    );
}

function RadiusCustomizer() {
    const { tokens, updateRadius } = useDesignStore();
    const [selectedRadius, setSelectedRadius] =
        useState<keyof typeof tokens.radius>('md');

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Border Radius</Label>
                    <div className="grid grid-cols-4 gap-2">
                        {Object.entries(tokens.radius).map(([size]) => (
                            <Button
                                key={size}
                                variant={
                                    selectedRadius === size
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() =>
                                    setSelectedRadius(
                                        size as keyof typeof tokens.radius
                                    )
                                }
                                className="h-8"
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                    <Input
                        value={tokens.radius[selectedRadius]}
                        onChange={(e) =>
                            updateRadius(selectedRadius, e.target.value)
                        }
                    />
                </div>
            </div>

            <PreviewCard>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="grid gap-4">
                        <div
                            className="h-20 bg-primary/20"
                            style={{
                                borderRadius: tokens.radius[selectedRadius],
                            }}
                        />
                        <Button
                            className="w-full"
                            style={{
                                borderRadius: tokens.radius[selectedRadius],
                            }}
                        >
                            Button Example
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                            <div
                                className="h-12 bg-secondary/20"
                                style={{
                                    borderRadius: tokens.radius[selectedRadius],
                                }}
                            />
                            <div
                                className="h-12 bg-accent/20"
                                style={{
                                    borderRadius: tokens.radius[selectedRadius],
                                }}
                            />
                            <div
                                className="h-12 bg-destructive/20"
                                style={{
                                    borderRadius: tokens.radius[selectedRadius],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </PreviewCard>
        </div>
    );
}

function ShadowCustomizer() {
    const { tokens, updateShadow } = useDesignStore();
    const [selectedShadow, setSelectedShadow] =
        useState<keyof typeof tokens.shadows>('md');

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Shadow Size</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(tokens.shadows).map(([size]) => (
                            <Button
                                key={size}
                                variant={
                                    selectedShadow === size
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() =>
                                    setSelectedShadow(
                                        size as keyof typeof tokens.shadows
                                    )
                                }
                                className="h-8"
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                    <Input
                        value={tokens.shadows[selectedShadow]}
                        onChange={(e) =>
                            updateShadow(selectedShadow, e.target.value)
                        }
                    />
                </div>
            </div>

            <PreviewCard className="bg-background">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="grid gap-4">
                        <div
                            className="h-20 bg-card rounded-lg"
                            style={{
                                boxShadow: tokens.shadows[selectedShadow],
                            }}
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <div
                                className="h-12 bg-card rounded-lg"
                                style={{
                                    boxShadow: tokens.shadows[selectedShadow],
                                }}
                            />
                            <div
                                className="h-12 bg-card rounded-lg"
                                style={{
                                    boxShadow: tokens.shadows[selectedShadow],
                                }}
                            />
                            <div
                                className="h-12 bg-card rounded-lg"
                                style={{
                                    boxShadow: tokens.shadows[selectedShadow],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </PreviewCard>
        </div>
    );
}

export function generateTailwindConfig(tokens: DesignTokens) {
    const config = {
        theme: {
            extend: {
                colors: {
                    primary: Object.entries(tokens.colors.primary).reduce<
                        Record<string, string>
                    >(
                        (acc, [shade, value]) => ({
                            ...acc,
                            [shade]: value,
                        }),
                        {}
                    ),
                    secondary: Object.entries(tokens.colors.secondary).reduce<
                        Record<string, string>
                    >(
                        (acc, [shade, value]) => ({
                            ...acc,
                            [shade]: value,
                        }),
                        {}
                    ),
                    accent: Object.entries(tokens.colors.accent).reduce<
                        Record<string, string>
                    >(
                        (acc, [shade, value]) => ({
                            ...acc,
                            [shade]: value,
                        }),
                        {}
                    ),
                },
                fontSize: tokens.typography.fontSize,
                fontWeight: tokens.typography.fontWeight,
                borderRadius: tokens.radius,
                boxShadow: tokens.shadows,
            },
        },
    };

    return `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)}`;
}

export function generateCSSVariables(tokens: DesignTokens) {
    let css = ':root {\n';

    // Colors
    Object.entries(tokens.colors).forEach(([palette, shades]) => {
        if (typeof shades === 'object') {
            Object.entries(shades).forEach(([shade, value]) => {
                css += `  --${palette}-${shade}: ${value};\n`;
            });
        }
    });

    // Typography
    Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
        css += `  --font-size-${size}: ${value};\n`;
    });

    Object.entries(tokens.typography.fontWeight).forEach(([weight, value]) => {
        css += `  --font-weight-${weight}: ${value};\n`;
    });

    // Radius
    Object.entries(tokens.radius).forEach(([size, value]) => {
        css += `  --radius-${size}: ${value};\n`;
    });

    // Shadows
    Object.entries(tokens.shadows).forEach(([size, value]) => {
        css += `  --shadow-${size}: ${value};\n`;
    });

    css += '}';
    return css;
}

interface TokenCustomizerProps {
    defaultTab?: 'colors' | 'typography' | 'radius' | 'shadows' | 'export';
}

export function TokenCustomizer({
    defaultTab = 'colors',
}: TokenCustomizerProps) {
    const { resetTokens } = useDesignStore();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Design System Customizer</CardTitle>
                        <CardDescription>
                            Customize your design tokens and see live previews
                        </CardDescription>
                    </div>
                    <Button variant="outline" onClick={resetTokens}>
                        Reset to Defaults
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {defaultTab === 'colors' && <ColorCustomizer />}
                {defaultTab === 'typography' && <TypographyCustomizer />}
                {defaultTab === 'radius' && <RadiusCustomizer />}
                {defaultTab === 'shadows' && <ShadowCustomizer />}
            </CardContent>
        </Card>
    );
}
