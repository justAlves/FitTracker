<script lang="ts">
  /* eslint-disable svelte/valid-compile */
  import waterImage from "$assets/water.svg";
  import exerciseImage from "$assets/exercise.svg";
  import { store } from "$stores/store";
  import { Preferences } from "@capacitor/preferences";

  const cancel = () => {
    const modal = document.querySelector("ion-modal");
    modal.dismiss();
  };

  export let trigger: string;
  export let type: string;
  let goal = 0;

  const register = async () => {
    const item = {
      id: new Date().getTime(),
      goal: goal,
      type: type,
      date: new Date().toISOString().slice(0, 10),
    };

    const currentGoal =
      type === "water"
        ? ($store.drinkedWater as number)
        : ($store.exercised as number);

    store.addItem(item);

    if (type === "water") {
      store.setDrinkedWater(currentGoal + goal);
    } else {
      store.setExercised(currentGoal + goal);
    }

    await Preferences.set({
      key: "data",
      value: JSON.stringify($store),
    });

    cancel();
  };
</script>

<ion-modal {trigger}>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="end">
        <ion-button on:click={cancel}>Cancelar</ion-button>
      </ion-buttons>
      <ion-title>Registrar {type === "water" ? "consumo" : "pausa"}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="modal-container">
      <ion-img
        src={type === "water" ? waterImage : exerciseImage}
        style={`max-width: ${type === "water" ? "150px" : "200px"}`}
      />

      <ion-item>
        <ion-label position="stacked"
          >Quantidade de {type === "water"
            ? "água em ml"
            : "pausas para exercitar"}</ion-label
        >
        <ion-input
          type="number"
          placeholder="Informe a quantidade de {type === 'water'
            ? 'água'
            : 'pausas'}"
          value={goal}
          on:change={(e) => {
            goal = Number(e.target.value);
          }}
        />
      </ion-item>

      <ion-button
        color="success"
        fill="outline"
        on:click={register}
      >
        Registrar
      </ion-button>
    </div>
  </ion-content>
</ion-modal>

<style lang="scss">
  ion-header {
    padding: 0.5rem;
  }

  ion-img {
    width: 100%;
    max-width: 150px;
    margin: 0 auto;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 4rem;
    width: 100%;
  }

  ion-input {
    width: 100%;
  }
</style>
