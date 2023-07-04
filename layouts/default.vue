<template>
  <div class="layout layout--default">
    <SiteHeader />
    <slot />
  </div>
</template>
<script setup>
  import SiteHeader from 'components/SiteHeader.vue'
</script>
