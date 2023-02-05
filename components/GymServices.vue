<template>
  <div class="gym-services-popup">
    <div class="gym-services-header">
      <h4> {{ innerContext.chooseYourService }} </h4>
    </div>
    <div class="gym-services-body">
      <div class="popup-services-for">
        <template v-for="(gymnasium) in gymnasiums">
          <button v-for="(gymUsage, index2) in gymnasium.gym_usages" :key="`gymUsage-${index2}`" class="service" @click="() => gotoRoute(gymUsage.id)">
            <h5>
              {{ gymnasium.gymnasium_type_fa }}
              ({{ gymUsage.type.title_fa }})
            </h5>
            <img :src="gymUsage.type.icon.file" alt="">
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PropType } from 'vue'
import cupIcon from 'static/cup-icon.svg'
import { Gymnasium } from '~/api/gym/gymComplex'

@Component
export default class GymServicesPage extends Vue {
  innerContext = {
    chooseYourService: 'سرویس مورد نظر خود را انتخاب کنید'
  }

  statics = {
    cupIcon
  }

  @Prop({
    type: Array as PropType<Gymnasium[]>,
    default: () => []
  }) public readonly gymnasiums: Gymnasium[]

  gotoRoute (gymUsageId: number): void {
    this.$router.push({ name: 'index/panel/gymnasium/id', params: { id: gymUsageId.toString() } })
  }
}
</script>

<style scoped>
.gym-services-popup {
  display: flex;
  flex-direction: column;
  direction: rtl;
  position: relative;
  width: 100%;
  /*min-height: 500px;*/
  max-height: 80%;
}

.gym-services-popup .gym-services-header {
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

.gym-services-header > h4 {
  margin-bottom: 0;
  align-self: center;
  color: var(--secondary-color);
}

.gym-services-popup .gym-services-body {
  display: flex;
  flex-direction: column;
  padding: 5%;
  overflow-y: auto;
  max-height: 500px;
  background-color: var(--primary-color);
}

.gym-services-body .popup-services-for {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.popup-services-for .service {
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  padding: 0 15px;
  background: var(--tertiary-color);
  box-shadow: 0 5px 6px rgba(var(--secondary-text-color-rgb), 0.3);
  border-radius: 10px;
  color: var(--primary-text-color);
  align-items: center;
  justify-content: flex-end;
}

.service > img {
  width: 20px;
}

.service > h5 {
  margin-bottom: 0;
  align-self: center;
  text-align: right;
}

</style>
