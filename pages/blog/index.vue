<template>
  <div class="page page--blog">
    <div class="article-list">
      <ArticleCard
        v-for="article in articles"
        :article="article"
        class="article-list__item" />
    </div>
  </div>
</template>
<script setup>
  import ArticleCard from '~/components/blog/ArticleCard.vue'

  const { data: articles } = await useAsyncData('all-articles', () => queryContent('blog').find())
  useHead({
    title: "Frog Blog",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Follow the development of frog.dev, croak.io, manticorebook.com, and my other projects.'
      }]
  })
</script>
<style lang="scss">
  .page--blog {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .article-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    max-width: 54rem;
    gap: 2rem;

    @media only screen and (max-width: $screen-lg-min) {
      max-width: 26rem;
    }
  }
</style>