export type PageProps<
  P = Record<string, unknown>,
  S = Record<string, unknown>,
> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};
