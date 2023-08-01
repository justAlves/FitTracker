<script lang="ts">
  import { onMount } from "svelte";

  function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  let currentTime = getCurrentTime();

  let message = "Bom Dia!"

  function setGreetings(){
    if(currentTime >= "06:00:00" && currentTime < "12:00:00"){
      message = "Bom Dia!"
    }else if(currentTime >= "12:00:00" && currentTime < "18:00:00"){
      message = "Boa Tarde!"
    }else if(currentTime >= "18:00:00" && currentTime < "05:00:00"){
      message = "Boa Noite!"
    }
  }

  onMount(() => {
    setGreetings()
  })

</script>

<header>
  <div>
    <h1>
      {message}
    </h1>
  </div>
</header>

<style>

  header{
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    color: rgb(211, 211, 211)
  }

</style>
