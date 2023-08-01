import { writable } from "svelte/store";

type Store = {
  drinkedWater: number;
  waterGoal: number;
  exercised: number;
  exerciseGoal: number;
  waterPerNotification: number;
  today: string;
  items: Array<Item>;
};

type Item = {
  id: number;
  goal: number;
  type: string;
  date: string;
}

const initialState: Store = {
  drinkedWater: 0,
  waterGoal: 2000,
  exercised: 0,
  exerciseGoal: 10,
  waterPerNotification: 200,
  today: new Date().toISOString().slice(0, 10),
  items: [],
};

const customStore = () => {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    set,
    update,
    reset: () => set(initialState),
    setDrinkedWater: (value: number) =>
      update((store) => ({ ...store, drinkedWater: value })),
    setWaterGoal: (value: number) =>
      update((store) => ({ ...store, waterGoal: value })),
    setExercised: (value: number) =>
      update((store) => ({ ...store, exercised: value })),
    setExerciseGoal: (value: number) =>
      update((store) => ({ ...store, exerciseGoal: value })),
    setWaterPerNotification: (value: number) =>
      update((store) => ({ ...store, waterPerNotification: value })),
    setToday: (value: string) => update((store) => ({ ...store, today: value })),
    setItems: (value: Array<Item>) => update((store) => ({ ...store, items: value })),
    addItem: (item: Item) => update((store) => ({ ...store, items: [...store.items, item] })),
    removeItem: (id: number) => update((store) => ({ ...store, items: store.items.filter((item) => item.id !== id) })),
  };
}
