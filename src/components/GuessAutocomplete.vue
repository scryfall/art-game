<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import { ScryfallApiInstance } from "../utils/scryfall-api";

type AutocompleteResponse = {
  /**
   * The timestamp associated with this response.
   * This prevents old updates from ovewriting newer updates.
   */
  timestamp: number;
  /**
   * The autocomplete options available.
   */
  options: string[];
};

type Props = {
  /** The currently entered guess text. */
  guess: string;
  /** Whether the guess input area is focused. This is used to control whether we show autocomplete. */
  focused: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(["pick"]);

/** lastPick caches our last picked card, so that we don't re-look it up on a props change. */
const lastPick = ref("");
const autocompleteOptions = ref<AutocompleteResponse>({ timestamp: 0, options: [] });
const AUTOCOMPLETE_DELAY = 500;

const setAutocomplete = (timestamp: number, options: string[]) => {
  autocompleteOptions.value = {
    timestamp,
    options,
  };
};

const clearAutocomplete = () => {
  setAutocomplete(Date.now(), []);
};

const autocompleteCardName = debounce(
  async (text: string) => {
    const requestTime = Date.now();
    const options = await ScryfallApiInstance.autocomplete(text);
    if (requestTime > autocompleteOptions.value.timestamp) {
      setAutocomplete(requestTime, options);
    }
  },
  AUTOCOMPLETE_DELAY,
  {
    trailing: true,
  }
);

watch(
  () => props.guess,
  (value) => {
    if (value === lastPick.value) {
      // We picked a value. That value was set at the parent, then propagated down to us.
      // We can ignore this.
      return;
    } else {
      // The value was changed since our last pick, so we can forget our last pick.
      lastPick.value = "";
    }

    if (value.length >= 3) {
      autocompleteCardName(value);
    } else {
      clearAutocomplete();
    }
  }
);

const pick = (option: string) => {
  emit("pick", option);
  lastPick.value = option;
  clearAutocomplete();
};
</script>

<template>
  <div v-if="autocompleteOptions.options.length > 0" class="options-list" v-show="focused">
    <button
      v-for="option of autocompleteOptions.options"
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
