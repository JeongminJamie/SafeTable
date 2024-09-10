import "./index.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/about"></Route>
      <Route path="/reservation" element={<Reservation />}></Route>
    </Routes>
  );
}

export default App;
