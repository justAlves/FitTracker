<script>
  import Header from "$components/Header/Header.svelte";
  import { store } from "$stores/store";
</script>

<Header />

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
  <ion-content />
</div>

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
</style>
