import { create } from "zustand";

const useRestaurantStore = create((set) => ({
  searchedValue: "",
  fetchedRestaurants: [],

  setSearchedValue: (searchedValue) => set({ searchedValue }),
  setFetchedRestaurants: (restaurants) =>
    set({ fetchedRestaurants: restaurants }),
}));

export default useRestaurantStore;
