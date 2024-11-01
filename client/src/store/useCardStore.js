import { create } from "zustand";

const initialState = {
  card: {
    cardCompany: "",
    cardNumber: "",
  },
  lastCardNumber: "",
};

const useCardStore = create((set) => ({
  ...initialState,

  setCard: (card) =>
    set({
      card: {
        cardCompany: card.card_company,
        cardNumber: card.card_number,
      },
    }),

  setLastCardNumber: (lastCardNumber) => set({ lastCardNumber }),

  reset: () => set(initialState),
}));

export default useCardStore;
