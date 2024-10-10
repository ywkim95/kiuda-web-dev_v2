import {FC, ReactNode} from "react";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import {isAxiosError} from "axios";

interface ApiErrorBoundaryProps {
  children: ReactNode;   
}

const APIErrorFallback = ({error, resetErrorBoundary}:FallbackProps) => {
    if(isAxiosError<{errorCode: string; message: string;}>(error)){
        const responseBody = error.response?.data;
        return (
            <div>
                <h1>{responseBody?.errorCode}</h1>
                <p>{responseBody?.message}</p>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        );
    }
};

const ApiErrorBoundary:FC<ApiErrorBoundaryProps> = ({children}) => {
    const {reset} = useQueryErrorResetBoundary();
    
    return (
        <ErrorBoundary FallbackComponent={APIErrorFallback} onReset={reset}>
            {children}
        </ErrorBoundary>
    );
};

export default ApiErrorBoundary;
