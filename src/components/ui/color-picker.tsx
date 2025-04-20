import { HexColorPicker, HexColorInput } from "react-colorful";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface ColorPickerProps {
  color: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  labelProps?: React.ComponentProps<typeof Label>;
}

export function ColorPicker({
  color,
  onChange,
  label,
  className,
  labelProps,
}: ColorPickerProps) {
  return (
    <div className={cn("mx-auto max-w-[316px] space-y-2", className)}>
      {label && <Label {...labelProps}>{label}</Label>}
      <div className="flex flex-col gap-2">
        <HexColorPicker
          color={color}
          onChange={onChange}
          className="h-[200px] w-full"
        />
        <div className="flex items-center gap-2">
          <HexColorInput
            color={color}
            onChange={onChange}
            className="border-input h-9 w-fit rounded-md border bg-transparent px-3 py-1 text-sm"
            prefixed
          />
        </div>
      </div>
    </div>
  );
}
