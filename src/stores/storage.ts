import { Preferences } from "@capacitor/preferences";
import { store } from "./store";

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

// Função para salvar a store no dispositivo
export async function saveStoreToDevice() {
  const storeData = JSON.stringify(store); // Converte a store em uma string JSON
  await Preferences.set({ key: 'data', value: storeData });
}
