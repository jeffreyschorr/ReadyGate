import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

import { cn } from "@/lib/utils";

type InputProps = TextFieldProps;

export function Input({ className, ...props }: InputProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="medium"
      className={cn(className)}
      {...props}
    />
  );
}
