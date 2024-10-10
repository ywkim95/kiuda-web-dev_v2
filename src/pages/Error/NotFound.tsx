import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import { useNavigate } from "react-router-dom";
import NavigateButton from "./NavigateButton.tsx";

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  const handleHome = () => navigate("/", { replace: true });
  
  return (
    <div className="w(100%) h(100vh) text(pack)">
      <P fontWeight={fontWeight.BOLD} fontSize={48}>
        Error Code 404
      </P>
      <P
        fontWeight={fontWeight.NORMAL}
        fontSize={fontSize.ExtraBIG}
        className="mt(16)"
      >
        페이지를 찾을 수 없습니다.
      </P>
      <div className="hbox m(32)">
        <NavigateButton onClick={handleHome}>
          홈으로
        </NavigateButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
