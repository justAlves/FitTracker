<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import { IoMdWater, IoMdWalk, IoMdSettings } from "svelte-icons/io"
  import { onDestroy } from "svelte";

  // Lógica para acompanhar a rota atual (pode variar dependendo do Svelte Router ou outras configurações)
  let currentRoute = '#/';

    // Função para atualizar a rota atual quando ela mudar
    function handleRouteChange() {
      currentRoute = window.location.hash; // Ou use a navegação de rota do Svelte, se estiver usando o Svelte Router
    }

    // Adicione um ouvinte para a mudança de rota
    window.addEventListener('hashchange', handleRouteChange);

    // Remova o ouvinte quando o componente for destruído (para evitar vazamentos de memória)
    onDestroy(() => {
      window.removeEventListener('hashchange', handleRouteChange);
    });
</script>

  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />


  <div class="tab-bar">
    <a class={`tab-button icon ${currentRoute === '#/' ? 'active' : ''}`} on:click={() => push('/')}>
      <IoMdWater/>
      <span>Water</span>
    </a>
    <a class={`tab-button icon ${currentRoute === '#/exercise' ? 'active' : ''}`} on:click={() => push('/exercise')}>
      <IoMdWalk/>
      <span>Exercise</span>
    </a>
    <a class={`tab-button icon ${currentRoute === '#/settings' ? 'active' : ''}`} on:click={() => push('/settings')}>
      <IoMdSettings/>
      <span>Settings</span>
    </a>

  </div>

<style lang="scss">
  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #e0e0e0; /* Cor de fundo da barra de navegação */
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 4rem; /* Altura da barra de navegação */
    border-top: 1px solid #ccc; /* Borda superior da barra de navegação */
    margin-left: -0.5rem;
    box-shadow: 0px -2px 32px 0px rgba(0, 0, 0, 0.205);
  }

  .tab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333333; /* Cor do ícone e rótulo dos botões */
    padding: 5px; /* Espaçamento interno do botão */
  }

  .tab-button span {
    font-size: 1rem; /* Tamanho do rótulo */
    transition: all 0.1s ease-in-out;
  }

  .icon{
    color: #2c2c2c;
    width: 1.5rem;

  }

  .tab-button.active {
    color: #51a321; /* Cor do ícone e rótulo dos botões ativos */
    font-weight: bold;
  }
</style>
