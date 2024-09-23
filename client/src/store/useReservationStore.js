import { create } from "zustand";

const useReservationStore = create((set) => ({
  partySize: "1명",
  date: new Date(),
  time: "12:00 PM",
  timeSlot: null,
  deposit: 5000,
  isPaymentModalOpen: false,
  isReservationChecked: false,

  setPartySize: (partySize) => {
    const numberdPartySize = Number(partySize.split("명")[0]);
    set({ partySize, deposit: 5000 * numberdPartySize });
  },
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setTimeSlot: (timeSlot) => set({ timeSlot }),
  setIsPaymentModalOpen: (status) => set({ isPaymentModalOpen: status }),
  setIsReservationChecked: (status) => set({ isReservationChecked: status }),

  resetTime: () =>
    set({
      time: "12:00 PM",
    }),
  resetReservation: () =>
    set({
      partySize: "1명",
      date: new Date(),
      time: "12:00 PM",
      timeSlot: null,
      deposit: 5000,
      isPaymentModalOpen: false,
      isReservationChecked: false,
    }),
}));

export default useReservationStore;
