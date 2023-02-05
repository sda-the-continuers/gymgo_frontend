<template>
  <div class="gym-complex-rules">
    <div class="gym-complex-rules-header">
      <h4 class="colored">
        {{ innerContext.title }}
      </h4>
    </div>
    <div class="gym-complex-rules-body">
      <h6>
        {{ gymComplex.rules }}
      </h6>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { GymComplex } from '~/api/gym/gymComplex'

@Component
export default class GymComplexRulesPage extends Vue {
  innerContext = {
    title: 'قوانین و مقررات مجموعه'
  }

  @Prop({
    type: Object as PropType<GymComplex>,
    default: () => []
  }) public readonly gymComplex: GymComplex
}
</script>

<style scoped>
.gym-complex-rules {
  display: flex;
  flex-direction: column;
  direction: rtl;
  position: relative;
  width: 100%;
  height: fit-content;
  max-height: 85vh;
}

.gym-complex-rules .gym-complex-rules-header {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: center;
  justify-content: center;
  margin: 0;
  padding: 15px;
  background: var(--tertiary-color);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.27);
  border-radius: 25px 25px 0 0;
  z-index: 1;
}

.gym-complex-rules .gym-complex-rules-body {
  display: flex;
  flex-direction: column;
  padding: min(5%,40px) 5%;
  width: 100%;
  overflow-y: auto;
  background-color: var(--primary-color);
}

.gym-complex-rules-body > h6 {
  text-align: justify;
}
</style>
