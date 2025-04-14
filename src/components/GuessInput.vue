<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import { useAppSelector } from "../store";
import GuessAutocompleteList from "./GuessAutocompleteList.vue";
import GuessAutocompleteGenerator from "./GuessAutocompleteGenerator.vue";
import { KeyCode } from "../utils/keyboard";

type Props = {
  /** Whether this input control should be disabled. */
  disabled: boolean;
};

type Emits = {
  /** The user has submitted a card name for their guess. */
  submit: [value: string];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const form = useTemplateRef("form");
const input = useTemplateRef("input");
const guess = ref("");
const focused = ref(false);
const acEnabled = useAppSelector((state) => state.config.autocomplete);
const acOptions = ref<string[]>([]);
const acKeyboardFocusIndex = ref(-1);

const submit = (value: string) => {
  emit("submit", value);
  guess.value = "";
};

const onAutocompleteUpdate = (options: string[]) => {
  acOptions.value = options;
};

const onAutocompletePick = (text: string) => {
  submit(text);
  input.value?.focus();
};

const onKeypress = (event: KeyboardEvent) => {
  if (!acEnabled.value) {
    return;
  }

  switch (event.code) {
    case KeyCode.Escape: {
      acKeyboardFocusIndex.value = -1;
      acOptions.value = [];
      event.preventDefault();
      break;
    }
    case KeyCode.ArrowUp: {
      const min = -1;
      acKeyboardFocusIndex.value = Math.max(acKeyboardFocusIndex.value - 1, min);
      event.preventDefault();
      break;
    }
    case KeyCode.ArrowDown: {
      const max = acOptions.value.length - 1;
      acKeyboardFocusIndex.value = Math.min(acKeyboardFocusIndex.value + 1, max);
      event.preventDefault();
      break;
    }
  }
};

watch(guess, () => {
  console.debug("Guess changed, resetting autocomplete focus.");

  acKeyboardFocusIndex.value = -1;
});

const onFocusOut = (event: FocusEvent) => {
  const newFocus = event.relatedTarget;
  const stillContainsFocus = newFocus && newFocus instanceof Node && form.value?.contains(newFocus);
  if (!stillContainsFocus) {
    focused.value = false;
    acKeyboardFocusIndex.value = -1;
  }
};

const onSubmit = () => {
  const focusAt = acKeyboardFocusIndex.value;
  const autocompleted = focusAt >= 0 ? acOptions.value[focusAt] : undefined;

  submit(autocompleted ?? guess.value);
};
</script>

<template>
  <form
    ref="form"
    @submit.prevent="onSubmit"
    @focusin="() => (focused = true)"
    @focusout="onFocusOut"
  >
    <input
      ref="input"
      type="text"
      class="input-large"
      :class="{
        'kb-focus': acKeyboardFocusIndex === -1,
        'has-autocomplete': acOptions.length > 0 && focused,
      }"
      v-model="guess"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-autocomplete="list"
      @keydown="onKeypress"
    />
    <GuessAutocompleteGenerator
      v-if="acEnabled"
      :guess="guess.trim()"
      @updated="onAutocompleteUpdate"
    />
    <GuessAutocompleteList
      v-if="acEnabled"
      id="ac_list"
      class="autocomplete"
      :class="{ 'kb-focus': acKeyboardFocusIndex > -1 }"
      :keyboard-focus-index="acKeyboardFocusIndex"
      :focused="focused"
      :options="acOptions"
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
  color: currentColor;

  @include mixins.bp-large {
    font-size: 24px;
  }

  &.has-autocomplete {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:not(.kb-focus) {
    outline-width: 0;
    color: color-mix(in srgb, currentColor 50%, transparent);
  }

  &:not(:focus) {
    opacity: 0.6;
  }
}

.autocomplete {
  --background: var(--page-background);
  --border: 1px solid currentColor;
  --option-inactive-color: color-mix(in srgb, currentColor 80%, transparent);
  --option-active-background: color-mix(in srgb, currentColor 15%, transparent);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  &.kb-focus,
  &:hover {
    outline: 2px solid var(--focus-outline-color);
  }

  &:not(.kb-focus):not(:hover) {
    --option-color: color-mix(in srgb, currentColor 65%, transparent);
  }
}
</style>
