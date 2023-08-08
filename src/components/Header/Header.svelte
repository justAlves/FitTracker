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
    color: #000;
    background-color: #e5efd1;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>
