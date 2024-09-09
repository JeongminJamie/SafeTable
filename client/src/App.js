import "./index.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SafeTable from "./pages/SafeTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/safetable" element={<SafeTable />}></Route>
    </Routes>
  );
}

export default App;
