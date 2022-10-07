<template>
  <header>
    <h3 class="subtitle">{{ title.subtitle }}</h3>
    <h1 class="title">{{ title.title }}</h1>
    <div class="navbar">
      <div v-for="item in navItems" class="navbar__item">
        <NuxtLink :to="item.link" class="navbar__item__link">
          {{ item.text }}
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
      <div class="navbar__item navbar__item--social">
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

  const router = useRouter();

  const { data: articles } = await useAsyncData("blog-index", () =>
    queryContent("blog").find()
  )

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
    },
    {
      text: "Contact",
      link: "/",
    },
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
        article.title.includes(searchInput.value)
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
    path !== router.currentRoute && router.push({ path });
  }
</script>
<style lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .title {
      font-size: 5.2rem;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    .subtitle {
      font-size: 1.5rem;
      font-weight: 200;
      letter-spacing: 0.6rem;
    }

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

        a {
          text-decoration: inherit;
          color: inherit;
        }
      }
    }
  }
</style>
