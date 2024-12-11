import React from "react";
import ErrorFallback from "../components/Error/ErrorFallback";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const status = error?.status;

  const handleClickButton = () => {
    location.pathname === "/" ? resetErrorBoundary() : navigate("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 m-auto min-h-screen">
        <ErrorFallback status={status} />
        <button
          onClick={handleClickButton}
          className="w-24 h-10 text-base text-white bg-amber-400 font-medium rounded"
        >
          {location.pathname === "/" ? "새로 고침" : "홈으로"}
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
