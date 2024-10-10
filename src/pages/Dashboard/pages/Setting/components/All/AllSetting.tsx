import Layout from "../../../../../../components/Layout.tsx";
import EntranceSetting from "./EntranceSetting.tsx";
import AlarmSetting from "./AlarmSetting.tsx";
import useFarmData from "../../../../../../hooks/useFarmData.tsx";
import NameSetting from "./NameSetting.tsx";

const AllSetting = () => {
  const farm = useFarmData();

  if (!farm) {
    return null;
  }

  return (
    <Layout className="vbox gap(24)">
      <AlarmSetting />
      <Layout className="hbox gap(24) w(100%)">
        <NameSetting />
        <EntranceSetting />
      </Layout>
    </Layout>
  );
};

export default AllSetting;
