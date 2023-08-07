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
}

export async function registerActions() {
  await LocalNotifications.registerActionTypes({
    types: [
      {
        id: "Water",
        actions: [
          {
            id: "register",
            title: "Registrar consumo",
          },
        ],
      },
    ],
  });
}

const currentStore = store.get();

const register = async () => {
  const item = {
    id: new Date().getTime(),
    goal: currentStore.waterPerNotification,
    type: 'water',
    date: new Date().toISOString().slice(0, 10),
  };

  const currentGoal = currentStore.drinkedWater;
  store.addItem(item);

  if (item.type === "water") {
    store.setDrinkedWater(currentGoal + item.goal);
  } else {
    store.setExercised(currentGoal + item.goal);
  }



  await Preferences.set({
    key: "data",
    value: JSON.stringify(curretData),
  });
};

await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
  const route = notification.notification.extra.route;
  await push(route);

  if (notification.actionId === 'register') {
    await register();
  }
});

console.log(currentStore);

export async function callWaterNotification({
  initialHour,
  finalHour,
  waterPerNotification,
  drinkedWater,
  waterGoal
}: Notification) {

  const hour = new Date().getHours();

  if (drinkedWater >= waterGoal || initialHour > hour || finalHour < hour) return;

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Hidrate-se: É hora de beber água!",
          body: `A hidratação é essencial para o seu bem-estar. Que tal beber ${currentStore.waterPerNotification}ml de água agora e ficar mais próximo da sua meta diária? Seu corpo agradecerá!`,
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 3),
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

export async function callExerciseNotification({
  initialHour,
  finalHour,
  exercised,
  exerciseGoal }: Notification) {

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
            at: new Date(Date.now() + 1000 * 2),
            allowWhileIdle: true,
          },
          sound: null,
          attachments: null,
          actionTypeId: "", // Defina um ID de ação exclusivo para identificar essa ação
          extra: {
            route: "/exercise"
          },
        },
      ],
    });
    await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
      const route = notification.notification.extra.route;

      await push(route);
    });
  } catch (error) {
    console.log(error);
  }
}



