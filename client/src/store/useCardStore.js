import { create } from "zustand";

const useCardStore = create((set) => ({
  cardCompany: "",
  cardNumber: "",
  lastCardNumber: "",

  setCardCompany: (cardCompany) =>
    set({
      cardCompany,
    }),
  setCardNumber: (cardNumber) =>
    set({
      cardNumber,
    }),
  setLastCardNumber: (cardNumber) => set({ lastCardNumber: cardNumber }),
}));

export default useCardStore;
