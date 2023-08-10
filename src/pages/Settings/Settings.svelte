<script>
  import { store } from "$stores/store";
  import { Preferences } from "@capacitor/preferences";
  import { LocalNotifications } from "@capacitor/local-notifications";
  import {
    callExerciseNotification,
    callWaterNotification,
  } from "$policies/notificationController";

  let editable = false;

  //Salva os dados no storage e chama as notificações com os dados atualizados
  async function toggleEditable() {
    if (editable == true) {
      await Preferences.set({ key: "data", value: JSON.stringify($store) });
      await LocalNotifications.cancel({
        notifications: [{ id: 1 }, { id: 2 }],
      });
      await callExerciseNotification();
      await callWaterNotification();
      editable = false;
    } else {
      editable = true;
    }
  }
</script>

<ion-content>
  <div class="container">
    <div>
      <h1>Configurações</h1>
      <div>
        <h2>Metas</h2>
        <ion-label>Meta de água em ml</ion-label>
        <ion-input
          placeholder="Digite a meta de água"
          type="number"
          disabled={!editable}
          value={$store.waterGoal}
          on:ionChange={(e) => store.setWaterGoal(e.target.value)}
        />
        <ion-label>Meta de pausas</ion-label>
        <ion-input
          placeholder="Digite a meta de água"
          type="number"
          disabled={!editable}
          value={$store.exerciseGoal}
          on:ionChange={(e) => store.setExerciseGoal(e.target.value)}
        />
        <span
          >Quantidade sugerida nas notificações: {$store.waterPerNotification}ml</span
        >
      </div>
      <div>
        <h2>Notificações</h2>
        <ion-label>Hora inicial</ion-label>
        <ion-input
          placeholder="Digite a hora inicial"
          value={$store.initialHour}
          disabled={!editable}
          on:ionChange={(e) => store.setInitialHour(e.target.value)}
        />
        <ion-label>Hora final</ion-label>
        <ion-input
          placeholder="Digite a hora final"
          value={$store.finalHour}
          disabled={!editable}
          on:ionChange={(e) => store.setFinalHour(e.target.value)}
        />
      </div>
      <ion-button
        expandable="block"
        color="success"
        on:click={toggleEditable}>{!editable ? "Editar" : "Salvar"}</ion-button
      >
    </div>
  </div>
</ion-content>

<style>
  ion-input {
    margin-bottom: 1rem;
    --highlight-color-focused: #4ec231;
    --background: #e6eee0;
    --border-radius: 0.5rem;
    border: 1px solid #080808;
    border-radius: 0.5rem;
  }

  ion-label {
    margin-top: 1rem;
    color: #080808a8;
  }
</style>
