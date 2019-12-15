<template>
  <div class="loading-indicator">
    <span v-show="showLabel" class="label">{{ $t(labelKey) }}...</span>
  </div>
</template>

<script>
export default {
  name: "loading-indicator",
  props: {
    showLabel: {
      type: Boolean,
      default: true
    },
    labelKey: {
      type: String,
      default: "components.ui.loading-indicator.DEFAULT_LABEL"
    }
  }
}
</script>

<style>
  .loading-indicator {
    align-items: center;
    cursor: default;
    display: flex;
    height: auto;
    margin: 0;
    transition: all 0.5s;
    user-select: none;

    &::before {
      background-image: url("../../assets/images/loading-indicators/puff.svg");
      background-size: contain;
      /*border: 1px dashed #eee;*/
      content: "";
      display: block;
      /* 👇 #c06 converted with https://codepen.io/sosuke/pen/Pjoqqp */
      filter: invert(20%) sepia(78%) saturate(5046%) hue-rotate(318deg) brightness(76%) contrast(114%);
      height: 1.5rem;
      margin-right: 0.5rem;
      text-indent: -625rem;
      width: 1.5rem;
    }

    &[style*="display: none;"] {
      height: 0;
      opacity: 0;
      padding: 0;
      pointer-events: none;
      user-select: none;
      visibility: visible;
    }
  }

  .label {
    animation: pulse 1.8s infinite;
    margin: 0;
    text-transform: capitalize;
  }

  .visible {
    opacity: 1;
    visibility: visible;
  }

  .hidden {
    opacity: 0;
    visibility: hidden;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
</style>
