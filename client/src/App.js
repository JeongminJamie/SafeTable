import "./index.css";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Loading from "./components/Loading";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorPage from "./pages/ErrorPage";

const Main = lazy(() => import("./pages/Main"));
const SafeTable = lazy(() => import("./pages/SafeTable"));
const About = lazy(() => import("./pages/About"));
const Reservation = lazy(() => import("./pages/Reservation"));
const ReservationCompleted = lazy(() => import("./pages/ReservationCompleted"));
const MyPage = lazy(() => import("./pages/MyPage"));

function App() {
  const location = useLocation();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <ScrollTop />
      {location.pathname !== "/" && <Header />}
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorPage}>
        <Suspense
          fallback={
            <Loading
              entireHeight="min-h-screen"
              width="w-32"
              height="h-32"
              padding="p-10 mt-24 mb-24"
            />
          }
        >
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/about" element={<About />}></Route>
            {/* safetable은 로딩중일 때 skeleton 로딩 화면 */}
            <Route path="/safetable" element={<SafeTable />}></Route>
            <Route path="/reservation/:seq" element={<Reservation />}></Route>
            <Route
              path="/reservation-completed"
              element={<ReservationCompleted />}
            ></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
