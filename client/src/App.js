import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

import Main from "./pages/Main";
import SafeTable from "./pages/SafeTable";
import About from "./pages/About";
import Reservation from "./pages/Reservation";
import ReservationCompleted from "./pages/ReservationCompleted";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollTop />
      {location.pathname !== "/" && <Header />}
      <div>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/safetable" element={<SafeTable />}></Route>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route
            path="/reservation-completed"
            element={<ReservationCompleted />}
          ></Route>
        </Routes>
      </div>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
