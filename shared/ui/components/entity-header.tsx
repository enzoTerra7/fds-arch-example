type EntityHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function EntityHeader({
  title,
  children,
  description,
}: EntityHeaderProps) {
  return (
    <div className="flex @lg:flex-row @lg:items-center @lg:justify-between gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg @md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs @md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="w-fit flex flex-wrap gap-x-4 gap-y-2">{children}</div>
      )}
    </div>
  );
}
