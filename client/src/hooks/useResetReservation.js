import { useEffect } from "react";
import useReservationStore from "../store/useReservationStore";

const useResetReservation = () => {
  const { resetReservation } = useReservationStore();

  useEffect(() => {
    const handleBeforeUnload = () => {
      resetReservation();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [resetReservation]);
};

export default useResetReservation;
