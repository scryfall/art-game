<script setup lang="ts">
import { Theme } from "../models/theme";
import MoonSolidSvg from "./Svg/MoonSolidSvg.vue";
import SunOutlineSvg from "./Svg/SunOutlineSvg.vue";
import { useAppDispatch, useAppSelector, toggleTheme } from "../store";
import { capitalize } from "../utils/string";

const dispatch = useAppDispatch();
const theme = useAppSelector((state) => state.config.theme);
const toggle = () => {
  dispatch(toggleTheme(theme.value));
};
</script>

<template>
  <button
    type="button"
    :class="{ light: theme === Theme.Light, dark: theme === Theme.Dark }"
    @click="toggle"
  >
    <div class="icon sun" aria-hidden="true">
      <SunOutlineSvg />
    </div>
    <div class="toggle" aria-hidden="true"></div>
    <div class="icon moon" aria-hidden="true">
      <MoonSolidSvg />
    </div>
    <div class="vh">{{ capitalize(theme) }} theme. Press to toggle.</div>
  </button>
</template>

<style scoped lang="scss">
button {
  --color: currentColor;
  --inverted: var(--page-background);
  --size: 28px;
  --toggle-size: 24px;
  --toggle-inset: calc((var(--size) - var(--toggle-size)) / 2);
  --halfsize: calc(var(--size) / 2);
  --gap: 8px;
  --icon-size: 20px;
  --at-left: 2px;
  --at-right: calc(var(--icon-size) + var(--gap) + var(--toggle-inset));

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
  border-radius: var(--halfsize);
  height: var(--size);
  border-width: 0;
  background-color: var(--color);
  padding: 4px;
}

.icon {
  display: flex;
  font-size: 20px;
}

.icon {
  z-index: 2;
}

.light .moon {
  color: var(--inverted);
}

.dark .sun {
  color: var(--inverted);
}

.toggle {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: var(--inverted);
  left: 2px;
  transition: left 0.2s ease-out;
}

.dark .toggle {
  left: 30px;
}
</style>
