import { create } from "zustand";

const useRestaurantStore = create((set) => ({
  searchedValue: "",
  fetchedRestaurants: [],
  searchLoading: true,
  searchError: false,

  setSearchedValue: (searchedValue) => set({ searchedValue }),
  setFetchedRestaurants: (restaurants) =>
    set({ fetchedRestaurants: restaurants }),
  setSearchLoading: (status) => set({ searchLoading: status }),
  setSearchError: (status) => set({ searchError: status }),
}));

export default useRestaurantStore;
