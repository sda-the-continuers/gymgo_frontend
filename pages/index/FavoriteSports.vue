<template>
  <FavoriteSports />
</template>

<script lang="ts">

import Component from 'vue-class-component'
import Vue from 'vue'
import FavoriteSports from '~/components/FavoriteSports.vue'

@Component({
  components: {
    FavoriteSports
  }
})
export default class extends Vue {}

</script>
