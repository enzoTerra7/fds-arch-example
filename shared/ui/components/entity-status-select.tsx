import { cn } from "@/shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/components/select";
import React from "react";

type EntityStatusSelectProps = {
  status: string | undefined;
  onStatusChange: (status: string) => void;
  prefix?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export function EntityStatusSelect({
  status,
  onStatusChange,
  prefix = "Status:",
  children,
  placeholder = "Select a status",
  disabled,
  className,
}: EntityStatusSelectProps) {
  return (
    <Select value={status} onValueChange={onStatusChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "flex items-center justify-start w-full max-w-50",
          className,
        )}
      >
        <small className="text-xs font-bold text-muted-foreground">
          {prefix}
        </small>
        <span className="flex-1 text-start">
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent position="popper" align="end">{children}</SelectContent>
    </Select>
  );
}
