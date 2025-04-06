<script setup lang="ts">
import { useAppDispatch, useAppSelector, toggleTheme } from "../store";
import { capitalize } from "../utils/string";

const dispatch = useAppDispatch();
const theme = useAppSelector((state) => state.config.theme);
const toggle = () => {
  dispatch(toggleTheme());
};
</script>

<template>
  <button type="button" class="btn btn-small" @click="toggle" @keypress.enter="toggle">
    {{ capitalize(theme) }} theme
  </button>
</template>

<style scoped lang="scss"></style>
