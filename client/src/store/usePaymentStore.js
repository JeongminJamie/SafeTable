import { create } from "zustand";

const usePaymentStore = create((set) => ({
  lastCardNumber: null,

  setLastCardNumber: (cardNumber) => set({ lastCardNumber: cardNumber }),
}));

export default usePaymentStore;
