import P from "../../../../components/P.tsx";
import Span from "../../../../components/Span.tsx";
import { fontSize, fontWeight } from "../../../../constant/font.ts";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../http/routes.ts";
import { useMutation } from "@tanstack/react-query";
import {postLogout, queryClient} from "../../../../http/http.ts";
import UserModel from "../../../../models/User/UserModel.ts";

const UserBox = () => {
  const user = queryClient.getQueryData(["user"]) as UserModel | undefined;
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => navigate(pageRoutes.LOGIN),
    onError: () => navigate(pageRoutes.LOGIN),
  });
  const handleLogout = () => {
    // TODO: 로그아웃 API 호출
    // const isLogout = window.confirm("로그아웃 하시겠습니까?");
    // if (isLogout) {
    mutate();
    // }
    // navigate(pageRoutes.LOGIN);
  };

  return (
    <div className="hbox" data-testid="user-box">
      <P
        fontWeight={fontWeight.BOLD}
        fontSize={fontSize.BIG}
        color="--color-primary"
        className='w(100) text(right)'
      >
        {user?.userName ?? ''}
        <Span className="ml(5)" color="--color-text">
          님
        </Span>
      </P>
      <button
        className="ml(15) bg(--color-logout-button) r(50) w(135) h(45) text(pack)"
        onClick={handleLogout}
      >
        <Span>로그아웃</Span>
      </button>
    </div>
  );
};

export default UserBox;
