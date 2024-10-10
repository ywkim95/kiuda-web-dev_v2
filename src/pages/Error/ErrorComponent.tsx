import {FC} from "react";
import {AxiosError} from "axios";

interface ErrorComponentProps {
    error?: AxiosError<any, any> | null;
    className: string;
}

const ErrorComponent:FC<ErrorComponentProps> = ({className, error}) => {
    return (
        <div className={className}>
            <h1>{error?.code}</h1>
            <p>{error?.message}</p>
        </div>
    );
};

export default ErrorComponent;
