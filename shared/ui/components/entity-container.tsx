import { PropsWithChildren } from "react";

type EntityContainerProps = {
  Header?: React.ReactNode;
  Pagination?: React.ReactNode;
  filters?: {
    Search?: React.ReactNode;
    Status?: React.ReactNode;
    Others?: React.ReactNode;
  };
};

export function EntityContainer({
  children,
  Header,
  Pagination,
  filters,
}: PropsWithChildren<EntityContainerProps>) {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full @container">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
        {Header}
        <div className="flex flex-col gap-y-4 h-full">
          {filters && (
            <div className="flex items-center justify-end gap-x-4 flex-wrap">
              {filters.Search}
              {filters.Status}
              {filters.Others}
            </div>
          )}
          {children}
        </div>
        {Pagination}
      </div>
    </div>
  );
}
