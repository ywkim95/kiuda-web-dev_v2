import DashboardCommonHeader from "../../../../components/DashboardCommonHeader.tsx";
import { BorderRadius } from "../../../../../../constant/border.ts";
import DetailChart from "../../../../../Home/components/Sector/components/DetailChart.tsx";
import Section from "../../../../../../components/Section.tsx";
import {
  FC,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
} from "react";
import { Chart, ChartDataset } from "chart.js";
import useIndexStore from "../../../../../../store/useIndexStore.ts";

interface MixedGraphAreaProps extends HTMLAttributes<HTMLElement> {
  handleIndex: (i: number) => void;
  valueIndex: number;
  labels: string[];
  datasets: ChartDataset<"line", number[]>[];
  sensorName: string;
}

const MixedGraphArea: FC<MixedGraphAreaProps> = ({
  handleIndex,
  valueIndex,
  labels,
  datasets,
  sensorName,
  children,
  ...props
}) => {
  const { setGraphIndex } = useIndexStore();

  useEffect(() => {
    setGraphIndex(0);
  }, [setGraphIndex]);

  const handleClickChart = useCallback(
    (
      event: ReactMouseEvent<HTMLCanvasElement, MouseEvent>,
      chart: Chart<"line", number[], string>,
    ) => {
      event.preventDefault();
      const active = chart.getActiveElements();
      if (!active.length) {
        return;
      }
      setGraphIndex(active[0].index);
    },
    [setGraphIndex],
  );

  return (
    <Section height="668" className="p(30) bg(white) relative" {...props}>
      <DashboardCommonHeader
        className="pb(12) h(50) w(fill) mr(80) gap(16) hbox(top) text(middle)"
        onClickPrev={() => handleIndex(valueIndex - 1)}
        onClickNext={() => handleIndex(valueIndex + 1)}
        title={sensorName}
      >
        <div className="absolute(~30,12)">{children}</div>
      </DashboardCommonHeader>
      <div className={`w(675) h(565) r(${BorderRadius.INPUT}) bg(white)`}>
        <DetailChart
          labels={labels}
          datasets={datasets}
          align="start"
          onClick={handleClickChart}
          className={"w(675) h(565) p(10/20)"}
          zeroAtYAxis={false}
        />
      </div>
    </Section>
  );
};

export default MixedGraphArea;
