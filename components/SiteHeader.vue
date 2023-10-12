<template>
  <header>
    <h3 class="subtitle">{{ title.subtitle }}</h3>
    <h1 class="title">{{ title.title }}</h1>
    <div class="sidebar__wrapper">
      <div class="sidebar" :style="{ 'right': showSidebar ? '0' : '-13rem' }">
        <NuxtLink
          v-for="item in navItems"
          :to="item.link"
          class="sidebar__item">
          {{ item.text }}
        </NuxtLink>
        <NuxtLink
          :to="{ path: '/', hash: '#projects' }"
          class="sidebar__item">
          Projects
        </NuxtLink>
        <div class="sidebar__item--social">
          <NuxtLink
            v-for="item in socialItems"
            :to="item.link"
            target="_blank"
            class="sidebar__item sidebar__item__social">
            <IconTwitter v-if="item.icon === 'IconTwitter'" />
            <IconGithub v-if="item.icon === 'IconGithub'" />
            <IconItchIo v-if="item.icon === 'IconItchIo'" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <IconHamburger class="hamburger" @click="burgerClick" />
    <div class="navbar">
      <div v-for="item in navItems" class="navbar__item">
        <NuxtLink :to="item.link" class="navbar__item__link">
          {{ item.text }}
        </NuxtLink>
      </div>
      <div class="navbar__item" v-if="showProjects">
        <NuxtLink
          :to="{ path: '/', hash: '#projects' }"
          external
          class="navbar__item__link">
          Projects
        </NuxtLink>
      </div>
      <div class="navbar__item navbar__item--search">
        <input
          type="text"
          placeholder="Search"
          class="navbar__item__search"
          @blur="inputBlur"
          @focus="inputFocus"
          @input="onSearch"/>
        <div class="navbar__item__dropdown" v-show="showSearchDropdown">
          <div
            class="navbar__item__dropdown__item"
            v-for="article in filteredArticles"
            @mousedown="goTo(article?._path)">
            {{ article?.title }}
          </div>
        </div>
      </div>
      <div class="navbar__item navbar__item--social" v-if="showSocials">
        <NuxtLink
          v-for="item in socialItems"
          :to="item.link"
          target="_blank"
          class="navbar__item__social navbar__item__link">
          <IconTwitter v-if="item.icon === 'IconTwitter'" />
          <IconGithub v-if="item.icon === 'IconGithub'" />
          <IconItchIo v-if="item.icon === 'IconItchIo'" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
<script setup>
  import IconTwitter from "~icons/cib/twitter"
  import IconGithub from "~icons/cib/github"
  import IconItchIo from "~icons/cib/itch-io"
  import IconHamburger from "~icons/charm/menu-hamburger"

  const showSocials = false
  const showProjects = false

  const router = useRouter()

  const { data: articles } = await useAsyncData('article-list', () =>
    queryContent('blog').where({ tags: { $contains: "listed" } }).find())

  const title = {
    subtitle: "a ribbeting development log",
    title: "frog.dev",
  }

  const navItems = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Blog",
      link: "/blog",
    }
  ];

  const socialItems = [
    {
      icon: "IconTwitter",
      link: "https://twitter.com/croak_io",
    },
    {
      icon: "IconGithub",
      link: "https://github.com/jakenielson",
    },
    {
      icon: "IconItchIo",
      link: "https://croak.itch.io/",
    },
  ]

  const filteredArticles = ref([])

  const searchInput = ref("")

  const filterArticles = (ev) => {
    searchInput.value = ev.target.value;
    if (!searchInput.value) {
      filteredArticles.value = []
    } else {
      filteredArticles.value = articles.value.filter((article) =>
        article.title.toLowerCase().includes(searchInput.value.toLowerCase())
      )
    }
  };

  const debounce = (func, timeout = 300) => {
    let timer = null
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  };

  const debounceFilter = debounce(filterArticles);

  const onSearch = (ev) => {
    searchInput.value = ev.target.value
    if (!searchInput.value) {
      filteredArticles.value = []
    }
    debounceFilter(ev)
  };

  const showSearchDropdown = ref(false);

  const inputFocus = (ev) => {
    ev.target.value = searchInput.value
    showSearchDropdown.value = true
  };

  const inputBlur = (ev) => {
    ev.target.value = ""
    showSearchDropdown.value = false
  };

  const goTo = (path) => {
    path !== router.currentRoute && router.push({ path })
  }

  const showSidebar = ref(false)

  const burgerClick = () => {
    console.log('burgerClick')
    showSidebar.value = !showSidebar.value
    console.log('showSidebar', showSidebar.value)
  }

  router.beforeEach((to, from, next) => {
    showSidebar.value = false
    next()
  })
</script>
<style lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-width: 100vw;

    a {
      text-decoration: inherit;
      color: inherit;
    }

    .title {
      font-size: 5.2rem;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    .subtitle {
      font-size: 1.5rem;
      font-weight: 200;
      letter-spacing: 0.4rem;
      text-align: center;
      max-width: 80vw;
    }

    .hamburger {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;
      z-index: 5;
      cursor: pointer;
    }

    .sidebar {
      position: absolute;
      top: 0;
      transition: right 0.5s;
      outline: 1px solid black;
      background-color: white;
      padding: 6rem 2rem 2rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      gap: 3rem;
      z-index: 2;
      pointer-events: all;

      &__wrapper {
        position: absolute;
        top: 0;
        right: 0;
        overflow-x: hidden;
        width: 10rem;
        height: 30rem;
        pointer-events: none;
        z-index: 3;
      }

      &__item {
        font-size: 1.5rem;

        &__social {
          font-size: 1rem;
        }

        &:hover {
          color: limegreen;
          cursor: pointer;
        }

        &--social {
          display: flex;
          flex-direction: row;
          align-items: space-between;
          justify-content: space-between;
          width: 100%;
        }
      }
    }

    @media only screen and (min-width: $screen-lg-min) {
      .hamburger, .sidebar, .sidebar__wrapper {
        display: none;
      }
    }

    .navbar {
      width: calc(100% - 4rem);
      display: flex;
      justify-content: center;
      border-top: 1px solid black;
      border-bottom: 1px solid black;

      @media only screen and (max-width: $screen-lg-min) {
        display: none;
      }

      &__item {
        border-left: 1px solid black;
        border-right: 1px solid black;
        margin-right: -1px;
        padding: 0.75rem 3rem;
        line-height: 1.5rem;
        height: 1.5rem;
        text-align: center;

        &--social {
          padding: 0.75rem 0.5rem;
        }

        &__social {
          display: inline-block;
          margin: 0 0.5rem;
          min-width: 16px;
        }

        &__link {
          &:hover {
            color: limegreen;
            cursor: pointer;
          }
        }

        &__search {
          border: none;
          width: 9rem;
          text-align: center;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 1rem;

          &:hover {
            cursor: pointer;

            &::placeholder {
              color: limegreen;
            }
          }

          &::placeholder {
            color: black;
            opacity: 1;
            font-size: 1rem;
          }

          &:focus {
            outline: none;

            &:hover {
              cursor: text;
            }

            &::placeholder {
              opacity: 0;
            }
          }
        }

        &__dropdown {
          position: relative;
          top: 1rem;
          margin: 0 -1.05rem;
          max-height: 27rem;
          background-color: white;
          border: 1px solid black;
          border-top: none;
          z-index: 2;
          padding-top: 1rem;
          padding-bottom: 1rem;

          &__item {
            padding-top: 0.5rem;

            &:hover {
              color: limegreen;
              cursor: pointer;
            }
          }
        }

        &--search {
          padding: 0.75rem 1rem;
        }
      }
    }
  }
</style>
