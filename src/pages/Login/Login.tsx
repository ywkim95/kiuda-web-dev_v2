import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import { BorderRadius } from "../../constant/border.ts";
import { Form, useNavigate } from "react-router-dom";
import { pageRoutes } from "../../http/routes.ts";
import { postLogin, postRefreshToken } from "../../http/http.ts";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import LoadingButton from "../Loading/LoadingButton.tsx";
import InputField from "./InputField.tsx";
import { userInfoType } from "../../http/httpType.ts";
import useModalStore from "../../store/useModalStore.ts";
import ModalType from "../../components/Modal/ModalType.ts";
import RegisterModal from "./RegisterModal.tsx";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { setModal } = useModalStore();

    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: postLogin,
        onSuccess: () => {
            navigate(pageRoutes.ROOT);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData);

        const entries = Object.fromEntries(formData) as unknown as userInfoType;

        const userInfo: userInfoType = {
            id: entries.id,
            password: entries.password,
            autoLoginRequest: !!entries.autoLoginRequest,
        };

        mutate({ userInfo });
    };

    const handleRegister = () => setModal(ModalType.Register);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await postRefreshToken();
                if (response === 200) {
                    navigate(pageRoutes.ROOT);
                } else {
                    setIsLoading(false);
                }
            } catch (e) {
                console.error("Failed to refresh token", error);
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [navigate]);

    let content;

    if (isLoading) {
        content = (
            <div className="w(100%) vbox text(pack) gap(24)">
                <LoadingButton height="60" width="60" />
                <P>로딩 중입니다...</P>
            </div>
        );
    } else {
        content = (
            <div className="w(100%) vbox gap(24) p(30)">
                <P fontWeight={fontWeight.BOLD} fontSize={fontSize.ExtraBIG}>
                    Kiuda Platform
                </P>
                <InputField
                    label="아이디"
                    testId="id-input"
                    name="id"
                    id="id"
                />
                <InputField
                    label="비밀번호"
                    testId="password-input"
                    name="password"
                    id="password"
                    type="password"
                />
                <div className="w(100%) h(20) hbox gap(16)">
                    <input
                        name="autoLoginRequest"
                        id="autoLoginRequest"
                        type="checkbox"
                    />
                    <label htmlFor="autoLoginRequest">자동 로그인</label>
                </div>
                <div className="w(100%) hbox(right) gap(8)">
                    <button
                        className={`w(110) h(50) bg(transparent)`}
                        onClick={handleRegister}
                        type="button"
                    >
                        <P
                            fontSize={fontSize.BIG}
                            fontWeight={fontWeight.BOLD}
                            color="--color-text"
                            className="hover:c(--color-primary)"
                        >
                            회원가입
                        </P>
                    </button>
                    <button
                        className={`w(110) h(50) bg(--color-primary) r(${BorderRadius.INPUT}) hover:bg(--color-text) pack`}
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? (
                            <LoadingButton />
                        ) : (
                            <P
                                fontSize={fontSize.BIG}
                                fontWeight={fontWeight.BOLD}
                                color="white"
                            >
                                로그인
                            </P>
                        )}
                    </button>
                </div>
                {isError && (
                    <div className="vbox gap(4)">
                        <P fontWeight={fontWeight.BOLD} color="--color-error">
                            {error?.code}
                        </P>
                        <P fontSize={fontSize.SMALL}>{error?.message}</P>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <Form
                method="POST"
                className="w(768~) h(100vh) bg(--color-background) pack"
                onSubmit={handleSubmit}
            >
                <div
                    className={`w(420) bg(white) pack box-shadow(4/12/30/0/#00000017) r(${BorderRadius.MAIN})`}
                >
                    {content}
                </div>
            </Form>
            <RegisterModal />
        </>
    );
};

export default LoginPage;
