import { create } from "zustand";

const useSearchStore = create((set) => ({
  inputValue: "",
  fetchedRestaurants: [],
  searchLoading: true,
  searchError: false,

  setInputValue: (inputValue) => set({ inputValue }),
  setFetchedRestaurants: (restaurants) =>
    set({ fetchedRestaurants: restaurants }),
  setSearchLoading: (status) => set({ searchLoading: status }),
  setSearchError: (status) => set({ searchError: status }),
}));

export default useSearchStore;
