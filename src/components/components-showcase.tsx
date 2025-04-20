import { useDesignStore } from "@/lib/design-store";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ComponentsShowcase() {
  const { selectedRadius, tokens } = useDesignStore();

  const getRadiusClass = (
    size?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full",
  ) => {
    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      full: "rounded-full",
    };
    return radiusMap[size || selectedRadius];
  };

  return (
    <ScrollArea
      style={{
        backgroundColor: tokens.colors.card,
        color: tokens.colors.foreground,
      }}
      className="bg-background text-foreground h-[800px] w-full border p-6 shadow-sm"
    >
      <div className="space-y-8">
        <h2 className="text-foreground text-2xl font-bold">
          Shadcn Components
        </h2>
        <div className="bg-card space-y-8 p-6 shadow-md">
          {/* Accordion */}
          <div className="space-y-2">
            <Label className="text-foreground">Accordion</Label>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="text-foreground hover:text-foreground/80">
                  Is it accessible?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="text-foreground hover:text-foreground/80">
                  Is it styled?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes. It comes with default styles that match your design
                  tokens.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Alert */}
          <div className="space-y-2">
            <Label className="text-foreground">Alert</Label>
            <Alert
              className={cn(
                "border-border bg-background text-foreground shadow-sm",
                getRadiusClass(),
              )}
            >
              <AlertTitle className="text-lg font-semibold">
                Alert Title
              </AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Alert description
              </AlertDescription>
            </Alert>
          </div>

          {/* Alert Dialog */}
          <div className="space-y-2">
            <Label className="text-foreground">Alert Dialog</Label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className={cn(
                    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                    getRadiusClass(),
                  )}
                >
                  Show Alert Dialog
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className={cn(
                  "bg-background text-foreground shadow-lg",
                  getRadiusClass(),
                )}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-semibold">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className={cn(
                      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
                      getRadiusClass(),
                    )}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className={cn(
                      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                      getRadiusClass(),
                    )}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* AspectRatio */}
          <div className="space-y-2">
            <Label className="text-foreground">Aspect Ratio (16:9)</Label>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="text-muted-foreground flex h-full items-center justify-center">
                16:9 Aspect Ratio
              </div>
            </AspectRatio>
          </div>

          {/* Avatar */}
          <div className="space-y-2">
            <Label className="text-foreground">Avatar</Label>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Badge */}
          <div className="space-y-2">
            <Label className="text-foreground">Badge</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                className={cn(
                  "bg-primary text-primary-foreground shadow-sm",
                  getRadiusClass(),
                )}
              >
                Default
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "bg-secondary text-secondary-foreground shadow-sm",
                  getRadiusClass(),
                )}
              >
                Secondary
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "border-border text-foreground shadow-sm",
                  getRadiusClass(),
                )}
              >
                Outline
              </Badge>
              <Badge
                variant="destructive"
                className={cn(
                  "bg-destructive text-destructive-foreground shadow-sm",
                  getRadiusClass(),
                )}
              >
                Destructive
              </Badge>
            </div>
          </div>

          {/* Button Variants */}
          <div className="space-y-2">
            <Label className="text-foreground">Buttons</Label>
            <div className="flex flex-wrap gap-2">
              <Button className="text-foreground">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Card */}
          <div className="space-y-2">
            <Label className="text-foreground">Card</Label>
            <Card
              className={cn(
                "border-border bg-card text-card-foreground shadow-md",
                getRadiusClass(),
              )}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Card Title
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Card Description
                </CardDescription>
              </CardHeader>
              <CardContent className="text-foreground">
                <p>Card content</p>
              </CardContent>
              <CardFooter className="text-muted-foreground">
                <p>Card footer</p>
              </CardFooter>
            </Card>
          </div>

          {/* Checkbox */}
          <div className="space-y-2">
            <Label className="text-foreground">Checkbox</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms</Label>
            </div>
          </div>

          {/* Dialog */}
          <div className="space-y-2">
            <Label className="text-foreground">Dialog</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                    getRadiusClass(),
                  )}
                >
                  Open Dialog
                </Button>
              </DialogTrigger>
              <DialogContent
                className={cn(
                  "bg-background text-foreground shadow-lg",
                  getRadiusClass(),
                )}
              >
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Dialog Title
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    This is a dialog description that explains the dialog's
                    purpose.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground">
                    This is the main content of the dialog.
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className={cn(
                      "border-border text-foreground shadow-sm",
                      getRadiusClass(),
                    )}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={cn(
                      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                      getRadiusClass(),
                    )}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Dropdown Menu */}
          <div className="space-y-2">
            <Label className="text-foreground">Dropdown Menu</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Paste</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Hover Card */}
          <div className="space-y-2">
            <Label className="text-foreground">Hover Card</Label>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">Hover for card</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Hover Card</h4>
                  <p className="text-muted-foreground text-sm">
                    Hover card content
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label className="text-foreground">Input</Label>
            <Input placeholder="Basic input" />
          </div>

          {/* Radio Group */}
          <div className="space-y-2">
            <Label className="text-foreground">Radio Group</Label>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">Option 2</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Select */}
          <div className="space-y-2">
            <Label className="text-foreground">Select</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Skeleton */}
          <div className="space-y-2">
            <Label className="text-foreground">Skeleton</Label>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <Label className="text-foreground">Slider</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>

          {/* Switch */}
          <div className="space-y-2">
            <Label className="text-foreground">Switch</Label>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-2">
            <Label className="text-foreground">Table</Label>
            <div className="overflow-hidden border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Header 1</TableHead>
                    <TableHead>Header 2</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Cell 1</TableCell>
                    <TableCell>Cell 2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Label className="text-foreground">Textarea</Label>
            <Textarea placeholder="Basic textarea" />
          </div>

          {/* Tooltip */}
          <div className="space-y-2">
            <Label className="text-foreground">Tooltip</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
