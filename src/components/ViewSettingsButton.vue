<script setup lang="ts">
import { setViewConfigScreen, useAppDispatch, useAppSelector } from "../store";
import CogOutlineSvg from "./Svg/CogOutlineSvg.vue";
import CogSolidSvg from "./Svg/CogSolidSvg.vue";

const dispatch = useAppDispatch();
const isViewingSettings = useAppSelector((state) => state.config.viewConfigScreen);

const click = () => {
  if (isViewingSettings.value) {
    dispatch(setViewConfigScreen(false));
  } else {
    dispatch(setViewConfigScreen(true));
  }
};
</script>

<template>
  <button type="button" class="settings btn-clear" @click="click">
    <div class="icon">
      <CogOutlineSvg v-if="isViewingSettings" />
      <CogSolidSvg v-else />
    </div>
    <span class="vh">Settings</span>
  </button>
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
