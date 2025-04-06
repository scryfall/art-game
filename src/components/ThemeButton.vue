<script setup lang="ts">
import { Theme } from "../models/theme";
import { useAppDispatch, useAppSelector, setTheme } from "../store";
import { capitalize } from "../utils/string";

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
  <button type="button" class="btn btn-small" @click="toggle" @keypress.enter="toggle">
    {{ capitalize(theme) }} theme
  </button>
</template>

<style scoped lang="scss"></style>
