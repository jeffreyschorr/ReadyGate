import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = Omit<MuiButtonProps, "variant" | "color"> & {
  variant?: ButtonVariant;
};

const variantMap: Record<
  ButtonVariant,
  Pick<MuiButtonProps, "variant" | "color">
> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "primary" },
  ghost: { variant: "text", color: "primary" },
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const muiVariant = variantMap[variant];

  return (
    <MuiButton
      {...muiVariant}
      className={cn("min-h-11 px-6", typography.button, className)}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
