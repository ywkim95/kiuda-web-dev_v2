import { useState } from "react";
import SectorDetail from "./components/SectorDetail.tsx";
import SectorBoard from "./components/SectorBoard.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSensorValue } from "../../../../http/http.ts";

import LoadingButton from "../../../Loading/LoadingButton.tsx";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import ErrorComponent from "../../../Error/ErrorComponent.tsx";
import {oneHour} from "../../../../constant/date.ts";

const SectorContainer = () => {
  const [detail, setDetail] = useState<number | undefined>(undefined);

  const farmId = useGetFarmId();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["farm", farmId, "sensorValue"],
    queryFn: ({ signal }) => getSensorValue({ signal, _id: farmId }),
      refetchOnWindowFocus: false,
      staleTime: oneHour,
  });

  let content;

  if (isPending) {
    content = (
      <div className="w(100%) h(431) pack">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorComponent className='w(100%) h(431) pack' error={error} />
    );
  }

  if (data) {
    content = (
      <>
        {detail !== undefined ? (
          <SectorDetail detail={detail} setDetail={setDetail} />
        ) : (
          <SectorBoard setDetail={setDetail} />
        )}
      </>
    );
  }

  return <>{content}</>;
};

export default SectorContainer;
