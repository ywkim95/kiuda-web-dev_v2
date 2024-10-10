import SettingHeader from "../SettingHeader.tsx";
import Section from "../../../../../../components/Section.tsx";
import generateSectors from "../generateSectors.tsx";
import useEntranceSetting from "../../hooks/useEntranceSetting.tsx";
import SectorSettingBaseArea from "./SectorSettingBaseArea.tsx";
import useFarmData from "../../../../../../hooks/useFarmData.tsx";

const EntranceSetting = () => {
  const farm = useFarmData();

  const { handleSave, handleRollback, entrances, setEntrances, isShow } =
    useEntranceSetting({ farm: farm! });
  const sectors = generateSectors(farm!);

  return (
    <Section className="w(608) h(355)">
      <SettingHeader
        title="구역 입구"
        onSave={handleSave}
        onRollback={handleRollback}
        isShow={isShow}
      />
      <SectorSettingBaseArea
        row={farm!.sectorRow}
        col={farm!.sectorCol}
        entrances={entrances}
        setEntrances={setEntrances}
        isSetting={true}
      >
        {sectors}
      </SectorSettingBaseArea>
    </Section>
  );
};

export default EntranceSetting;
