<script lang="ts">
  import Header from "$components/Header/Header.svelte";
  import { store } from "$stores/store";
  import Modal from "$components/Modal/Modal.svelte";

  interface Item {
    id: number;
    goal: number;
    type: string;
    date: string;
  }

  let items: Item[] = [];

  $: {
    items = $store.items.filter(
      (item) =>
        item.type === "water" &&
        item.date === new Date().toISOString().slice(0, 10)
    ) as Item[];
  }
</script>

<Header />

<ion-content>
  <div class="container">
    <div class="goal-container">
      <div>
        <h2>Meta: {$store.waterGoal}ml</h2>
      </div>
      <div class="spliter" />
      <div>
        <h2>Consumido: {$store.drinkedWater}ml</h2>
      </div>
    </div>
    <ion-content>
      {#each items as item}
        <div>
          <h2>Meta: {item.goal}ml</h2>
        </div>
      {/each}
    </ion-content>
  </div>
  <ion-fab
    vertical="bottom"
    horizontal="end"
    slot="fixed"
    edge
  >
    <ion-fab-button
      color="dark"
      id="openModal"
    >
      <ion-icon name="add" />
    </ion-fab-button>
  </ion-fab>
  <Modal trigger="openModal" />
</ion-content>

<style>
  .goal-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: #000;
    border-radius: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
  }

  h2 {
    font-size: 1.2rem;
  }

  .spliter {
    width: 1px;
    height: 100%;
    background-color: #181818;
  }

  ion-fab {
    margin-bottom: 7rem;
  }
</style>
