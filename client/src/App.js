import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      {/* 메인 라우트 안에 자식 라우트 넣어주기 밑은 예시! */}
      {/* <Route path="/" element={<Main />}>
        <Route path="/restaurant" element={<></>}></Route>
      </Route> */}

      <Route path="/" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
