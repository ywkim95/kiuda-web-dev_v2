import {useGetFarmId} from "../../../../hooks/useFarmLoader.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getFarmDetail} from "../../../../http/http.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import SectorContainer from "./components/SectorContainer.tsx";
import {oneHour} from "../../../../constant/date.ts";

const SectorPage = () => {
  const farmId = useGetFarmId();
  const { data, isPending, isError, error } = useQuery({
      queryKey: ["farm", farmId],
      queryFn: ({ signal }) => getFarmDetail({ signal, _id: farmId }),
      retry: 1,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      staleTime: oneHour,
      select: (data) => {
          return {
              ...data,
              sectors: data.sectors.sort((a,b) => a.id -b.id),
              globalSensors: data.globalSensors.sort((a,b) => a.id-b.id),
              images: data.images.sort((a,b) => a.cameraId - b.cameraId),
              cameras: data.cameras.sort((a,b) => a.id - b.id),
              sectorAlarms: data.sectorAlarms.sort((a,b) => {
                  const dateA = new Date(a.time);
                  const dateB = new Date(b.time);
                  return dateB.getTime() - dateA.getTime();
              }),
              globalAlarms: data.globalAlarms.sort((a,b) => {
                  const dateA = new Date(a.time);
                  const dateB = new Date(b.time);
                  return dateB.getTime() - dateA.getTime();
              }),
          }
      }
  });
  
  let content;
  
  if(isPending) {
    content = (
      <div className="w(100%) h(fill) pack">
        <LoadingButton />
      </div>
    );
  }
  
    if(isError) {
        content = (
        <div className="w(100%) h(fill) pack">
            <h1>{error?.code}</h1>
            <p>{error?.message}</p>
        </div>
        );
    }
    
    if(data) {
        content = (
        <>
            <SectorContainer farm={data} />
        </>
        );
    }
    
    return <>{content}</>;
};

export default SectorPage;
