<template>
  <EditProfile v-if="edit" />
  <ShowProfile v-else />
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import ShowProfile from '~/components/profile/ShowProfile.vue'
import EditProfile from '~/components/profile/EditProfile.vue'

@Component({
  components: {
    EditProfile,
    ShowProfile
  }
})
export default class ProfilePage extends Vue {
  get edit (): boolean {
    console.log('route query')
    console.log(this.$route.query.edit)
    console.log(!!this.$route.query.edit)
    return !!this.$route.query.edit
  }
}
</script>

<style scoped>
input {
  min-height: 40px;
}
</style>
