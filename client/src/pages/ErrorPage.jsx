import React from "react";
import ErrorFallback from "../components/Error/ErrorFallback";
import Header from "../components/Header";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-content align-center gap-5 m-auto min-h-screen">
        <ErrorFallback error={error} />
        <button onClick={resetErrorBoundary}>새로 고침</button>
      </div>
    </>
  );
};

export default ErrorPage;
