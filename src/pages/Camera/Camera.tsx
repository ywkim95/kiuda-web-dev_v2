import useFarmLoader from "../../hooks/useFarmLoader.tsx";
import LoadingButton from "../Loading/LoadingButton.tsx";
import P from "../../components/P.tsx";
import ImageContainer from "./components/ImageContainer.tsx";

const CameraPage = () => {
  const { data, isPending, isError, error } = useFarmLoader();

  let content;

  if (isPending) {
    content = (
      <div className="w(100%) h(738) vbox(center+middle) gap(8)">
        <LoadingButton />
        <P>자료를 불러오는 중입니다...</P>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="h(738) w(1240) pack bg(--color-background)">
        <h1>{error?.code}</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (data) {
    content = <ImageContainer />;
  }

  return <div className="w(1240) h(fill) vbox(center) gap(24)">{content}</div>;
};

export default CameraPage;
