import Alarm from "./components/Alarm.tsx";
import { BorderRadius } from "../../../../constant/border.ts";
import Span from "../../../../components/Span.tsx";
import useModalStore from "../../../../store/useModalStore.ts";
import ModalType from "../../../../components/Modal/ModalType.ts";
import Section from "../../../../components/Section.tsx";
import useExpand from "./hooks/useExpand.tsx";
import SectorModel from "../../../../models/Sector/SectorModel.ts";
import AlarmModel from "../../../../models/Alarm/AlarmModel.ts";
import {FC} from "react";

interface AlarmContainerProps {
    alarms: AlarmModel[];
    sectors: SectorModel[];
}

const AlarmContainer:FC<AlarmContainerProps> = ({alarms, sectors}) => {
  const { isExpand, handleExpand } = useExpand();
  const { setModal } = useModalStore();
  
  const handleOpenModal = () => setModal(ModalType.Alarm);

  const expandContent = isExpand ? "Collapse" : "Expand";

  const renderAlarmList = () => {
    return alarms.map((alarm) => {
      const sector = sectors.find((sector) =>
        sector.sensors.some((sensor) => sensor.id === alarm.sensorId),
      );

      if (!sector) {
        return null;
      }

      const sensor = sector.sensors.find((sensor) => sensor.id === alarm.sensorId);

      if (!sensor) {
        return null;
      }

      const alias = sector.alias ?? `구역 ${sector.row}-${sector.col}`;

      return (
        <Alarm
          key={alarm.time + alarm.sensorId}
          data={alarm}
          alias={alias}
          sensorSpec={sensor.sensorSpec}
        />
      );
    });
  };

  const content =
    alarms.length > 0 ? (
      <>
        <div className="hbox(top) pb(16) h(383)">
          <div className="vbox gap(14) w(fill)">{renderAlarmList()}</div>
          <div onClick={handleExpand} className="pointer">
            <img
              src={`/assets/icons/${expandContent}.png`}
              alt={expandContent}
              data-testid={expandContent}
            />
          </div>
        </div>
        <div className="px(4)">
          <button
            className={`w(100%) h(50) bg(--color-primary) r(${BorderRadius.INPUT}) `}
            onClick={handleOpenModal}
          >
            <Span fontWeight={700} color="white">
              자세히 보기
            </Span>
          </button>
        </div>
      </>
    ) : (
      <div className="w(100%) h(100%) pack gap(auto) pl(150)">
        <Span>알람 내역이 없습니다.</Span>
        <button className={`w(80) h(40) bg(--color-primary) r(${BorderRadius.INPUT})`} onClick={handleOpenModal}>
            <Span fontWeight={700} color="white">상세 검색</Span>
        </button>
      </div>
    );

  return (
    <div className="relative h(56) r(14)">
      <Section
        height={isExpand ? "463" : "56"}
        className={`p(16) clip absolute(0) bg(white) z(100) ${isExpand ? "transition(0.2s)" : ""}`}
      >
        {content}
      </Section>
      {!isExpand && (
        <div
          className={`absolute x(center) y(~0) w(420) height(2px) bg(white) z(101)`}
        />
      )}
    </div>
  );
};

export default AlarmContainer;
