import {
  getGlobalSensorValues,
} from "../../../../../http/http.ts";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import LoadingButton from "../../../../Loading/LoadingButton.tsx";
import GlobalCharts from "./GlobalCharts.tsx";
import GlobalDashboard from "./GlobalDashboard.tsx";
import {FC} from "react";

interface GlobalContainerProps {
    farm: FarmModel;
}

const GlobalContainer: FC<GlobalContainerProps> = ({farm}) => {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["farm", farm.id, "globalValue"],
    queryFn: ({ signal }) => getGlobalSensorValues({ signal, _id: farm.id }),
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
  });

  let content;

  if (isPending) {
    content = (
      <div className="w(100%) h(fill) pack">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="w(100%) h(fill) pack">
        <h1>{error?.code}</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (data) {
    const globalSensors = farm.globalSensors.sort(
      (a, b) => a.id - b.id,
    );

    content = (
      <>
        <GlobalDashboard values={data} sensors={globalSensors} />
        <GlobalCharts sensors={globalSensors} />
      </>
    );
  }

  return <>{content}</>;
};

export default GlobalContainer;
