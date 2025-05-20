<script setup lang="ts">
import type { Directive } from "vue";
import { getAutocompleteOptionId } from "./GuessAutocompleteConfig";

type Props = {
  /** The current list of options to display. */
  options: string[];
  /** Which item out of the autocomplete options the keyboard is focused on. */
  keyboardFocusIndex: number;
};

type Emits = {
  /** The user has picked an answer from autocomplete. */
  pick: [value: string];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const pick = (option: string) => {
  emit("pick", option);
};

const vScrollIntoView: Directive<HTMLElement, boolean> = {
  updated: (el, binding) => {
    if (binding.value && binding.value !== binding.oldValue) {
      el.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  },
};
</script>

<template>
  <div v-if="options.length > 0" class="options-list" :class="{ active: keyboardFocusIndex >= 0 }">
    <button
      v-for="(option, index) of options"
      :key="option"
      :class="{ active: index === keyboardFocusIndex }"
      :id="getAutocompleteOptionId(index)"
      v-scroll-into-view="index === keyboardFocusIndex"
      @click="() => pick(option)"
      type="button"
      class="option btn-clear"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

.options-list {
  --count: 3;
  --v-padding: 8px;
  --bottom-radius: 4px;
  --top-radius: 0;
  background: var(--background);
  border: var(--border);
  border-top-right-radius: var(--top-radius);
  border-top-left-radius: var(--top-radius);
  border-bottom-right-radius: var(--bottom-radius);
  border-bottom-left-radius: var(--bottom-radius);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  max-height: calc((var(--count) + 0.6) * (1em + var(--v-padding) * 2));
  overflow-y: scroll;
  z-index: 10;

  @include mixins.bp-large {
    --count: 4;
  }
}

.option {
  padding: var(--v-padding) 8px;
  line-height: 1em;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--option-color);
  background: var(--option-background);

  .options-list.active &:not(.active) {
    color: var(--option-inactive-color);
    background: var(--option-inactive-background);
  }

  &:hover,
  &:focus,
  &.active {
    color: var(--option-active-color);
    background: var(--option-active-background);
  }
}
</style>
