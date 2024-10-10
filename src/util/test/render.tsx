import {
  createMemoryRouter,
  MemoryRouterProps,
  RouterProvider,
} from "react-router-dom";
import { ReactNode } from "react";
import { userEvent } from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../http/http.ts";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: true,
//     }
//   },
//   // logger: {
//   //   log: console.log,
//   //   warn: console.warn,
//   //   error: import.meta.env.DEV ? () => {} : console.error,
//   // },
// });

const routeRender = async (
  component: ReactNode,
  options: { routerProps?: MemoryRouterProps } = {},
) => {
  const { routerProps } = options;
  const user = userEvent.setup();

  const router = createMemoryRouter(
    [{ path: "*", element: component }],
    routerProps,
  );

  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
  };
};

export default routeRender;
