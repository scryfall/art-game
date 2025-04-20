<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CogOutlineSvg from "./Svg/CogOutlineSvg.vue";
import CogSolidSvg from "./Svg/CogSolidSvg.vue";
import router from "../router";

const route = useRoute();

const isViewingSettings = computed(() => route.path === "/settings");

const link = computed(() => {
  if (isViewingSettings.value) {
    // if we're currently on the settings page and the settings
    // link is pressed, then we want to go back to whatever the
    // previous page was. And if /settings is the first page
    // the user lands on, we go to /
    return router.options.history.state.back?.toString() ?? "/";
  }

  return "/settings";
});
</script>

<template>
  <RouterLink :to="link" class="settings btn-icon">
    <div class="icon" aria-hidden="true">
      <CogOutlineSvg v-if="isViewingSettings" />
      <CogSolidSvg v-else />
    </div>
    <div class="vh" v-if="isViewingSettings">Close settings</div>
    <div class="vh" v-else>Open settings</div>
  </RouterLink>
</template>

<style scoped lang="scss">
.settings {
  height: 1em;
  width: 1em;
  font-size: 30px;
  border-radius: 50%;
}

.settings .icon {
  display: flex;
  transition: rotate ease 0.1s;
}

.settings:hover .icon,
.settings:focus .icon {
  rotate: 30deg;
}
</style>
