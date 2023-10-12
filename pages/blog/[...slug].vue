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
      <ContentDoc id="content" class="article__content" />
      <div class="article__links">
        <div class="article__link">
          <NuxtLink v-if="lastPage" :to="{ path: lastPage, hash: '#content' }">back</NuxtLink>
        </div>
        <div class="article__link">
          <NuxtLink v-if="nextPage" :to="{ path: nextPage, hash: '#content' }">next page</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  const route = useRoute()
  const { data: article } = await useAsyncData(`${route.path}`, () => queryContent(route.path).findOne())

  let lastPage = ''
  let nextPage = ''
  if (route.params?.slug?.length > 1) {
    const { data: pages } = await useAsyncData(`/blog/${route.params.slug[0]}`, () =>
      queryContent(`/blog/${route.params.slug[0]}`)
      .only(['_path'])
      .find())

    const currentIndex = pages.value.findIndex(page => page?._path === article?.value?._path);

    if (currentIndex > -1) {
      lastPage = pages.value[currentIndex - 1]?._path
      nextPage = pages.value[currentIndex + 1]?._path
    }
  }
</script>

<style lang="scss">
  .article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__card {
      outline: 1px solid black;
      width: 100%;
      max-width: 54rem;
      margin: 4rem 2rem;
      padding: 4rem 6rem;
      background-color: white;

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

    &__image, img {
      width: 100%;
      border: 1px solid black;
      margin-top: 1rem;
    }

    &__links {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 4rem;
    }

    &__content {
      padding-top: 2rem;
    }

    h2, h3, h4 {
      
      a {
        color: inherit;
      }
    }

    h3, h4 {
      margin-top: 3rem;
    }

    p {
      code {
        background-color: #f6f6f6;
        padding: 0.2rem 0.4rem;
      }
    }
    
    pre {
      margin: 2rem 0;
      outline: 1px solid black;
      padding: 1.5rem 2rem;
      line-height: 1.2rem;
      background-color: #f6f6f6;
      overflow-x: scroll;
    }
  }
</style>
