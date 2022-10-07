<template>
  <main class="about">
    <div class="about__card">
      <img
      v-if="about?.cover_image"
      class="about__image"
      :src="about?.cover_image" />
      <div class="about__content">        
        <h2 class="about__title">
          {{ about?.title }}
        </h2>
        <ContentDoc />
      </div>
    </div>
  </main>
</template>

<script setup>
  const route = useRoute()
  const { data: about } = await useAsyncData(`${route.path}`, () => queryContent(route.path).findOne())
</script>

<style lang="scss">
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__card {
      outline: 1px solid black;
      width: 54rem;
      margin: 4rem 0;
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
      outline: 1px solid black;
      margin-bottom: 1.5rem;
    }

    &__content {
      padding: 2rem 4rem;
    }
  }
</style>
