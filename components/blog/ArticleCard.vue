<template>
  <NuxtLink
    class="article-card"
    :to="article?._path">
    <img class="article-card__image" :src="article?.cover_image" />
    <div class="article-card__body">
      <div class="article-card__title">
        {{ article?.title }}
      </div>
      <div class="article-card__description">
        {{ article?.description }}
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
  const props = defineProps(['article'])
</script>
<style lang="scss">
  .article-card {
    display: block;
    outline: 1px solid black;
    width: 26rem;
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;

    @media only screen and (max-width: $screen-sm-min) {
      width: 100%;
    }

    &__image {
      border-bottom: 1px solid black;
      object-fit: contain;
      width: 26rem;

      @media only screen and (max-width: $screen-sm-min) {
        width: 100%;
      }
    }

    &__body {
      padding: 2rem;
    }

    &__title {
      margin-bottom: 1rem;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
</style>