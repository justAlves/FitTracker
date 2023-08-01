<script lang="ts">
  import { onMount } from "svelte";

  let message: string;

  function getGreetingMessage(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return (message = "Bom dia");
    } else if (currentHour >= 12 && currentHour < 18) {
      return (message = "Boa tarde");
    } else {
      return (message = "Boa noite");
    }
  }

  onMount(() => {
    getGreetingMessage();
  });
</script>

<header>
  <div>
    <h1>
      {message}
    </h1>
  </div>
</header>

<style>
  header {
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    color: rgb(26, 25, 25);
  }
</style>
