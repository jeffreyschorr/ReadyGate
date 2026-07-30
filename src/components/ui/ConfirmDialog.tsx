"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Button } from "@/components/ui/Button";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      slotProps={{
        paper: {
          className: "w-full max-w-sm rounded-lg border border-border bg-surface shadow-md",
        },
      }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        className={cn(typography.cardHeading, "px-6 pt-6 pb-2 text-card-heading")}
      >
        {title}
      </DialogTitle>
      <DialogContent id="confirm-dialog-description" className="px-6 pb-2">
        <p className={cn(typography.bodySm, "text-muted")}>{message}</p>
      </DialogContent>
      <DialogActions className="gap-2 px-6 pb-6 pt-4">
        <Button variant="secondary" onClick={onCancel} className="min-h-10 px-4">
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onConfirm} className="min-h-10 px-4">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
