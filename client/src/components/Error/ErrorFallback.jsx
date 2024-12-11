import React from "react";
import NotFound from "./NotFound";
import UnAuthorized from "./UnAuthorized";
import Forbidden from "./Forbidden";
import InternalServerError from "./\bInternalServerError";

const ErrorFallback = ({ error }) => {
  const status = error?.status;

  switch (status) {
    case 401:
      return <UnAuthorized status={status} />;
    case 403:
      return <Forbidden status={status} />;
    case 404:
      return <NotFound status={status} />;
    case 500:
      return <InternalServerError status={status} />;
    default:
      return (
        <div className="flex flex-col justify-content align-center">
          <img
            src="/assets/error/internalerror.png"
            className="w-10 h-10"
            alt="error"
          />
          <p>알 수 없는 오류가 발생했습니다.</p>
        </div>
      );
  }
};

export default ErrorFallback;
