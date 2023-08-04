/* eslint-disable @typescript-eslint/no-misused-promises */
import { store } from "$stores/store";
import { LocalNotifications } from "@capacitor/local-notifications";
import { push } from "svelte-spa-router";
import Router from "svelte-spa-router";
import Modal from "$components/Modal/Modal.svelte";

interface Notification {
  initialHour: number;
  finalHour: number;
  waterPerNotification?: number;
  exercised?: number;
  exerciseGoal?: number;
  drinkedWater?: number;
  waterGoal?: number;
}

const { initialHour, finalHour, waterPerNotification, exercised, exerciseGoal, drinkedWater, waterGoal } = store.get();

export async function callWaterNotification({
  initialHour,
  finalHour,
  waterPerNotification,
  drinkedWater,
  waterGoal }: Notification) {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Hora de beber água!",
          body: `Você bebeu ${drinkedWater}ml de ${waterGoal}ml hoje. Beba mais ${waterPerNotification}ml!`,
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 5),
            allowWhileIdle: true,
          },
          sound: null,
          attachments: null,
          actionTypeId: "clique", // Defina um ID de ação exclusivo para identificar essa ação
          extra: {
            route: "/"
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


