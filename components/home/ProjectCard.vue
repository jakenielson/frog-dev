<template>
  <NuxtLink
    class="project-card"
    :to="link"
    target="_blank">
    <div class="project-card__tag">{{ title }}</div>
    <img class="project-card__image" :src="image" />
  </NuxtLink>
</template>
<script setup>
  const props = defineProps(['image', 'title', 'link'])
</script>
<style lang="scss">
  .project-card {
    position: relative;
    display: block;
    width: 26rem;
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;

    @media only screen and (max-width: $screen-sm-min) {
      width: 100%;
    }

    &__tag {
      align-self: flex-start;
      padding: 1rem 2rem;
      position: absolute;
      background-color: white;
      outline: 1px solid black;
      top: -1.5rem;
      font-size: 1rem;
      font-weight: 200;
      letter-spacing: 0.4rem;
      text-transform: lowercase;
    }

    &__image {
      outline: 1px solid black;
      object-fit: cover;
      width: 26rem;

      @media only screen and (max-width: $screen-sm-min) {
        width: 100%;
      }
    }
  }
</style>