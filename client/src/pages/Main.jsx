import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>Main Page</h1>
      {/* 컴포넌트로 수정하기 */}
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default Main;
