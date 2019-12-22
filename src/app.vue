<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch("loadAppData", {}, { root: true })
  }
}
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Baskervville|Raleway&display=swap");

  :root {
    --typography--base-font-family: Baskervville, serif;
    --typography--alt-font-family: Raleway, sans-serif;
    --typography--base-font-size: 16px;
    --typography--line-height: 1.6;
    --typography--leading: calc(var(--typography--base-font-size) * var(--typography--line-height));
    --theme--color-border: #eee;
    --theme--color-link: #c06;
    --theme--color-link--hover: #606;
    --theme--color-text: #444;
    --theme--color-text--light: #ccc;
    --theme--color-text--dark: #111;
  }

  * {
    box-sizing: border-box;
    line-height: var(--typography--leading);
  }

  body {
    color: var(--theme--color-text);
    font-family: var(--typography--base-font-family);
    font-size: var(--typography--base-font-size);
    line-height: var(--typography--line-height);
    margin: 0;
  }

  h1, h2, h3, h4 {
    font-family: var(--typography--base-font-family);
  }

  a {
    color: var(--theme--color-link);
    transition: color 250ms ease-in-out;
  }

  a:hover {
    color: var(--theme--color-link--hover);
  }

  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100vw;
  }
</style>
