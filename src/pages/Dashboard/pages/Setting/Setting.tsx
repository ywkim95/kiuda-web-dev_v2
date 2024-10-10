import { useState } from "react";
import Layout from "../../../../components/Layout.tsx";
import P from "../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../constant/font.ts";
import Divider from "../../../../components/svg/Divider.tsx";
import AllSetting from "./components/All/AllSetting.tsx";
import EachSetting from "./components/Each/EachSetting.tsx";

const SettingPage = () => {
  const [isAll, setIsAll] = useState(true);

  return (
    <Layout className="w(1240) h(100%)">
      <div className="hbox my(40)">
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.ExtraBIG}
          color={!isAll ? "--color-nonActive" : "--color-primary"}
          className="pointer"
          onClick={() => setIsAll(true)}
        >
          전체 설정
        </P>
        <div className="px(10)">
          <Divider isBig={true} />
        </div>
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.ExtraBIG}
          color={isAll ? "--color-nonActive" : "--color-primary"}
          className="pointer"
          onClick={() => setIsAll(false)}
        >
          개별 설정
        </P>
      </div>
      {isAll && <AllSetting />}
      {!isAll && <EachSetting />}
    </Layout>
  );
};

export default SettingPage;
