import useModalStore from "../../store/useModalStore.ts";
import Modal from "../../components/Modal/Modal.tsx";
import ModalType from "../../components/Modal/ModalType.ts";
import {BorderRadius} from "../../constant/border.ts";
import {Form} from "react-router-dom";
import {FormEvent} from "react";
import {registerInfoType} from "../../http/httpType.ts";
import {useMutation} from "@tanstack/react-query";
import {postRegister} from "../../http/http.ts";
import InputField from "./InputField.tsx";
import CloseButtonIcon from "../../components/svg/CloseButtonIcon.tsx";

const RegisterModal = () => {
    const {modal, setModal} = useModalStore();
    
    const {mutate} = useMutation({
        mutationFn: postRegister,
        onSuccess: async () => {
            // 회원가입 성공시 알람을 3초간 띄워준 후 모달 종료
            setModal(undefined);
        },
    })
    
    const handleClose = () => setModal(undefined);
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const farmData = new FormData(event.currentTarget);
        
        const entries = Object.fromEntries(farmData) as {} as registerInfoType;
        
        const registerInfo: registerInfoType = {
            id: entries.id,
            password: entries.password,
            name: entries.name,
            cellPhone: entries.cellPhone,
            email: entries.email,
        };
        mutate({registerInfo});
    };
    
    return (
        <Modal
            open={modal === ModalType.Register}
            onClose={handleClose}
            className={`w(600) m(auto) pack bg(transparent) b(none)`}
        >
            <Form
                method="POST"
                className={`w(420) vbox gap(24) p(30) bg(white) r(${BorderRadius.MAIN})`}
                onSubmit={handleSubmit}
            >
                <InputField testId='id-input' label='아이디' name='id' id='id'/>
                <InputField testId='password-input' label='비밀번호' name='password' id='password' type='password'/>
                <InputField testId='name-input' label='이름' name='name' id='name'/>
                <InputField testId='cellPhone-input' label='전화번호' name='cellPhone' id='cellPhone' type='tel'/>
                <InputField testId='email-input' label='이메일' name='email' id='email' type='email'/>
                <div className='hbox(right)'>
                    <button type='button' onClick={handleClose} className='w(110)'>취소</button>
                    <button
                        className={`bg(--color-primary) w(110) c(white) h(50) r(${BorderRadius.INPUT})`}
                        type='submit'
                        data-testid='register-button'
                    >
                        회원가입
                    </button>
                </div>
            </Form>
            <button
                className="fixed(~20,20)"
                onClick={handleClose}
                data-testid="close-button"
            >
                <CloseButtonIcon/>
            </button>
        </Modal>
    );
};

export default RegisterModal;
