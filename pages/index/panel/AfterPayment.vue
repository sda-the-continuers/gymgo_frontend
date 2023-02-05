<template>
  <PaymentSucceeded v-if="success" />
  <PaymentFailed v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PaymentSucceeded from '~/components/AfterPayment/PaymentSucceeded.vue'
import PaymentFailed from '~/components/AfterPayment/PaymentFailed.vue'

@Component({
  components: { PaymentFailed, PaymentSucceeded }
})
export default class AfterPaymentPage extends Vue {
  success = false
}
</script>

<style scoped>

</style>
