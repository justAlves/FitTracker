/* eslint-disable @typescript-eslint/no-misused-promises */
import { store } from "$stores/store";
import { LocalNotifications } from "@capacitor/local-notifications";
import { push } from "svelte-spa-router";
import { Preferences } from "@capacitor/preferences";
interface Notification {
  initialHour: number;
  finalHour: number;
  waterPerNotification?: number;
  exercised?: number;
  exerciseGoal?: number;
  drinkedWater?: number;
  waterGoal?: number;
  items?: any;
  today?: string;
}

export async function registerActions() {
  await LocalNotifications.registerActionTypes({
    types: [
      {
        id: "Water",
        actions: [
          {
            id: "registerWater",
            title: "Registrar consumo",
          },
        ],
      },
      {
        id: "Exercise",
        actions: [
          {
            id: "registerExercise",
            title: "Registrar pausa",
          },
        ],
      }
    ],
  });
}

const {
  waterPerNotification,
  drinkedWater,
  exercised,
  waterGoal,
  exerciseGoal,
  initialHour,
  finalHour,
  items,
  today
}: Notification = store.get();

console.log(store.get());

const register = (type: string) => {
  const item = {
    id: new Date().getTime(),
    goal: type === "water" ? waterPerNotification : 1,
    type: type,
    date: new Date().toISOString().slice(0, 10),
  };

  const currentGoal = drinkedWater;
  store.addItem(item);

  if (item.type === "water") {
    store.setDrinkedWater(currentGoal + item.goal);
  } else {
    store.setExercised(currentGoal + item.goal);
  }

  store.subscribe(async (value) => {
    await Preferences.set({ key: 'data', value: JSON.stringify(value) });
  }
  );

};

await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
  const route = notification.notification.extra.route;
  await push(route);

  if (notification.actionId === 'registerWater') {
    register("water");
  } else {
    register("exercise");
  }
});

export async function callWaterNotification() {

  const hour = new Date().getHours();

  if (drinkedWater >= waterGoal || initialHour > hour || finalHour < hour) return;

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Hidrate-se: É hora de beber água!",
          body: `A hidratação é essencial para o seu bem-estar. Que tal beber ${waterPerNotification}ml de água?`,
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 60 * 15),
            allowWhileIdle: true,
            repeats: true,
          },
          sound: null,
          attachments: null,
          actionTypeId: "Water",
          extra: {
            route: "/"
          },
        },
      ],
    }).then(() => {
      console.log('Notification set');
    });

  } catch (error) {
    console.log(error);
  }
}

export async function callExerciseNotification() {

  const hour = new Date().getHours();

  if (exercised >= exerciseGoal || initialHour > hour || finalHour < hour) return; // Não notificar se já atingiu a meta ou se não estiver no horário

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Faça uma pausa para o bem da sua saúde!",
          body: `Que tal uma pausa para um alongamento ou uma caminhada rápida? Cuide do seu corpo e mente agora mesmo!`,
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 60 * 30),
            allowWhileIdle: true,
          },
          sound: null,
          attachments: null,
          actionTypeId: "Exercise", // Defina um ID de ação exclusivo para identificar essa ação
          extra: {
            route: "/exercise"
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}



