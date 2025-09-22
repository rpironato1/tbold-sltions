# AI Development Rules for Turnbold Solutions

This document provides strict guidelines for AI-driven development on this project. Adherence to these rules is mandatory to ensure code consistency, maintainability, and performance.

## Tech Stack Overview

The application is built on a modern, type-safe, and efficient technology stack. All development must conform to the patterns established by these technologies.

-   **Framework**: React 18 with TypeScript, built and served by Vite.
-   **Styling**: Tailwind CSS for all utility-first styling. No custom CSS files should be created.
-   **UI Components**: **shadcn/ui** is the exclusive component library, built upon Radix UI primitives. All UI elements are located in `src/components/ui/`.
-   **Icons**: **Lucide React** is the sole icon library. Icons are centrally exported from `src/components/icons/index.ts` for optimization.
-   **Routing**: **React Router DOM v6** handles all client-side routing. Routes are centralized in `src/App.tsx`.
-   **Backend & Authentication**: **Supabase** is used for the database, user authentication, and other backend services. The client is pre-configured in `src/integrations/supabase/client.ts`.
-   **Server State Management**: **TanStack Query (React Query)** is mandatory for all asynchronous operations, including data fetching, caching, and mutations.
-   **Forms**: **React Hook Form** is used for managing form state, and **Zod** is used for schema-based validation.
-   **Internationalization (i18n)**: **i18next** with `react-i18next` provides multi-language support. All user-facing strings must be translated.
-   **Notifications**: **Sonner** is used for all toast notifications to provide feedback to the user.

## Library Usage Rules

The following rules dictate which library to use for specific tasks. Do not deviate from these rules.

1.  **UI and Layout**:
    -   **Styling**: ALWAYS use Tailwind CSS classes.
    -   **Components**: ALWAYS use existing **shadcn/ui** components from `src/components/ui/` for elements like buttons, cards, inputs, dialogs, etc. Do not build these from scratch.
    -   **Conditional Classes**: ALWAYS use the `cn()` utility from `src/lib/utils.ts` to merge and apply conditional classes.

2.  **Icons**:
    -   **Source**: ALWAYS use icons from **Lucide React**.
    -   **Importing**: ALWAYS import icons from the central export file: `src/components/icons/index.ts`.

3.  **Routing and Navigation**:
    -   **Library**: ALWAYS use **React Router DOM**.
    -   **Links**: Use the `<Link>` component for internal navigation.
    -   **Route Definitions**: All routes MUST be defined in `src/App.tsx`.

4.  **Data Fetching and Server State**:
    -   **Library**: ALWAYS use **TanStack Query** for fetching or mutating data.
    -   **Usage**: Use the `useQuery` hook for data retrieval and `useMutation` for creating, updating, or deleting data. Do not use `useEffect` with `fetch` or direct Supabase calls for server state.

5.  **Forms**:
    -   **State Management**: ALWAYS use **React Hook Form** (`useForm`) to manage form state and submissions.
    -   **Validation**: ALWAYS define a **Zod** schema for form validation and connect it using `@hookform/resolvers/zod`.

6.  **Authentication**:
    -   **Client**: ALWAYS use the pre-configured Supabase client from `src/integrations/supabase/client.ts` for all auth operations (`signInWithPassword`, `signOut`, `signUp`, etc.).

7.  **User Notifications**:
    -   **Library**: ALWAYS use the `toast` function from **Sonner** to display success, error, or informational messages to the user.

8.  **Text and Content (i18n)**:
    -   **Implementation**: ALL user-facing text MUST be implemented using the `useTypedTranslation` hook.
    -   **Keys**: Add new translation keys to all language files in `src/locales/[lang]/*.json`. Do not hardcode text in components.