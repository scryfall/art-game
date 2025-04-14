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

type Emits = {
  /** The user has picked an answer from autocomplete. */
  pick: [value: string];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

/** lastPick caches our last picked card, so that we don't re-look it up on a props change. */
const lastPick = ref("");
const autocompleteOptions = ref<AutocompleteResponse>({ timestamp: 0, options: [] });
const AUTOCOMPLETE_DELAY = 500;
/** Your guess must be at least this long to be autocompleted. */
const MIN_AUTOCOMPLETE_LENGTH = 3;
/** There's a lot of asynchronous stuff happening in here! Enable this for debug logging. */
const ENABLE_LOGGING = false;

/**
 * Log something to the console. If {@link ENABLE_LOGGING} is false, these log lines are squashed.
 *
 * @param args Anything you want to log.
 */
const debug = (...args: unknown[]) => {
  if (ENABLE_LOGGING) {
    console.debug("[Autocomplete]", origin, Date.now(), ...args);
  }
};

const setAutocomplete = (timestamp: number, options: string[]) => {
  autocompleteOptions.value = {
    timestamp,
    options,
  };
};

const clearAutocomplete = () => {
  setAutocomplete(Date.now(), []);
};

/**
 * A debounced handler for running autocomplete requests.
 *
 * You should hit this handler with all changes to the input field, even if they won't be autocompleted, and even if you're clearing the autocomplete.
 * This lets the debounced lookup remain up to date with whatever was last entered.
 */
const autocompleteCardName = debounce(
  async (text: string) => {
    if (text.length < MIN_AUTOCOMPLETE_LENGTH) {
      debug(
        "[Debounce]",
        "Text was too short. Skipping autocomplete.",
        "(The watcher should have cleared autocomplete already.)"
      );
      return;
    }

    if (text === lastPick.value) {
      debug(
        "[Debounce]",
        "Text matched the last pick. Skipping autocomplete.",
        "(The watcher should have cleared autocomplete already.)"
      );
      return;
    }

    const requestTime = Date.now();
    debug("[Debounce]", "Fetching suggestions for", text);
    const options = await ScryfallApiInstance.autocomplete(text);
    if (requestTime > autocompleteOptions.value.timestamp) {
      debug("[Debounce]", `Found ${options.length} suggestions for`, text);
      setAutocomplete(requestTime, options);
    } else {
      debug(
        "[Debounce]",
        `Found ${options.length} suggestions for`,
        text,
        "(discarded due to age)"
      );
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
    autocompleteCardName(value);

    // When we pick() an answer, the input might be set to that answer. We want to avoid then immediately re-looking-up that answer.
    if (value === lastPick.value) {
      debug("[Watch]", "Immediately clearing from lastpick match");
      clearAutocomplete();
    } else {
      lastPick.value = "";
    }

    // Instantly clear short inputs.
    if (value.length <= MIN_AUTOCOMPLETE_LENGTH) {
      debug("[Watch]", "Immediately clearing from short guess input");
      clearAutocomplete();
    }
  }
);

const pick = (option: string) => {
  debug("[Pick]", "Picked", option);
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
