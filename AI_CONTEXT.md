# AI Context Document

## Project Overview

This codebase implements a web application using **Feature-Sliced Design (FSD)** architecture, a methodology for structuring codebases that emphasizes domain isolation, scalability, and maintainability. The application is built with modern web technologies to ensure type safety, efficient data fetching, and a consistent UI experience.

### Core Technologies
- **Next.js (App Router)**: Framework for server-side rendering, routing, and API routes.
- **tRPC**: Type-safe API layer for client-server communication.
- **Prisma ORM**: Database ORM with type-safe queries and migrations.
- **TanStack React Query**: Client-side data fetching, caching, and synchronization.
- **Tailwind CSS v4**: Utility-first CSS framework for styling.
- **shadcn/ui**: Component library built on Radix UI primitives, styled with Tailwind.

The project follows FSD principles to organize code into layers that reflect business domains and maintain clear separation of concerns. This structure promotes reusability, testability, and ease of refactoring.

## Core Architecture Principles

The architecture adheres to the following principles:

- **Domain Isolation**: Each business domain (e.g., authentication, client management) is self-contained within its own slice.
- **Layered Architecture**: Code is organized into hierarchical layers with strict dependency rules.
- **Type Safety**: Full TypeScript coverage across frontend, backend, and database layers.
- **Separation of Concerns**: UI, business logic, and data access are decoupled.
- **Scalability**: Easy to add new features without affecting existing code.
- **Maintainability**: Clear conventions and patterns for consistent code generation.

## Feature-Sliced Design Layers

FSD organizes code into six layers, each with specific responsibilities. Layers are ordered from most concrete (app) to most abstract (shared). Higher layers can import from lower layers, but not vice versa.

### 1. app
The entry point layer containing application configuration, global providers, and routing logic.

**Responsibilities:**
- Application initialization
- Global state providers (e.g., tRPC, React Query)
- Route definitions and layouts
- Environment-specific configurations

**Example Structure:**
```
app/
├── globals.css
├── layout.ts
├── _providers/
│   └── trpc-provider.tsx
└── (routes)/
    ├── page.tsx
    └── auth/
        └── login/
```

### 2. pages
Legacy routing layer (used in this project as `_pages/`). Contains page components and their configurations.

**Responsibilities:**
- Page-level components
- Route-specific logic
- SEO and metadata

**Example Structure:**
```
_pages/
├── auth/
│   ├── login/
│   │   ├── index.ts
│   │   ├── config/
│   │   └── ui/
│   └── register/
└── client/
    └── list/
```

### 3. widgets
Composite UI components that combine multiple features or entities.

**Responsibilities:**
- Complex UI compositions
- Layout components
- Feature aggregations

**Example Structure:**
```
widgets/
└── clients/
    └── clients-list/
```

### 4. features
Business features implementing specific user interactions or workflows.

**Responsibilities:**
- Feature-specific business logic
- UI components for feature interactions
- Feature state management

**Example Structure:**
```
features/
├── auth/
│   ├── login/
│   │   ├── index.ts
│   │   ├── config/
│   │   ├── model/
│   │   └── ui/
│   └── register/
└── client/
    ├── create-client/
    │   ├── model/
    │   └── ui/
    └── list-client/
```

### 5. entities
Business entities representing domain objects.

**Responsibilities:**
- Entity models and types
- Entity-specific business logic
- Entity UI components

**Example Structure:**
```
entities/
├── client/
│   ├── index.ts
│   └── model/
│       └── client.types.ts
└── user/
    ├── api/
    └── model/
        └── user.types.ts
```

### 6. shared
Common utilities, configurations, and cross-cutting concerns.

**Responsibilities:**
- Reusable utilities
- API configurations
- UI components and styles
- Constants and types

**Example Structure:**
```
shared/
├── api/
│   ├── init.ts
│   ├── query-client.ts
│   ├── router.ts
│   └── routers/
│       └── client.router.ts
├── auth/
├── constants/
├── hooks/
├── lib/
├── types/
└── ui/
    └── components/
```

## Recommended Project Folder Structure

```
project-root/
├── app/                    # Next.js app router
├── _pages/                 # Legacy pages (if used)
├── widgets/                # Composite UI components
├── features/               # Business features
├── entities/               # Business entities
├── shared/                 # Shared utilities
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── biome.json              # Linting/formatting config
├── components.json         # shadcn/ui config
├── next.config.ts          # Next.js config
├── package.json            # Dependencies
├── postcss.config.mjs      # PostCSS config
├── prisma.config.ts        # Prisma config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── AI_CONTEXT.md           # This document
```

## Business Logic Organization

Business logic is organized within feature and entity layers:

- **Features**: Contain logic for specific user workflows (e.g., login, create-client)
- **Entities**: Contain logic for domain objects (e.g., client, user)

Each feature/entity slice follows this internal structure:
- `index.ts`: Public API exports
- `config/`: Configuration and constants
- `model/`: Business logic, schemas, types
- `ui/`: UI components specific to the feature/entity

**Example Feature Slice:**
```
features/auth/login/
├── index.ts          # Export feature API
├── config/           # Feature configuration
├── model/            # Login logic, validation schemas
└── ui/               # Login form components
```

## tRPC Routers, Procedures, and Validation

tRPC provides type-safe API communication. Routers are organized in `shared/api/routers/`.

### Router Structure
- Each business domain has its own router (e.g., `client.router.ts`)
- Routers are merged in `shared/api/router.ts`
- Procedures use Zod for input validation

### Procedure Patterns
- **Query**: For data fetching (read operations)
- **Mutation**: For data modification (create, update, delete)
- **Subscription**: For real-time updates (if needed)

**Example Router:**
```typescript
// shared/api/routers/client.router.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../init';

export const clientRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.client.findMany();
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.client.create({
        data: input,
      });
    }),
});
```

### Validation
- Use Zod schemas for all inputs
- Define schemas in feature/entity `model/` directories
- Reuse schemas across client and server

## Prisma Queries and Database Access

Prisma handles database operations with type-safe queries.

### Schema Organization
- Schema defined in `prisma/schema.prisma`
- Models represent database tables
- Relations and constraints defined in schema

### Query Patterns
- Access Prisma client through tRPC context
- Use Prisma's fluent API for complex queries
- Leverage Prisma's generated types for type safety

**Example Query:**
```typescript
// In tRPC procedure
const clients = await ctx.prisma.client.findMany({
  include: {
    user: true, // Include related user data
  },
  where: {
    status: 'active',
  },
  orderBy: {
    createdAt: 'desc',
  },
});
```

### Database Access Rules
- Database operations only in tRPC procedures
- No direct Prisma usage in components
- Use transactions for multi-step operations

## React Query Usage Patterns and Caching Strategies

TanStack React Query manages client-side data fetching and caching.

### Query Client Setup
- Configured in `shared/api/query-client.ts`
- Integrated with tRPC in `shared/api/init.ts`

### Usage Patterns
- Use tRPC's React hooks for type-safe queries
- Implement optimistic updates for mutations
- Use query invalidation for cache management

**Example Usage:**
```typescript
// In a React component
import { api } from '~/shared/api';

function ClientList() {
  const { data: clients, isLoading } = api.client.getAll.useQuery();

  const createClient = api.client.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['client.getAll']);
    },
  });

  // Component logic...
}
```

### Caching Strategies
- Cache queries based on user authentication
- Use stale-while-revalidate for better UX
- Implement background refetching for critical data

## UI and Styling Guidelines

UI components use Tailwind CSS v4 and shadcn/ui for consistency.

### Component Structure
- shadcn/ui components in `shared/ui/components/`
- Feature-specific components in feature/entity `ui/` directories
- Use composition over inheritance

### Styling Principles
- Utility-first approach with Tailwind
- Consistent design tokens
- Responsive design patterns
- Dark mode support (if applicable)

**Example Component:**
```tsx
// shared/ui/components/button.tsx
import { cn } from '~/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className
      )}
      {...props}
    />
  );
}
```

### Layout Patterns
- Use CSS Grid and Flexbox for layouts
- Implement responsive breakpoints
- Follow accessibility guidelines

## Naming Conventions

### Files and Folders
- Folders: kebab-case (e.g., `create-client`, `client-router`)
- Files: camelCase (e.g., `clientTypes.ts`, `useClientQuery.ts`)
- Components: PascalCase (e.g., `ClientList.tsx`)

### Code Elements
- Variables/Functions: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Database: snake_case (following Prisma conventions)

### Layer-Specific Naming
- Features: Descriptive names (e.g., `auth/login`, `client/create-client`)
- Entities: Singular nouns (e.g., `client`, `user`)
- Shared: Generic names (e.g., `utils`, `constants`)

## Dependency Rules Between Layers

FSD enforces strict dependency rules:

- **app** → can import from all layers
- **pages** → can import from features, entities, shared
- **widgets** → can import from features, entities, shared
- **features** → can import from entities, shared
- **entities** → can import from shared
- **shared** → cannot import from other layers

**Import Rules:**
- Avoid circular dependencies
- Use barrel exports (`index.ts`) for clean imports
- Prefer relative imports within the same layer

## Best Practices for Type Safety

### Across the Stack
- Use TypeScript strict mode
- Leverage generated types from Prisma and tRPC
- Define shared types in `shared/types/`
- Use discriminated unions for complex state

### API Layer
- tRPC ensures end-to-end type safety
- Input validation with Zod schemas
- Context typing for authenticated procedures

### Database Layer
- Prisma generates types from schema
- Use Prisma's type-safe query builders
- Define custom types for complex queries

### Frontend Layer
- React Query provides typed hooks
- Component props are strictly typed
- Use TypeScript's utility types (e.g., `Partial<T>`, `Omit<T>`)

## Guidelines for Adding New Features

1. **Identify the Domain**: Determine which business domain the feature belongs to
2. **Create Feature Slice**: Add new directory under `features/`
3. **Define Schema**: Create Zod schemas in `model/` for validation
4. **Implement API**: Add tRPC procedures in appropriate router
5. **Create UI**: Build components in `ui/` using shadcn/ui
6. **Add Business Logic**: Implement logic in `model/` directory
7. **Update Types**: Ensure type definitions are exported
8. **Test Integration**: Verify with existing features

**New Feature Checklist:**
- [ ] Feature slice structure created
- [ ] Zod schemas defined
- [ ] tRPC procedures implemented
- [ ] UI components built
- [ ] Business logic implemented
- [ ] Types exported
- [ ] Dependencies checked
- [ ] Tests added (if applicable)

## Common Pitfalls to Avoid

1. **Breaking Layer Dependencies**: Never import from higher to lower layers
2. **Direct Database Access**: Don't use Prisma outside tRPC procedures
3. **Tight Coupling**: Avoid cross-feature dependencies
4. **Inconsistent Naming**: Follow established naming conventions
5. **Missing Type Safety**: Always use TypeScript and validation
6. **Large Components**: Break down complex UI into smaller components
7. **Cache Issues**: Properly invalidate React Query cache
8. **Over-fetching**: Use Prisma's select/include to fetch only needed data

## Rules for AI Agents

When generating code for this codebase, AI agents **MUST** follow these rules:

1. **Respect FSD Structure**: Always place code in the appropriate layer and slice
2. **Maintain Type Safety**: Use TypeScript throughout, with proper type annotations
3. **Follow Naming Conventions**: Use established naming patterns for files, variables, and components
4. **Adhere to Dependency Rules**: Only import from allowed layers
5. **Use Established Patterns**: Follow tRPC, Prisma, and React Query patterns shown in examples
6. **Implement Validation**: Always validate inputs with Zod schemas
7. **Create Reusable Components**: Use shadcn/ui and follow composition patterns
8. **Handle Errors Gracefully**: Implement proper error handling in API and UI
9. **Optimize Performance**: Use React Query caching and Prisma query optimization
10. **Document Code**: Add JSDoc comments for complex logic
11. **Test Changes**: Ensure code compiles and follows linting rules
12. **Maintain Consistency**: Match existing code style and patterns

By following these guidelines, AI agents will contribute code that integrates seamlessly with the existing architecture, maintaining the project's standards for quality, maintainability, and scalability.