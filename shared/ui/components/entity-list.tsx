import { cn } from "@/shared/lib/utils";

type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  EmptyView?: React.ReactNode;
  className?: string;
};

export function EntityList<T>({
  items,
  renderItem,
  className,
  EmptyView,
  getKey,
}: EntityListProps<T>) {
  if (items.length === 0 && EmptyView) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-sm mx-auto">{EmptyView}</div>
      </div>
    );
  }
  return (
    <div className={cn("grid grid-cols-1 gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
