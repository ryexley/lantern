<template>
  <ul class="passage-collection-list">
    <li v-for="({ name, description, slug }) in collections" :key="`collection:${name}`">
      <Card :cardClass="'collection-card'">
        <router-link :to="`/collection/${slug}`" class="collection-link">
          <div class="collection-title">{{ name }}</div>
          <p class="collection-description">{{ description }}</p>
        </router-link>
      </Card>
    </li>
  </ul>
</template>

<script>
import Card from "@/components/ui/card"

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
    display: flex;
    flex-direction: column;
    margin: 1rem;
    text-transform: capitalize;
    width: 18.75rem;

    a {
      text-decoration: none;
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
