import GlobalContainer from "./components/GlobalContainer.tsx";
import useFarmLoader from "../../../../hooks/useFarmLoader.tsx";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { getFarmDetail } from "../../../../http/http.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
// import {oneHour} from "../../../../constant/date.ts";
// import {dateSort, idSort} from "../../../../util/Util.ts";

const GlobalPage = () => {
  // const farmId = useGetFarmId();
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["farm", farmId],
  //   queryFn: ({ signal }) => getFarmDetail({ signal, _id: farmId }),
  //   retry: 1,
  //   placeholderData: keepPreviousData,
  //   refetchOnWindowFocus: false,
  //   staleTime: oneHour,
  //   select: (data) => {
  //       const sectors = idSort(data.sectors);
  //       const globalSensors = idSort(data.globalSensors);
  //       const images = idSort(data.images.map((image) => ({...image, id: image.cameraId})));
  //       const cameras = idSort(data.cameras);
  //       const sectorAlarms = dateSort(data.sectorAlarms);
  //       const globalAlarms = dateSort(data.globalAlarms);
  //       return {
  //           ...data,
  //           sectors,
  //           globalSensors,
  //           images,
  //           cameras,
  //           sectorAlarms,
  //           globalAlarms,
  //       }
  //   }
  // });
    
  const {data,isPending, isError, error} = useFarmLoader();

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
    content = (
      <>
        <GlobalContainer farm={data} />
      </>
    );
  }

  return <>{content}</>;
};

export default GlobalPage;
