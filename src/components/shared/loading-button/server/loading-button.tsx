import { cn } from "@/lib/utils";
import { Button, type ButtonVariantProps } from "../../../ui/button";
import { Spinner } from "../../../ui/spinner";

export default function LoadingButton({
  pending,
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  ...props
}: {
  pending: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & ButtonVariantProps) {
  return (
    <Button
      onClick={onClick}
      className={cn("w-full", className)}
      disabled={pending}
      variant={variant}
      size={size}
      {...props}
    >
      {pending && <Spinner />}
      {children}
    </Button>
  );
}
