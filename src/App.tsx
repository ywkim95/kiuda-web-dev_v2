import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/http.ts";
import "./constant/axios.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./router.tsx";

const isDevEnv = import.meta.env.DEV;

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {isDevEnv && (
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition="bottom-right"
                />
            )}
        </QueryClientProvider>
    );
}

export default App;
