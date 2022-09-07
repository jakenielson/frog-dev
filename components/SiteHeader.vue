<template>
  <header>
    <h3 class="title__subtitle">{{ title.subtitle }}</h3>
    <h1 class="title">{{ title.title }}</h1>
    <div class="navbar">
      <div
        v-for="item in navItems"
        class="navbar__item">
        <a
          :href="item.link">
          {{ item.text }}
        </a>
      </div>
      <div class="navbar__item">
        Search
      </div>
      <div class="navbar__item navbar__item--social">
        <a
          v-for="item in socialItems"
          class="navbar__item__social"
          :href="item.link">
          <font-awesome-icon :icon="['fab', item.icon]" class="icon"></font-awesome-icon>
        </a>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      title: {
        subtitle: 'a ribbeting development log',
        title: 'frog.dev'
      },
      navItems: [{
        text: 'Home',
        link: '/'
      }, {
        text: 'About',
        link: '/about'
      }, {
        text: 'Blog',
        link: '/blog'
      }, {
        text: 'Contact',
        link: '/contact'
      }],
      socialItems: [{
        icon: 'twitter',
        link: ''
      },  {
        icon: 'github',
        link: ''
      }, {
        icon: 'itch-io',
        link: ''
      }]
    }
  }
}
</script>
<style lang="scss">
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .navbar {
  width: calc(100% - 4rem);
  display: flex;
  justify-content: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  &__item {
    border-left: 1px solid black;
    border-right: 1px solid black;
    margin-right: -1px;
    padding: 0.75rem 3rem;

    &--social {
      padding: 0.75rem 0.5rem;
    }

    &__social {
      margin: 0 0.5rem;
    }
  }
}
}
</style>