<template>
  <main class="article">
    <div class="article__card">
      <h2 class="article__title">
        {{ article?.title }}
      </h2>
      <div class="article__description">
        {{ article?.description }}
      </div>
      <img
      v-if="article?.cover_image"
      class="article__image"
      :src="article?.cover_image" />
      <ContentDoc />
    </div>
  </main>
</template>

<script setup>
  const route = useRoute()
  const { data: article } = await useAsyncData(`${route.path}`, () => queryContent(route.path).findOne())
</script>

<style lang="scss">
  .article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__card {
      outline: 1px solid black;
      max-width: 54rem;
      margin: 4rem 2rem;
      padding: 4rem 6rem;

      @media only screen and (max-width: $screen-lg-min) {
        outline: none;
        padding: 0;
      }
    }

    &__title {
      font-size: 2rem;
      margin-bottom: 2rem;
      margin-top: 0;
    }

    &__description {
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    &__image {
      width: 100%;
      border: 1px solid black;
      margin-bottom: 1.5rem;
    }
  }
</style>
