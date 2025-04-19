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
    <div className={cn("space-y-2", className)}>
      {label && <Label {...labelProps}>{label}</Label>}
      <div className="flex flex-col gap-2">
        <HexColorPicker
          color={color}
          onChange={onChange}
          className="!h-[200px] w-full"
        />
        <div className="flex items-center gap-2">
          <div
            className="border-input h-9 w-9 rounded-md border"
            style={{ backgroundColor: color }}
          />
          <HexColorInput
            color={color}
            onChange={onChange}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm"
            prefixed
          />
        </div>
      </div>
    </div>
  );
}
