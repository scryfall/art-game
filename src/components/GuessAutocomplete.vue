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

const props = defineProps<{ guess: string }>();

const autocompleteOptions = ref<AutocompleteResponse>({ timestamp: 0, options: [] });
const AUTOCOMPLETE_DELAY = 500;

const setAutocomplete = (timestamp: number, options: string[]) => {
  autocompleteOptions.value = {
    timestamp,
    options,
  };
};

const autocompleteCardName = debounce(
  async (text: string) => {
    console.debug("[Autocomplete]", `Fetch (${text}): starting...`);
    const requestTime = Date.now();
    const options = await ScryfallApiInstance.autocomplete(text);
    if (requestTime > autocompleteOptions.value.timestamp) {
      console.debug("[Autocomplete]", `Fetch (${text}): ${options.length} options found`);
      setAutocomplete(requestTime, options);
    } else {
      console.debug(
        "[Autocomplete]",
        `Fetch (${text}): ${options.length} options found`,
        "(discarded due to being out of date)"
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
    if (value.length >= 3) {
      autocompleteCardName(value);
    } else {
      console.debug("[Autocomplete]", "Reset to 0");
      setAutocomplete(Date.now(), []);
    }
  }
);
</script>

<template>
  <div v-if="guess.length >= 3 && autocompleteOptions.options.length > 0">
    {{ autocompleteOptions.options }}
  </div>
</template>

<style scoped lang="scss"></style>
