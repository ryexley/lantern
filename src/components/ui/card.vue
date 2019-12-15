<template>
  <div :class="['card', cardClass]">
    <slot />
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    cardClass: {
      type: String
    }
  }
}
</script>

<style>
  .card {
    border: 1px solid var(--theme--color-border);
    border-radius: 0.5rem;
    display: flex;
    padding: 1rem;
  }
</style>
