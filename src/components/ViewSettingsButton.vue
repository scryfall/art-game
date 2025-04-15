<script setup lang="ts">
import { setViewConfigScreen, useAppDispatch, useAppSelector } from "../store";
import { KeyCode } from "../utils/keyboard";
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

const onKeydown = (event: KeyboardEvent) => {
  if (event.code === KeyCode.Escape) {
    dispatch(setViewConfigScreen(false));
  }
};
</script>

<template>
  <button type="button" class="settings btn-clear" @click="click" @keydown="onKeydown">
    <div class="icon" aria-hidden="true">
      <CogOutlineSvg v-if="isViewingSettings" />
      <CogSolidSvg v-else />
    </div>
    <div class="vh" v-if="isViewingSettings">Close settings</div>
    <div class="vh" v-else>Open settings</div>
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
