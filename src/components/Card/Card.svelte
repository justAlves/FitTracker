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
    --background: #d2e6ab;
    border: 1px solid #0e3405;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
  }

  ion-icon {
    color: #4ec231;
  }

  ion-card-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #0e3405;
  }
</style>
