<script setup lang="ts">
import { Theme } from "../models/theme";
import { useAppDispatch, useAppSelector, setTheme } from "../store";
import MoonSolidSvg from "./Svg/MoonSolidSvg.vue";
import SunOutlineSvg from "./Svg/SunOutlineSvg.vue";

const dispatch = useAppDispatch();
const theme = useAppSelector((state) => state.config.theme);
const toggle = () => {
  if (theme.value === Theme.Dark) {
    dispatch(setTheme(Theme.Light));
  } else {
    dispatch(setTheme(Theme.Dark));
  }
};
</script>

<template>
  <button
    type="button"
    :class="{ light: theme === Theme.Light, dark: theme === Theme.Dark }"
    @click="toggle"
    @keypress.enter="toggle"
  >
    <div class="toggle" aria-hidden="true"></div>
    <div class="icon sun" aria-hidden="true">
      <SunOutlineSvg />
    </div>
    <div class="icon moon" aria-hidden="true">
      <MoonSolidSvg />
    </div>
    <div class="vh">{{ theme }} theme. Press to toggle.</div>
  </button>
</template>

<style scoped lang="scss">
button {
  --color: currentColor;
  --inverted: var(--page-background);
  --size: 28px;
  --halfsize: calc(var(--size) / 2);

  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: var(--halfsize);
  height: var(--size);
  font-size: 20px;
  border-width: 0;
  background-color: var(--color);
}

.icon {
  display: flex;
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
