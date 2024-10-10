import { Dispatch, FC, SetStateAction, useState } from "react";
import P from "../../../../components/P.tsx";
import DownloadButton from "./DownloadButton.tsx";
import DownloadModal from "./DownloadModal.tsx";
import { useMutation } from "@tanstack/react-query";
import { getDownloadImages } from "../../../../http/http.ts";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";

interface DownloadButtonListProps {
  captureIds: number[];
  setIsDownload: Dispatch<SetStateAction<boolean>>;
}

const DownloadButtonList: FC<DownloadButtonListProps> = ({
  captureIds,
  setIsDownload,
}) => {
  const farmId = useGetFarmId();
  
  

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const handleClickDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      getDownloadImages({ _id: farmId, _captureIds: captureIds }),
    retry: 1,
    onSettled: () => {
      setIsDownload(false);
    },
  });

  const handleDownloadAll = async () => {
    setIsDownload(true);
    await mutateAsync();
  };

  return (
    <>
      <div className="hbox gap(8) relative w(175)">
        <DownloadButton onClick={handleDownloadAll}>
          전체 다운로드
        </DownloadButton>
        <P color="--color-nonActive">|</P>
        <DownloadButton onClick={handleClickDownload}>
          선택 다운로드
        </DownloadButton>
        {isDownloadModalOpen && (
          <DownloadModal
            setIsOpen={setIsDownloadModalOpen}
            setIsDownload={setIsDownload}
          />
        )}
      </div>
    </>
  );
};

export default DownloadButtonList;
