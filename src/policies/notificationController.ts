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
          body: `A hidratação é essencial para o seu bem-estar. Que tal beber ${waterPerNotification}ml de água agora e ficar mais próximo da sua meta diária? Seu corpo agradecerá!`,
          id: 1,
          schedule: {
            at: new Date(Date.now() + 1000 * 60 * 15),
            allowWhileIdle: true,
            repeats: true,
          },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: {
            route: "/"
          },
        },
      ],
    }).then(() => {
      console.log('Notification set');
    });

    await LocalNotifications.addListener('localNotificationActionPerformed', async (notification) => {
      const route = notification.notification.extra.route;
      await push(route);
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
          actionTypeId: "clique", // Defina um ID de ação exclusivo para identificar essa ação
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



