import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "./http/routes.ts";
import ProtectedRoute from "./pages/Root/ProtectedRoute.tsx";
import RootPage from "./pages/Root/Root.tsx";
import ErrorPage from "./pages/Error/Error.tsx";
import { loader as rootLoader } from "./pages/Root/util/loader.tsx";
import HomePage from "./pages/Home/Home.tsx";
import CameraPage from "./pages/Camera/Camera.tsx";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";
import SectorPage from "./pages/Dashboard/pages/Sector/Sector.tsx";
import GlobalPage from "./pages/Dashboard/pages/Global/Global.tsx";
import SettingPage from "./pages/Dashboard/pages/Setting/Setting.tsx";
import MonitoringPage from "./pages/Monitoring/Monitoring.tsx";
import LoginPage from "./pages/Login/Login.tsx";
import NotFoundPage from "./pages/Error/NotFound.tsx";
import checkAuth from "./http/checkAuth.ts";

const router = createBrowserRouter([
    {
        path: pageRoutes.ROOT,
        element: (
            <ProtectedRoute isAuthenticated={await checkAuth()}>
                <RootPage />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        id: "root",
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: pageRoutes.CAMERA,
                element: <CameraPage />,
            },
            {
                path: pageRoutes.DASHBOARD,
                element: <DashboardPage />,
                children: [
                    {
                        index: true,
                        element: <SectorPage />,
                    },
                    {
                        path: pageRoutes.INTEGRATED,
                        element: <GlobalPage />,
                    },
                    {
                        path: pageRoutes.SETTING,
                        element: <SettingPage />,
                    },
                ],
            },
            {
                path: pageRoutes.MONITORING,
                element: <MonitoringPage />,
            },
        ],
    },
    {
        path: pageRoutes.LOGIN,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
