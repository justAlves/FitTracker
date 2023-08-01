<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import { conditionsFailHandler, routeLoadingHandler, routes } from "./routes";
  import LoggedInUser from "$stores/LoggedInUser";
  import lunaImg from "$assets/Luna.jpg";
  import Header from "$components/Header/Header.svelte";
  import { tick } from "svelte";

  const userMock = {
    name: "João Silva",
    image: lunaImg,
  };
</script>

  <Router
    {routes}
    on:routeLoading={routeLoadingHandler}
    on:conditionsFailed={conditionsFailHandler}
  />

  
