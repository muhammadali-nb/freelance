"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: (value: number) => React.ReactNode;
  formatValue?: (value: number) => string;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, formatValue, ...props }, ref) => (
  <div className="space-y-6 w-full px-2">
    {/* Значения сверху */}
    {props.value && Array.isArray(props.value) && (
      <div className="flex justify-between items-center text-sm">
        <div className="bg-secondary/20 px-3 py-1.5 rounded-md text-foreground font-medium">
          {formatValue ? formatValue(props.value[0]) : label?.(props.value[0])}
        </div>
        <div className="bg-secondary/20 px-3 py-1.5 rounded-md text-foreground font-medium">
          {formatValue ? formatValue(props.value[1]) : label?.(props.value[1])}
        </div>
      </div>
    )}
    
    {/* Слайдер */}
    <div className="relative">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary/30">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-lg ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110"
        />
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-lg ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110"
        />
      </SliderPrimitive.Root>
    </div>
  </div>
));

DualRangeSlider.displayName = SliderPrimitive.Root.displayName;

export { DualRangeSlider }; 