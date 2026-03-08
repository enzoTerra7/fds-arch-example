import { createTRPCRouter } from "./init";
import { clientRouter } from "./routers/client.router";
export const appRouter = createTRPCRouter({
  client: clientRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
