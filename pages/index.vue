<template>
  <div class="page page--home">
    <Home />
  </div>
</template>
<script setup>
  import Home from '~/components/Home.vue'

  useHead({
    title: "frog.dev",
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Follow the development of frog.dev, croak.io, manticorebook.com, and my other projects.'
      }]
  })
</script>