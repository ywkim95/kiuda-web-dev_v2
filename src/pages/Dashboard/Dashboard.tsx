import { Outlet } from "react-router-dom";
import useFarmLoader from "../../hooks/useFarmLoader.tsx";
import LoadingPage from "../Loading/Loading.tsx";
import ErrorComponent from "../Error/ErrorComponent.tsx";

const DashboardPage = () => {
  const { data, isPending, error, isError } = useFarmLoader();

  let content;

  if (isPending) {
    content = <LoadingPage />;
  }

  if (isError) {
      content = <ErrorComponent error={error} className="h(100%) w(1240) pack bg(--color-background)"/>;
  }

  if (data) {
    content = (
      <>
        <Outlet />
      </>
    );
  }

  return <>{content}</>;
};

export default DashboardPage;
