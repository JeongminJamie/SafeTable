import { create } from "zustand";

const useUserStore = create((set) => ({
  userData: {
    userName: "",
    userEmail: "",
    userContact: "",
    userLocation: "",
  },
  setUserData: (newData) =>
    set((state) => ({ userData: { ...state.userData, ...newData } })),
}));

export default useUserStore;
