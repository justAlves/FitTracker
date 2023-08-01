<script>
  import Header from "$components/Header/Header.svelte";
</script>

<Header/>

<div class="container">
  <div class="goal-container">
    <div>
      <h2>Goal: 2000ml</h2>
    </div>
    <div class="spliter"/>
    <div>
      <h2>Drinked: 1000ml</h2>
    </div>
  </div>
  <ion-content>

  </ion-content>
</div>

<style>

  .goal-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: rgb(211, 211, 211);
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  h2{
    font-size: 1.2rem;
  }

  .spliter{
    width: 1px;
    height: 100%;
    background-color: rgb(211, 211, 211);
  }

  ion-content{
    --background: #242424
  }

</style>
