import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

function ButtonDemo() {
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button disabled>Disabled</Button>
                <Button size="sm">Small</Button>
            </div>
        </div>
    );
}

function InputDemo() {
    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="disabled">Disabled</Label>
                <Input id="disabled" disabled placeholder="Disabled input" />
            </div>
        </div>
    );
}

function BadgeDemo() {
    return (
        <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
        </div>
    );
}

function SwitchDemo() {
    return (
        <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
    );
}

function CheckboxDemo() {
    return (
        <div className="grid gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled">Disabled</Label>
            </div>
        </div>
    );
}

function RadioGroupDemo() {
    return (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup>
    );
}

export function ComponentPreview() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Component Library</CardTitle>
                    <CardDescription>
                        Preview of common components and their variants.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="buttons" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="buttons">Buttons</TabsTrigger>
                            <TabsTrigger value="inputs">Inputs</TabsTrigger>
                            <TabsTrigger value="badges">Badges</TabsTrigger>
                            <TabsTrigger value="controls">Controls</TabsTrigger>
                        </TabsList>
                        <TabsContent value="buttons">
                            <ButtonDemo />
                        </TabsContent>
                        <TabsContent value="inputs">
                            <InputDemo />
                        </TabsContent>
                        <TabsContent value="badges">
                            <BadgeDemo />
                        </TabsContent>
                        <TabsContent value="controls" className="space-y-8">
                            <SwitchDemo />
                            <Separator />
                            <CheckboxDemo />
                            <Separator />
                            <RadioGroupDemo />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
