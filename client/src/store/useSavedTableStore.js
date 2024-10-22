import { create } from "zustand";

const useSavedTableStore = create((set) => ({
  savedRestaurants: [], // 저장된 식당 정보를 담을 배열

  // 식당 정보를 추가하는 함수
  addRestaurant: (restaurant) =>
    set((state) => ({
      savedRestaurants: [...state.savedRestaurants, restaurant],
    })),

  // 식당 정보를 삭제하는 함수 (추가 기능으로 고려)
  removeRestaurant: (restaurantId) =>
    set((state) => ({
      savedRestaurants: state.savedRestaurants.filter(
        (r) => r.id !== restaurantId
      ),
    })),
}));

export default useSavedTableStore;
