import MainNavigation from "./components/Navigation/MainNavigation.tsx";
import Information from "./components/Information.tsx";
import AlarmModal from "../Home/components/Alarm/components/AlarmModal.tsx";
import { Suspense } from "react";
import SectorSelectModal from "../Dashboard/pages/Sector/components/Graph/SectorSelectModal.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../Error/Error.tsx";
import LoadingPage from "../Loading/Loading.tsx";
import CameraSettingModal from "../Camera/CameraSettingModal.tsx";
import { RootLoaderData } from "../../constant/type.ts";
import CameraSearchModal from "../Camera/CameraSearchModal.tsx";
import CameraDetailModal from "../Camera/CameraDetailModal.tsx";
import { Await, Outlet, useLoaderData } from "react-router-dom";

const RootPage = () => {
    const { farms }: RootLoaderData = useLoaderData() as RootLoaderData;
    // const {data, isPending, isError} = useQuery({
    //   queryKey: ["user"],
    //   queryFn: ({ signal }) => getFarmList({ signal }),
    //   staleTime: Infinity,
    //   gcTime: Infinity,
    //   retry: 1,
    // })
    //
    //   let content;
    //
    // if(isPending) {
    //     content = <LoadingPage />;
    // }
    //
    // if(isError) {
    //     content = <ErrorPage />
    // }
    //
    // if(data) {
    //     content = <>
    //
    // }

    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={farms}>
                    <main className="w(1240~) h(100vh) bg(white)">
                        <MainNavigation />
                        <div className="pack h(100%-90px) gap(24)">
                            <Outlet />
                            <Information />
                        </div>
                    </main>
                    <AlarmModal />
                    <SectorSelectModal />
                    <CameraSettingModal />
                    <CameraSearchModal />
                    <CameraDetailModal />
                </Await>
            </Suspense>
        </ErrorBoundary>
    );
};

export default RootPage;
