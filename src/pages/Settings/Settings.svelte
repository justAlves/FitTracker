<script>
  import { store } from "$stores/store";
  import { Preferences } from "@capacitor/preferences";

  let editable = false;

  async function toggleEditable() {
    if (editable == true) {
      await Preferences.set({ key: "data", value: JSON.stringify($store)});
      editable = false;
    }else{
      editable = true;
    }
  }
</script>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Water Goal in ml</ion-label>
      <ion-input
        slot="end"
        value={$store.waterGoal}
        on:change={(e) => store.setWaterGoal(e.target.value)}
        disabled={editable == false}
      />
    </ion-item>
    <ion-item>
      <ion-label>Pauses for exercise Goal</ion-label>
      <ion-input
        slot="end"
        value={$store.exerciseGoal}
        on:change={(e) => store.setExerciseGoal(e.target.value)}
        disabled={editable == false}
      />
    </ion-item>
    <ion-item>
      <ion-label>Water per notification</ion-label>
      <ion-input
        slot="end"
        value={$store.waterPerNotification}
        on:change={(e) => store.setWaterPerNotification(e.target.value)}
        disabled={editable == false}
      />
    </ion-item>
  </ion-list>
  <ion-button color="success" on:click={toggleEditable}>
    <ion-icon name="save-outline"></ion-icon>
    {editable === true ? "Save" : "Edit"}
  </ion-button>
</ion-content>

<style>

</style>
