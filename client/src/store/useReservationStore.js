import { create } from "zustand";

const useReservationStore = create((set) => ({
  partySize: "1명",
  date: new Date(),
  time: "12:00 PM",
  timeSlot: null,

  setPartySize: (partySize) => set({ partySize }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setTimeSlot: (timeSlot) => set({ timeSlot }),
}));

export default useReservationStore;
