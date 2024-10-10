import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
// import { useNavigate } from "react-router-dom";
import NavigateButton from "./NavigateButton.tsx";

const ErrorPage = () => {
  // const navigate = useNavigate();
  
  // const handleBack = () => navigate(-1);
  
  // const handleHome = () => navigate("/", {replace: true})
    
  const handleRefresh = () => window.location.reload();
  
  return (
    <div className="w(100%) h(100vh) text(pack)">
      <P fontWeight={fontWeight.BOLD} fontSize={48}>
        오류가 발생했습니다.
      </P>
      <P
        fontWeight={fontWeight.NORMAL}
        fontSize={fontSize.ExtraBIG}
        className="mt(16)"
      >
        잠시 후 다시 시도해주세요.
      </P>
      <div className="hbox gap(24) m(32)">
        <NavigateButton onClick={handleRefresh}>
          새로고침
        </NavigateButton>
        {/*<NavigateButton onClick={handleBack}>*/}
        {/*  뒤로가기*/}
        {/*</NavigateButton>*/}
        {/*<NavigateButton onClick={handleHome}>*/}
        {/*  홈으로*/}
        {/*</NavigateButton>*/}
      </div>
    </div>
  );
};

export default ErrorPage;
