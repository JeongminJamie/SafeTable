import { create } from "zustand";

const useReservationStore = create((set) => ({
  partySize: "1명",
  date: new Date(),
  time: "12:00 PM",
  timeSlot: null,
  deposit: 5000,

  setPartySize: (partySize) => {
    const numberdPartySize = Number(partySize.split("명")[0]);
    set({ partySize, deposit: 5000 * numberdPartySize });
  },
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setTimeSlot: (timeSlot) => set({ timeSlot }),

  resetReservation: () =>
    set({
      partySize: "1명",
      date: new Date(),
      time: "12:00 PM",
      timeSlot: null,
      deposit: 5000,
    }),
}));

export default useReservationStore;
