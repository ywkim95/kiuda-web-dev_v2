import OptionSelector from "./components/OptionSelector.tsx";
import SelectedOptions from "./components/SelectedOptions.tsx";
import { FC, useEffect, useState } from "react";
import { CameraItem } from "../../../../constant/type.ts";
import { queryClient } from "../../../../http/http.ts";
import useCameraSearchStore from "../../../../store/useCameraSearchStore.ts";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import P from "../../../../components/P.tsx";
import { BorderRadius } from "../../../../constant/border.ts";
import { fontWeight } from "../../../../constant/font.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import useModalStore from "../../../../store/useModalStore.ts";
import PaginationImageModel from "../../../../models/Image/PaginationImageModel.ts";
import FarmModel from "../../../../models/Farm/FarmModel.ts";

const CameraSearchContainer: FC = () => {
  const { setModal } = useModalStore();
  const { cameraList, setCameraList, page } = useCameraSearchStore();
  const farmId = useGetFarmId();

  const farm = queryClient.getQueryData<FarmModel>([
    "farm",
    farmId,
  ]) as FarmModel;

  const data = queryClient.getQueryData<PaginationImageModel>([
    "farm",
    farmId,
    "Images",
      {page}
  ]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (cameraList.length === 0 && farm.cameras.length > 0) {
      const initialCameraList: CameraItem[] = farm.cameras.map((camera) => {
        return {
          id: camera.id,
          alias: camera.alias,
          selected: false,
        };
      });
      setCameraList(initialCameraList);
    }
  }, [cameraList.length, farm.cameras, setCameraList]);

  const handleClick = async () => {
    setIsLoading(true);

    await queryClient.refetchQueries({
      queryKey: ["farm", farmId, "Images",{page}],
    });
    
    setModal(undefined);

    setIsLoading(false);
  };

  let content;

  if (!data) {
    content = (
      <div className="w(100%) h(100%) vbox(center+middle) gap(8)">
        <P>에러 발생</P>
      </div>
    );
  } else {
    content = (
      <>
        <div className="hbox gap(16) items-end">
          <OptionSelector />
          <div className="vbox">
            <SelectedOptions />
          </div>
        </div>

        <button
          className={`w(222) h(50) bg(--color-primary) r(${BorderRadius.INPUT}) pack mt(40)`}
          onClick={handleClick}
        >
            {isLoading ? <LoadingButton />
                :<P fontWeight={fontWeight.BOLD} color="--color-box">
                    적용
                </P>}
        </button>
      </>
    );
  }

  return <>{content}</>;
};

export default CameraSearchContainer;
