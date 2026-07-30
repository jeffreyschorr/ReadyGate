import MuiAlert from "@mui/material/Alert";
import type { AlertProps as MuiAlertProps } from "@mui/material/Alert";

import { cn } from "@/lib/utils";

type AlertProps = MuiAlertProps;

export function Alert({ className, ...props }: AlertProps) {
  return (
    <MuiAlert
      className={cn("border border-border shadow-sm", className)}
      {...props}
    />
  );
}
