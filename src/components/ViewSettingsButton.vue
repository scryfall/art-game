<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CogOutlineSvg from "./Svg/CogOutlineSvg.vue";
import CogSolidSvg from "./Svg/CogSolidSvg.vue";

const route = useRoute();

const isViewingSettings = computed(() => route.path === "/settings");

const link = computed(() => {
  if (isViewingSettings.value) {
    // TODO when different formats have different urls
    // this should go to the current game, rather than
    // to the home route
    return "/";
  }

  return "/settings";
});
</script>

<template>
  <RouterLink :to="link" class="settings btn-clear">
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
