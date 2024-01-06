<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "the-contain-view",

})
</script>

<template>
  <div>
    <a-layout-content :style="{ margin: '24px 16px 0' }">
      <div :style="{ padding: '24px', background: '#fff', minHeight: '700px' }">
        <router-view/>
      </div>
    </a-layout-content>
  </div>
</template>

<style scoped>

</style>
