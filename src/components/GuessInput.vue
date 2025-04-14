<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { useAppSelector } from "../store";
import GuessAutocomplete from "./GuessAutocomplete.vue";

type Props = {
  /** Whether this input control should be disabled. */
  disabled: boolean;
};

defineProps<Props>();
const emit = defineEmits(["submit"]);

const form = useTemplateRef("form");
const guess = ref("");
const focused = ref(false);
const autocompleteEnabled = useAppSelector((state) => state.config.autocomplete);

const submit = (value: string) => {
  emit("submit", value);
  guess.value = "";
};

const onAutocompletePick = (text: string) => {
  submit(text);
};

const onFocusOut = (event: FocusEvent) => {
  const newFocus = event.relatedTarget;
  const stillContainsFocus = newFocus && newFocus instanceof Node && form.value?.contains(newFocus);
  if (!stillContainsFocus) {
    focused.value = false;
  }
};
</script>

<template>
  <form
    ref="form"
    @submit.prevent="() => submit(guess)"
    @focusin="() => (focused = true)"
    @focusout="onFocusOut"
  >
    <input
      type="text"
      class="input-large"
      v-model="guess"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-autocomplete="list"
    />
    <GuessAutocomplete
      v-if="autocompleteEnabled"
      class="autocomplete"
      :focused="focused"
      :guess="guess"
      @pick="onAutocompletePick"
    />
    <button type="submit" class="vh" tabindex="-1">Check</button>
  </form>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

form,
input {
  max-width: 100%;
}

form {
  position: relative;
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

.autocomplete {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}
</style>
