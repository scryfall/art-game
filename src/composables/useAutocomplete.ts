import { ref, watch, type Ref } from "vue";
import debounce from "lodash.debounce";
import { ScryfallApiInstance } from "../utils/scryfall-api";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";

/** The debounce time before doing autocomplete. */
const AUTOCOMPLETE_DELAY = 500;
/** Your guess must be at least this long to be autocompleted. */
const MIN_AUTOCOMPLETE_LENGTH = 3;
/** There's a lot of asynchronous stuff happening in here! Enable this for debug logging. */
const ENABLE_LOGGING = false;

/**
 * Based on the current guess, generate a series of valid autocompletes.
 *
 * @see {@link https://vuejs.org/guide/reusability/composables.html Vue Composables documentation}
 *
 * @param guess A ref to the current guess.
 * @returns A ref to a list of options valid for autocomplete.
 */
export function useAutocomplete(guess: Ref<string>) {
  const config = useConfigStore();
  const { autocomplete: acEnabled } = storeToRefs(config);
  /** Is autocomplete enabled? */
  /** The autocomplete options available. */
  const options = ref<string[]>([]);
  /** The last time options were updataed. */
  const timestamp = ref(0);

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

  const setAutocomplete = (_timestamp: number, _options: string[]) => {
    timestamp.value = _timestamp;
    options.value = _options;
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

      const requestTime = Date.now();
      debug("[Debounce]", "Fetching suggestions for", text);
      const options = await ScryfallApiInstance.autocomplete(text);
      if (requestTime > timestamp.value) {
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

  watch(acEnabled, (enabled) => {
    if (!enabled) {
      clearAutocomplete();
    }
  });

  watch(
    () => guess.value.trim(),
    (value) => {
      if (!acEnabled) {
        return;
      }

      autocompleteCardName(value);

      // Instantly clear short inputs.
      if (value.length <= MIN_AUTOCOMPLETE_LENGTH) {
        debug("[Watch]", "Immediately clearing from short guess input");
        clearAutocomplete();
      }
    }
  );

  return options;
}
