import { BorderRadius } from "../../../constant/border.ts";
import PodoLogo from "../../../components/svg/PodoLogo.tsx";
import HomeIcon from "../../../components/svg/HomeIcon.tsx";
import P from "../../../components/P.tsx";
import { fontSize } from "../../../constant/font.ts";
import PhoneIcon from "../../../components/svg/PhoneIcon.tsx";
import FileIcon from "../../../components/svg/FileIcon.tsx";
import MailIcon from "../../../components/svg/MailIcon.tsx";

const InfoContent = () => {
    return (
        <div
            className={`w(240) h(262) r(${BorderRadius.INFO}) bg(white) c(--color-text) box-shadow(0/0/30/0/#00000017) pointer p(30) vbox gap(20)`}
        >
            <div className="pack mb(10)">
                <PodoLogo />
            </div>
            <div className="hbox gap(8)">
                <HomeIcon />
                <P fontSize={fontSize.SMALL}>
                    경기도 성남시 수정구 창업로43,
                    <br /> 판교글로벌비즈센터 B1001호 <br />
                    13449 주식회사 포도
                </P>
            </div>
            <div className="hbox gap(8)">
                <PhoneIcon />
                <P fontSize={fontSize.SMALL}>+82 031-759-1488</P>
            </div>
            <div className="hbox gap(8)">
                <FileIcon />
                <P fontSize={fontSize.SMALL}>FAX. 031-789-1489</P>
            </div>
            <div className="hbox gap(8)">
                <MailIcon />
                <P fontSize={fontSize.SMALL}>support@ipodo.co.kr</P>
            </div>
        </div>
    );
};

export default InfoContent;
