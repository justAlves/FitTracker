<script lang="ts">
  import Header from "$components/Header/Header.svelte";
  import { store } from "$stores/store";
  import Modal from "$components/Modal/Modal.svelte";
  import Card from "$components/Card/Card.svelte";

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
      <div class="left-box">
        <h3>Meta</h3>
        <h2>{$store.waterGoal}ml</h2>
      </div>
      <div class="right-box">
        <h3>Consumido</h3>
        <h2>{$store.drinkedWater}ml</h2>
      </div>
    </div>
    <ion-content class="ion-padding list">
      {#each items as item}
        <Card data={item} />
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
  <Modal
    trigger="openModal"
    type="water"
  />
</ion-content>

<style>
  h3 {
    color: rgba(255, 255, 255, 0.8);
    font-family: Roboto;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
  }
  h2 {
    color: #fff;
    font-family: Roboto;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
  }

  .left-box {
    padding: 0 3rem;
  }
  .right-box {
    padding: 0 2rem;
  }
</style>
