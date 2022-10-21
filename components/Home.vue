<template>
  <main class="home">
    <FeaturedPost />
    <div class="home__columns">
      <div class="home__column home__column--left">
        <h3 class="home__column__title">
          what's new?
        </h3>
        <ArticleCard
          v-for="article in articles"
          :article="article" />
      </div>
      <div class="home__column home__column--right">
        <h3 class="home__column__title">
          about me
        </h3>
        <img
        v-if="about?.cover_image"
        class="home__column__image"
        :src="about?.cover_image" />
        <ContentDoc path="/about" />
        <div class="home__column__divider" />
        <h3
          id="projects"
          class="home__column__title">
          my stuff
        </h3>
        <ProjectCard
          v-for="project in projects"
          :image="project.image"
          :title="project.title"
          :link="project.link" />
      </div>
    </div>
  </main>
</template>
<script setup>
  import FeaturedPost from './home/FeaturedPost.vue'
  import ProjectCard from './home/ProjectCard.vue'
  import ArticleCard from './blog/ArticleCard.vue'

  const { data: about } = await useAsyncData('about', () => queryContent('about').findOne())
  const { data: articles } = await useAsyncData('all-articles', () => queryContent('blog').find())

  const projects = [{
    image: 'https://res.cloudinary.com/dk2rspww8/image/upload/v1662612722/sample.jpg',
    title: 'croak.io',
    link: 'https://croak.io'
  }, {
    image: 'https://res.cloudinary.com/dk2rspww8/image/upload/v1662612722/sample.jpg',
    title: 'manticorebook.com',
    link: 'https://manticorebook.com'
  }]
</script>
<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__columns {
      border-top: 1px solid black;
      margin: 0 2rem;
      padding: 1rem 0rem;
      width: calc(100% - 4rem);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      @media only screen and (max-width: $screen-lg-min) {
        flex-direction: column;
        align-items: center;
        max-width: 26rem;
      }
    }

    &__column {
      height: 100rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 26rem;

      &--right {
        padding: 2rem 0 2rem 8rem;
      }

      &--left {
        flex: 1;
        border-right: 1px solid black;
        align-items: flex-end;
        padding: 2rem 8rem 2rem 0;
      }

      @media only screen and (max-width: $screen-xl-min) {
        &--right {
          padding: 2rem 0 2rem 2rem;
        }

        &--left {
          padding: 2rem 2rem 2rem 0;
        }
      }

      @media only screen and (max-width: $screen-lg-min) {
        &--right {
          padding: 2rem 0;
        }

        &--left {
          padding: 2rem 0;
          border-right: none;
          align-items: flex-start;
          border-bottom: 1px solid black;
        }
      }

      &__title {
        font-size: 1.5rem;
        font-weight: normal;
        letter-spacing: 0.4rem;
        font-weight: 200;
        margin-bottom: 4rem;
      }

      &__image {
        width: 100%;
        outline: 1px solid black;
        margin-bottom: 2rem;
      }

      &__divider {
        width: 100%;
        border-top: 1px solid black;
        margin: 3rem 0;
      }
    }

    .article-card {
      margin-bottom: 2rem;
    }

    .project-card {
      margin-top: 1.5rem;
      margin-bottom: 2rem;
    }
  }
</style>