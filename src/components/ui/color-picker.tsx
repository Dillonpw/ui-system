import { HexColorPicker, HexColorInput } from 'react-colorful';
import { cn } from '@/lib/utils';
import { Label } from './label';

interface ColorPickerProps {
    color: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

export function ColorPicker({
    color,
    onChange,
    label,
    className,
}: ColorPickerProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && <Label>{label}</Label>}
            <div className="flex flex-col gap-2">
                <HexColorPicker
                    color={color}
                    onChange={onChange}
                    className="w-full !h-[200px]"
                />
                <div className="flex items-center gap-2">
                    <div
                        className="h-9 w-9 rounded-md border border-input"
                        style={{ backgroundColor: color }}
                    />
                    <HexColorInput
                        color={color}
                        onChange={onChange}
                        className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        prefixed
                    />
                </div>
            </div>
        </div>
    );
}
