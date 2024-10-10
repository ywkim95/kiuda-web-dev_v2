import LoadingButton from "../../../Loading/LoadingButton.tsx";
import P from "../../../../components/P.tsx";

const LoadingIMGDL = () => {
  return (
    <div className="fixed(0,0) w(100%) h(100%) text(pack) gap(30) bg(black) opacity(0.3) z(100000)">
      <LoadingButton width="60" height="60" />
      <P color="white">이미지를 다운로드 중입니다...</P>
    </div>
  );
};

export default LoadingIMGDL;
