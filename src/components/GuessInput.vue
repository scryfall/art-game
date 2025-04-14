<script setup lang="ts">
import { ref } from "vue";
import { useAppSelector } from "../store";
import GuessAutocomplete from "./GuessAutocomplete.vue";

defineProps<{ disabled: boolean }>();
const emit = defineEmits(["submit"]);

const guess = ref("");
const autocompleteEnabled = useAppSelector((state) => state.config.autocomplete);

const submit = () => {
  emit("submit", guess.value);
  guess.value = "";
};
</script>

<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      class="input-large"
      v-model="guess"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <GuessAutocomplete v-if="autocompleteEnabled" :guess="guess" />
    <button type="submit" class="vh" tabindex="-1">Check</button>
  </form>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

form,
input {
  max-width: 100%;
}

input {
  border: 1px solid;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  font-size: 18px;
  width: 400px;

  @include mixins.bp-large {
    font-size: 24px;
  }

  &:not(:focus) {
    opacity: 0.6;
  }
}
</style>
