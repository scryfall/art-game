<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId } from "vue";
import { useAppDispatch, useAppSelector, toggleAutocomplete } from "../store";
import { KeyCode } from "../utils/keyboard";
import router from "../router";

const dispatch = useAppDispatch();
const autocomplete = useAppSelector((state) => state.config.autocomplete);

const autocompleteId = useId();
const autocompleteDescId = useId();

const onKeydown = (event: KeyboardEvent) => {
  if (event.code === KeyCode.Escape) {
    event.preventDefault();
    // TODO go to current app page
    router.push("/");
  }
};

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="screen" aria-description="Escape to exit settings.">
    <section>
      <h2>Settings</h2>

      <div class="settings-grid">
        <!-- Elements in this grid automatically alternate between left and right column. -->
        <!-- Descriptions are full width. -->
        <div class="label" :id="autocompleteId">
          <div>Autocomplete card names<span class="vh">.</span></div>
          <div :id="autocompleteDescId" class="description">
            Card name suggestions won't be limited to your chosen format. Choose wisely!
          </div>
        </div>
        <div class="option">
          <button
            :aria-describedby="autocompleteId"
            type="button"
            class="btn btn-small"
            @click="() => dispatch(toggleAutocomplete(autocomplete))"
          >
            {{ autocomplete ? "On" : "Off" }}
          </button>
        </div>
      </div>
    </section>

    <section class="credits">
      <h2>Credits</h2>
      <p>
        Made by
        <a href="https://github.com/scarletcs/" target="_blank">scarletcs</a>, with contributions
        from <a href="https://github.com/crookedneighbor" target="_blank">crookedneighbor</a>.
      </p>
      <p>This game is based on the MagicCards.info Art Game.</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.screen {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 40px;
  padding: 0 16px;
}

h2 {
  font-size: 20px;
  text-align: center;
}

section {
  max-width: 100%;
}

.settings-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: auto;
  gap: 16px;
  width: 400px;
  max-width: 100%;

  .description {
    font-style: italic;
    opacity: 0.8;
    font-size: 80%;
    text-align: left;
    width: min-content;
    min-width: 100%;
    padding-top: 8px;
  }

  .option {
    text-align: right;
  }
}

.credits {
  opacity: 0.6;
  font-size: 14px;
  max-width: 400px;

  p {
    text-align: left;
  }
}
</style>
