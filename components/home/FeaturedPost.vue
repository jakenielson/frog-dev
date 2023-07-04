<template>
  <NuxtLink class="featured-post card" :to="featuredPost?._path">
    <div class="featured-post__tag">Featured Post</div>
    <img class="featured-post__image" :src="featuredPost?.cover_image" />
    <div class="featured-post__body">
      <div class="featured-post__title">
        {{ featuredPost?.title }}
      </div>
      <div class="featured-post__description">
        {{ featuredPost?.description }}
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
const { data: featuredPost } = await useAsyncData("featured-post", () =>
  queryContent("blog").where({ tags: { $contains: "featured" } })
  .findOne())
</script>
<style lang="scss">
.featured-post {
  margin: 4rem 2rem;
  outline: 1px solid black;
  position: relative;
  color: inherit;
  text-decoration: inherit;
  cursor: pointer;
  max-width: 54rem;
  background-color: white;

  @media only screen and (max-width: $screen-lg-min) {
    max-width: 26rem;
  }

  @media only screen and (max-width: $screen-sm-min) {
    width: calc(100% - 4rem);
  }

  &__tag {
    align-self: flex-start;
    padding: 1rem 2rem;
    position: absolute;
    background-color: white;
    outline: 1px solid black;
    top: -1.5rem;
    font-size: 1.5rem;
    font-weight: 200;
    letter-spacing: 0.4rem;
    text-transform: lowercase;
  }

  &__image {
    outline: 1px solid black;
    max-width: 100%;
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
