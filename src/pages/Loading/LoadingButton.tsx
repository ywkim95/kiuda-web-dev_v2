import { FC } from "react";
import styles from "./loading.module.css";

/**
 *   border: 5px solid #f3f3f3;
 *   border-top: 5px solid #ffffff;
 *   border-radius: 50%;
 *   width: 25px;
 *   height: 25px;
 * @constructor
 */
interface LoadingButtonProps {
  width?: string;
  height?: string;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  width = "25",
  height = "25",
}) => {
  return (
    <div
      className={`${styles.spinner} b(5/--color-second-background) bt(5/--color-primary) r(50%) w(${width}) h(${height})`}
    ></div>
  );
};

export default LoadingButton;
