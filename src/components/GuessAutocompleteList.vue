<script setup lang="ts">
type Props = {
  /** The current list of options to display. */
  options: string[];
  /** Whether the guess input area is focused. This is used to control whether we show autocomplete. */
  focused: boolean;
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
</script>

<template>
  <div v-if="options.length > 0" class="options-list" v-show="focused">
    <button
      v-for="option of options"
      :key="option"
      @click="() => pick(option)"
      type="button"
      class="option btn-clear"
    >
      {{ option }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.options-list {
  --count: 3;
  --v-padding: 8px;
  --bottom-radius: 4px;
  --top-radius: 0;
  background: var(--page-background);
  border: 1px solid currentColor;
  border-top-right-radius: var(--top-radius);
  border-top-left-radius: var(--top-radius);
  border-bottom-right-radius: var(--bottom-radius);
  border-bottom-left-radius: var(--bottom-radius);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  max-height: calc((var(--count) + 0.6) * (1em + var(--v-padding) * 2));
  overflow-y: scroll;
}

.option {
  padding: var(--v-padding) 8px;
  line-height: 1em;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover,
  &:focus,
  &.active {
    background-color: color-mix(in srgb, currentColor 15%, transparent);
  }
}
</style>
