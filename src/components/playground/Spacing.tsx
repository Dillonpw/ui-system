import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const spacingValues = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];

function SpacingDemo({ value }: { value: number }) {
    return (
        <div className="flex items-center space-x-4">
            <div className="w-16">
                <span className="text-sm font-medium">{value}</span>
            </div>
            <div
                className="h-6 rounded bg-primary/20"
                style={{ width: `${value * 4}px` }}
            />
            <span className="text-sm text-muted-foreground">{value * 4}px</span>
        </div>
    );
}

function MarginDemo() {
    return (
        <div className="space-y-8">
            <div className="grid gap-4">
                <Label className="text-xs text-muted-foreground">
                    Margin Examples
                </Label>
                <div className="space-y-4">
                    <div className="relative rounded border border-dashed p-8">
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Parent container
                        </div>
                        <div className="relative rounded bg-muted p-4">
                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                m-8 (32px)
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded border border-dashed p-8">
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Parent container
                        </div>
                        <div className="relative rounded bg-muted px-4">
                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                px-4 (16px)
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded border border-dashed p-8">
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Parent container
                        </div>
                        <div className="relative rounded bg-muted py-4">
                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                py-4 (16px)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaddingDemo() {
    return (
        <div className="space-y-8">
            <div className="grid gap-4">
                <Label className="text-xs text-muted-foreground">
                    Padding Examples
                </Label>
                <div className="space-y-4">
                    <div className="rounded bg-muted p-8">
                        <div className="flex h-16 items-center justify-center rounded border border-dashed text-sm">
                            p-8 (32px)
                        </div>
                    </div>
                    <div className="rounded bg-muted px-8">
                        <div className="flex h-16 items-center justify-center rounded border border-dashed text-sm">
                            px-8 (32px)
                        </div>
                    </div>
                    <div className="rounded bg-muted py-8">
                        <div className="flex h-16 items-center justify-center rounded border border-dashed text-sm">
                            py-8 (32px)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LayoutDemo() {
    return (
        <div className="space-y-8">
            <div className="grid gap-4">
                <Label className="text-xs text-muted-foreground">
                    Flex Layout
                </Label>
                <div className="space-y-4">
                    <div className="flex gap-4 rounded bg-muted p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            1
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            2
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            3
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded bg-muted p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            1
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            2
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-primary text-primary-foreground">
                            3
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="grid gap-4">
                <Label className="text-xs text-muted-foreground">
                    Grid Layout
                </Label>
                <div className="grid grid-cols-3 gap-4 rounded bg-muted p-4">
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        1
                    </div>
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        2
                    </div>
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        3
                    </div>
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        4
                    </div>
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        5
                    </div>
                    <div className="flex h-16 items-center justify-center rounded bg-primary text-primary-foreground">
                        6
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Spacing() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Spacing Scale</CardTitle>
                    <CardDescription>
                        Consistent spacing values used throughout the
                        application.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {spacingValues.map((value) => (
                            <SpacingDemo key={value} value={value} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Spacing & Layout</CardTitle>
                    <CardDescription>
                        Examples of margin, padding, and layout utilities.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="margin" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="margin">Margin</TabsTrigger>
                            <TabsTrigger value="padding">Padding</TabsTrigger>
                            <TabsTrigger value="layout">Layout</TabsTrigger>
                        </TabsList>
                        <TabsContent value="margin">
                            <MarginDemo />
                        </TabsContent>
                        <TabsContent value="padding">
                            <PaddingDemo />
                        </TabsContent>
                        <TabsContent value="layout">
                            <LayoutDemo />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
