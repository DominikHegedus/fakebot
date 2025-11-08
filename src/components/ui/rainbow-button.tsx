import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all animate-rainbow",
    "hover:scale-105 hover:-translate-y-0.5 ease-in-out delay-150 duration-200",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-sm outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default:
          "hover:!text-primary-foreground border border-border/30 text-primary-foreground bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] bg-[length:200%] shadow-md !transition-[box-shadow,scale,translate,width,height,padding] hover:shadow-lg focus-visible:ring-ring/60 [background-clip:padding-box] after:absolute after:inset-0 after:z-[-1] after:rounded-[inherit] after:bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))] after:opacity-80 after:content-[''] dark:after:bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0))] before:absolute before:bottom-[-18%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] before:[filter:blur(0.75rem)] before:[will-change:background-position] before:content-['']",
        underline:
          "border border-input border-b-transparent bg-[linear-gradient(var(--background),var(--background)),linear-gradient(var(--background)_60%,var(--muted)_95%,transparent),linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] bg-[length:200%] text-accent-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] before:[filter:blur(0.75rem)] before:[will-change:background-position] before:content-['']",
        outline:
          "border border-transparent bg-[linear-gradient(var(--background),var(--background)),linear-gradient(var(--background)_60%,var(--muted)_95%,transparent),linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] bg-[length:200%] text-accent-foreground [background-clip:padding-box,padding-box,border-box] [background-origin:padding-box,border-box,border-box] before:absolute before:-inset-[0.35rem] before:-z-10 before:rounded-[inherit] before:animate-rainbow before:bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary))] before:bg-[length:200%] before:opacity-60 before:[filter:blur(0.9rem)] before:[will-change:background-position] before:content-['']",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps };
