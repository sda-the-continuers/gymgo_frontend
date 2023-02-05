<template>
  <div class="main">
    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'
import PwaHandler from '~/mixins/pwaHandler'

@Component
export default class IndexPage extends Mixins(PwaHandler) {
  mounted () {
    console.log('entered')
    console.log('axios')
    console.log(this.$axios.defaults)
    console.log(this.$router.options.routes)
    // // eslint-disable-next-line
    // window["router"] = this.$router
    // console.log('store')
    // console.log(this.$store)
  }
}
</script>

<style>
@import "~/font/css/style.css";

:root {
  --primary-color: #EDF7FF;
  --secondary-color: #F67538;
  --secondary-color-rgb: 246, 117, 56;
  --tertiary-color: #FFFFFF;
  --primary-text-color: #113F70;
  --primary-text-color-rgb: 17, 63, 112;
  --secondary-text-color: #88A4C2;
  --secondary-text-color-rgb: 136, 164, 194;
  --disable-button-color: #faebd7;
}

html, body, #__nuxt, #__layout, .main {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  display: flex;
  height: 100%;
  width: 100%;
  min-width: 200px;
  min-height: 300px;
  justify-content: center;
  /*background-color: white;*/
}

body {
  /*max-width: 920px;*/
  position: relative;
}

button {
  background-color: var(--secondary-color);
  border-radius: 15px;
  color: white;
  /*font-size: 5vw;*/
  /*font-weight: 600;*/
  min-height: 48px;
  height: 48px;
  border-width: 0;
  box-shadow: 0 7px 15px rgba(var(--secondary-color-rgb), 0.35);
}

@media (min-aspect-ratio: 14/10) { /* landscape mode */
  /*html {*/
  /*  background-color: darkcyan;*/
  /*}*/

  /*body {*/
  /*  align-self: center;*/
  /*  max-width: 500px;*/
  /*  position: relative;*/
  /*}*/

  /*body, #__nuxt, #__layout, .main {*/
  /*  border-radius: 10px;*/
  /*}*/

  p  {
    margin-bottom: 0;
    align-self: center;
    width: 100%;
    /*font-size: 2.78vw; !* 10px *!*/
    font-size: min(16px, calc(2.78*6px + 1.25vh)/2);
  }

  h2 {
    /*font-size: 5.55vw; !* 20px *!*/
    font-size: min(27px, calc((5.55*6px + 2.5vh)/2));
  }

  h3 {
    /*font-size: 5vw; !* 18px *!*/
    font-size: min(24px, calc(5*6px + 2.25vh)/2);
  }

  h4 {
    /*font-size: 4.44vw; !* 16px *!*/
    font-size: min(21px, calc(4.44*6px + 2vh)/2);
  }

  h5 {
    /*font-size: 3.89vw; !* 14px *!*/
    font-size: min(18px, calc(3.89*6px + 1.75vh)/2);
  }

  h6 {
    /*font-size: 3.33vw; !* 12px *!*/
    font-size: min(16px, calc(3.33*6px + 1.5vh)/2);
  }
}

/*@media (orientation: landscape) {*/
/*  html:after{*/
/*    position: absolute;*/
/*    z-index: 9999;*/
/*    width: 100%;*/
/*    top: 0;*/
/*    bottom: 0;*/
/*    content: "";*/
/*    background: #212121 url(~/static/rotate-warning.png) 0 0 no-repeat; !* replace with an image that tells the visitor to rotate the device to landscape mode *!*/
/*    background-size: 100% auto;*/
/*    background-position-y: center;*/
/*    background-position-x: center;*/
/*    opacity: 0.95;*/
/*  }*/
/*}*/

/* hide number input arrow */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

@media (max-aspect-ratio: 14/10) {
  p  {
    margin-bottom: 0;
    align-self: center;
    width: 100%;
    /*font-size: 2.78vw; !* 10px *!*/
    font-size: min(14px, calc(2.78vw + 1.25vh)/2);
  }

  h2 {
    /*font-size: 5.55vw; !* 20px *!*/
    font-size: min(27px, calc((5.55vw + 2.5vh)/2));
  }

  h3 {
    /*font-size: 5vw; !* 18px *!*/
    font-size: min(24px, calc(5vw + 2.25vh)/2);
  }

  h4 {
    /*font-size: 4.44vw; !* 16px *!*/
    font-size: min(21px, calc(4.44vw + 2vh)/2);
  }

  h5 {
    /*font-size: 3.89vw; !* 14px *!*/
    font-size: min(18px, calc(3.89vw + 1.75vh)/2);
  }

  h6 {
    /*font-size: 3.33vw; !* 12px *!*/
    font-size: min(16px, calc(3.33vw + 1.5vh)/2);
  }
}

h1, h2, h3, h4, h5, h6 {
  width: 100%;
  align-self: center;
  margin-bottom: 0;
}

.colored {
  color: var(--secondary-color);
}

</style>
