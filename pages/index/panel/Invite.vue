<template>
  <div class="invite-page">
    <div class="advertisement">
      <img src="../../../static/icon.png" alt="advertisement">
    </div>
    <div class="our-text">
      <h4>
        {{ innerContext.inviteTxt }}
      </h4>
      <h5>
        {{ innerContext.explanation }}
      </h5>
    </div>
    <div class="invite-button">
      <div class="code" @click="copyToClipboard(code)">
        <div class="code-right-info">
          <img src="../../../static/copy-icon.svg" alt="">
          <h5> {{ innerContext.copy }} </h5>
        </div>
        <h3> {{ code }} </h3>
      </div>
      <button @click="$bvModal.show('invite-popup-modal')">
        <h4> {{ innerContext.invite }} </h4>
      </button>
    </div>
    <b-modal id="invite-popup-modal" hide-footer hide-header centered>
      <ReferInviteLink />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { BModal } from 'bootstrap-vue'
import { Mixins } from 'vue-property-decorator'
import ClipBoardIndicator from '~/mixins/clipboardIndicator'
@Component({
  components: {
    BModal
  }
})
export default class InvitePage extends Mixins(ClipBoardIndicator) {
  innerContext = {
    inviteTxt: 'ما را به دوستان خود معرفی کنید و از جوایز و تخفیف های ویژه برخوردار شوید.',
    explanation: 'این یک متن ساختگی برای کص گیر آوردن شما است' +
      ' خواهشمندم در صورت خواندن این متن با حفظ خونسردی خود سه بار نفس عمیق بکشید،' +
      ' خشم را از خود دور کنید و برای شادی روح اموات جمع یک فاتحه بخوانید.',
    copy: 'کپی کردن کد',
    invite: 'دعوت کردن'
  }

  code: string = 'YF85J73'
}
</script>

<style scoped>
.invite-page {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 5%;
  width: 100%;
  min-height: 100%;
  height: fit-content;
  justify-content: space-between;
}

.invite-page .advertisement {
  margin: 2% 0 2% 0;
  width: 100%;
  height: 36vh;
  align-items: center;
  display: flex;
  justify-content: center;
}

.advertisement > img {
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.invite-page .our-text {
  display: flex;
  flex-direction: column;
  direction: rtl;
  text-align: center;
  padding: 2% 0;
}

.our-text > h4 {
  display: flex;
  direction: rtl;
  justify-content: center;
  font-weight: 700;
}

.our-text > h5 {
  margin: 10px 0 25px 0;
  font-weight: 400;
}

.invite-button {
  display: flex;
  flex-direction: column;
  /*position: sticky;*/
  /*bottom: 10px;*/
  /*left: 5%;*/
  /*right: 5%;*/
  /*margin-top: auto;*/
  /*margin-bottom: 0;*/
  background-color: var(--primary-color);
  padding-bottom: min(5%,40px);
  width: 100%;
}

.invite-button .code {
  display: flex;
  flex-direction: row;
  direction: rtl;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;
  height: 48px;
  cursor: pointer;
  border: 2px dashed var(--secondary-color);
  box-shadow: 0 4px 5px rgba(var(--secondary-color-rgb), 0.35);
  border-radius: 10px;
}

.code .code-right-info {
  display: flex;
  direction: rtl;
  gap: 10px;
}

.code-right-info > img {
  width: 20px;
}

.code-right-info > h5 {
  margin-bottom: 0;
  align-self: center;
  min-width: fit-content;
}

.code > h3 {
  margin-bottom: 0;
  align-self: center;
  font-weight: 700;
}

.invite-button > button {
  width: 100%;
  height: 48px;
  border-width: 0;
}
</style>
