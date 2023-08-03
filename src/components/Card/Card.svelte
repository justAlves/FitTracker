<script lang="ts">
  type Data = {
    goal: number;
    type: string;
  };

  export let data = {} as Data;
</script>

<ion-card>
  <ion-card-content>
    <div class="card">
      <ion-icon
        name={data.type == "water" ? "water-outline" : "walk-outline"}
        size="large"
        color={data.type == "water" ? "primary" : "success"}
      />
      <ion-card-title>
        {data.type == "water" ? `${data.goal}ml` : data.goal}
      </ion-card-title>
    </div>
  </ion-card-content>
</ion-card>

<style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem;
  }

  ion-card {
    margin: 1rem 0;
  }
</style>
