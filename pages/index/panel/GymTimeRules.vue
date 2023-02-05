<template>
  <div class="gym-time-rules">
    <h2 style="text-align: center">
      {{ innerContext.title }}
    </h2>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class GymTimeRulesPage extends Vue {
  innerContext = {
    title: 'صفحه قوانین جیم‌تایم'
  }
}
</script>

<style scoped>
.gym-time-rules {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: min(40px,5%) 5%;
}
</style>
