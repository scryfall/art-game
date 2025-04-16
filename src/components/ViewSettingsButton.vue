<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { KeyCode } from "../utils/keyboard";
import CogOutlineSvg from "./Svg/CogOutlineSvg.vue";
import CogSolidSvg from "./Svg/CogSolidSvg.vue";

const route = useRoute();

const isViewingSettings = computed(() => route.path === "/settings");

const onKeydown = (event: KeyboardEvent) => {
  if (event.code === KeyCode.Escape) {
    // TODO go to current path
  }
};

const link = computed(() => {
  if (isViewingSettings.value) {
    // TODO go to current path
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
