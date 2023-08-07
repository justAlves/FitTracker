<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import { IoMdWater, IoMdWalk, IoMdSettings } from "svelte-icons/io";
  import { onDestroy, onMount } from "svelte";
  import {
    callExerciseNotification,
    callWaterNotification,
    registerActions,
  } from "$policies/notificationController";
  import { LocalNotifications } from "@capacitor/local-notifications";
  import { Preferences } from "@capacitor/preferences";

  // Lógica para acompanhar a rota atual (pode variar dependendo do Svelte Router ou outras configurações)
  let currentRoute = "#/";

  let notificationsCalled = false;

  // Função para atualizar a rota atual quando ela mudar
  function handleRouteChange() {
    currentRoute = window.location.hash; // Ou use a navegação de rota do Svelte, se estiver usando o Svelte Router
  }

  // Adicione um ouvinte para a mudança de rota
  window.addEventListener("hashchange", handleRouteChange);

  // Remova o ouvinte quando o componente for destruído (para evitar vazamentos de memória)
  onDestroy(() => {
    window.removeEventListener("hashchange", handleRouteChange);
  });

  onMount(async () => {
    await LocalNotifications.requestPermissions();
    await registerActions();
    if (!notificationsCalled) {
      await callWaterNotification();
      await callExerciseNotification();
      notificationsCalled = true;
    }
  });

  /*   // Apaga a storage, apenas para testes
  onMount(async () => {
    await Preferences.clear();
  }); */
</script>

<ion-app>
  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />

  <div class="tab-bar">
    <a
      class={`tab-button icon ${currentRoute === "#/" ? "active" : ""}`}
      on:click={() => push("/")}
    >
      <IoMdWater />
      <span>Água</span>
    </a>
    <a
      class={`tab-button icon ${currentRoute === "#/exercise" ? "active" : ""}`}
      on:click={() => push("/exercise")}
    >
      <IoMdWalk />
      <span>Exercícios</span>
    </a>
    <a
      class={`tab-button icon ${currentRoute === "#/settings" ? "active" : ""}`}
      on:click={() => push("/settings")}
    >
      <IoMdSettings />
      <span>Configurações</span>
    </a>
  </div>
</ion-app>

<style lang="scss">
  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 4rem; /* Altura da barra de navegação */
    border-top: 1px solid #000; /* Borda superior da barra de navegação */
    box-shadow: 0px -2px 32px 0px rgba(0, 0, 0, 0.205);
    background-color: #eeeeee; /* Cor de fundo da barra de navegação */
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .tab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #000; /* Cor do ícone e rótulo dos botões */
    padding: 5px; /* Espaçamento interno do botão */
  }

  .tab-button span {
    font-size: 1rem; /* Tamanho do rótulo */
    transition: all 0.1s ease-in-out;
  }

  .icon {
    color: #000;
    width: 2rem;
  }

  .tab-button.active {
    color: #51a321; /* Cor do ícone e rótulo dos botões ativos */
    font-weight: bold;
  }
</style>
