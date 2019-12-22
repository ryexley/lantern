<template>
  <ul class="passage-collection-list">
    <li v-for="({ name, description, slug }) in collections" :key="`collection:${name}`">
      <Card :cardClass="'collection-card'">
        <router-link :to="`/collection/${slug}`" class="collection-link">
          <span class="arrow"><img :src="images.arrow" alt="forward arrow" /></span>
          <div class="collection-title">{{ name }}</div>
          <p class="collection-description">{{ description }}</p>
        </router-link>
      </Card>
    </li>
  </ul>
</template>

<script>
import Card from "@/components/ui/card"
import arrow from "@/assets/images/arrow-forward.svg"

export default {
  name: "passage-collection-list",
  components: {
    Card
  },
  props: {
    collections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      images: {
        arrow
      }
    }
  }
}
</script>

<style>
  .passage-collection-list {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 2rem 0;
  }

  .collection-link {
    text-decoration: none;
  }

  .collection-card {
    background-color: rgba(255, 255, 255, 0.85);
    border-color: #fff;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    position: relative;
    text-transform: capitalize;
    transition: all 150ms ease-in-out;
    width: 18.75rem;

    a {
      text-decoration: none;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
      padding-left: 1.25rem;

      & .arrow {
        opacity: 1;
        padding: 0.5rem 1rem;
      }
    }

    & .arrow {
      border-top-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      display: inline-block;
      /* 👇 #ccc converted with https://codepen.io/sosuke/pen/Pjoqqp */
      filter: invert(100%) sepia(0%) saturate(3385%) hue-rotate(47deg) brightness(109%) contrast(60%);
      font-size: 1.5rem;
      opacity: 0;
      padding: 0.5rem 1.5rem;
      position: absolute;
      right: 0;
      top: 0;
      transition: all 150ms ease-in-out;
    }
  }

  .collection-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .collection-description {
    color: var(--theme--color-text);
    margin: 0;
  }
</style>
