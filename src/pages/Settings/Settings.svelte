<script>
  import { store } from "$stores/store";
  import { Preferences } from "@capacitor/preferences";

  let editable = false;

  async function toggleEditable() {
    if (editable == true) {
      await Preferences.set({ key: "data", value: JSON.stringify($store) });
      editable = false;
    } else {
      editable = true;
    }
  }
</script>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Meta de água em ml</ion-label>
      <ion-input
        slot="end"
        value={$store.waterGoal}
        on:change={(e) => {
          store.setWaterGoal(e.target.value);
          store.setWaterPerNotification(e.target.value / 16);
        }}
        disabled={editable == false}
        placeholder="Meta de água em ml"
      />
    </ion-item>
    <ion-item>
      <ion-label>Meta de pausas</ion-label>
      <ion-input
        slot="end"
        value={$store.exerciseGoal}
        on:change={(e) => store.setExerciseGoal(e.target.value)}
        disabled={editable == false}
        placeholder="Meta de pausas"
      />
    </ion-item>
    <ion-item>
      <ion-label>Quantidade de água sugerida por aviso</ion-label>
      <ion-text>
        {$store.waterPerNotification}ml
      </ion-text>
    </ion-item>
  </ion-list>
  <ion-button
    color="success"
    on:click={toggleEditable}
  >
    <ion-icon name="save-outline" />
    {editable === true ? "Salvar" : "Editar"}
  </ion-button>
</ion-content>

<style>
</style>
