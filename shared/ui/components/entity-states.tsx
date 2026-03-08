import { ElementType } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";
import {
  AlertTriangleIcon,
  Loader2Icon,
  PackageSearchIcon,
} from "lucide-react";

type EntityStateViewProps = {
  message?: string;
  CustomIcon?: ElementType<{
    className?: string;
  }>;
};

export function EntityLoadingView({
  message,
  CustomIcon,
}: EntityStateViewProps) {
  const Icon = CustomIcon ? CustomIcon : Loader2Icon;
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <Icon className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function EntityErrorView({ message, CustomIcon }: EntityStateViewProps) {
  const Icon = CustomIcon ? AlertTriangleIcon : PackageSearchIcon;
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <Icon className="size-6 text-destructive" />
      {!!message && <p className="text-sm text-destructive">{message}</p>}
    </div>
  );
}

type EntityEmptyViewProps = {
  children?: React.ReactNode;
} & EntityStateViewProps;

export function EntityEmptyView({
  message,
  children,
  CustomIcon,
}: EntityEmptyViewProps) {
  const Icon = CustomIcon ? CustomIcon : PackageSearchIcon;
  return (
    <Empty className="border border-dashed bg-background">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Icon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {children}
    </Empty>
  );
}
