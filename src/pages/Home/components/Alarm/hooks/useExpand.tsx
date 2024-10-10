import useModalStore from "../../../../../store/useModalStore.ts";
import { useEffect, useState } from "react";
import ModalType from "../../../../../components/Modal/ModalType.ts";

const useExpand = () => {
  const { modal } = useModalStore();
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    if (modal === ModalType.Alarm) {
      setTimeout(() => {
        setIsExpand(false);
      }, 300);
    }
  }, [modal]);

  const handleExpand = () => setIsExpand(prev => !prev);

  return { isExpand, handleExpand };
};
export default useExpand;
