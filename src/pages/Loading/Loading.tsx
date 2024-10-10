import P from "../../components/P.tsx";
import { fontSize } from "../../constant/font.ts";
import LoadingButton from "./LoadingButton.tsx";

const LoadingPage = () => {
  return (
    <div className="fixed(0,90) w(100%) h(100%-90px) bg(transparent) vpack gap(15)">
      <LoadingButton height='50' width='50' />
      <P fontSize={fontSize.BIG}>자료를 불러오는 중입니다...</P>
    </div>
  );
};

export default LoadingPage;
