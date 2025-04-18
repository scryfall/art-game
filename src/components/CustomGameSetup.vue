<script setup lang="ts">
import { computed, ref } from "vue";
import { AVOID_CRITERIA, COMPATIBILITY_CRITERIA } from "../config";
import ChevronLeft from "./Svg/ChevronLeft.vue";

type Props = {
  disabled: boolean;
};

type Emits = {
  submit: [criteria: (string | boolean)[]];
  cancel: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();
const customQuery = ref("");
const excludeBadArt = ref(true);
const excludeExtras = ref(true);
const excludeStickers = ref(true);

const criteria = computed(() => {
  const criteria = [`(${customQuery.value})`, ...COMPATIBILITY_CRITERIA];
  if (excludeBadArt?.value) {
    criteria.push(...AVOID_CRITERIA);
  }
  if (excludeExtras.value) {
    criteria.push("not:extra");
  }
  if (excludeStickers.value) {
    criteria.push("-t:stickers");
  }
  return criteria;
});

const onSubmit = () => {
  emit("submit", criteria.value);
};

const onCancel = () => {
  emit("cancel");
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <header>
      <button type="button" class="btn-icon cancel" title="Cancel" @click="onCancel">
        <ChevronLeft />
        <span class="vh">Cancel</span>
      </button>
      <h2>Custom game</h2>
      <div class="spacer"></div>
    </header>

    <section class="search">
      <div class="inputs">
        <label class="vh" for="custom-query">Custom Scryfall Query</label>
        <input
          v-model="customQuery"
          id="custom-query"
          class="input-large"
          type="text"
          placeholder="set:dom type:creature"
          required
          :disabled="disabled"
        />
        <button
          type="submit"
          class="btn btn-large"
          value="Start"
          :disabled="disabled || customQuery.length === 0"
        >
          Start
        </button>
      </div>
      <p class="hint">
        Enter a search to find cards. You might need to use the
        <a href="https://scryfall.com/docs/syntax" target="_blank">Syntax reference</a>.
      </p>
    </section>
    <hr />
    <section class="filters">
      <h3>Filters</h3>
      <p>These filters apply by default to all format searches. You can toggle them off here.</p>
      <ul class="filters">
        <li>
          <label>
            <input type="checkbox" v-model="excludeBadArt" :disabled="disabled" />
            <span>Try to avoid art that works badly with Art Game</span>
          </label>
          <div class="desc">
            This includes poster cards and other types of art that might have the card name
            immediately visible inside the art frame.
          </div>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="excludeExtras" :disabled="disabled" />
            <span>Exclude extras</span>
          </label>
          <div class="desc">
            This includes tokens, helper cards, art cards, memorabilia, playtest cards, and more.
          </div>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="excludeStickers" :disabled="disabled" />
            <span>Exclude sticker sheets</span>
          </label>
          <div class="desc">As in the things from Unfinity.</div>
        </li>
      </ul>
    </section>
  </form>
</template>

<style scoped lang="scss">
@use "../styles/mixins";

header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 20px 0;

  h2 {
    margin: 0;
  }

  .cancel {
    font-size: var(--h2-size);
    width: 30px;
    height: 30px;
  }

  .spacer {
    width: 30px;
  }
}

h3 {
  margin: 20px 0;
}

p {
  padding: 0 10px;
}

hr {
  margin-left: 10px;
  margin-right: 10px;
}

.search {
  .inputs {
    display: flex;
    gap: 12px;
    width: 100%;
  }

  input {
    flex: 1;
  }
}

.filters {
  ul {
    @include mixins.list-reset;
    display: flex;
    flex-flow: column;
    gap: 20px;
    margin-top: 20px;
  }

  input {
    width: 20px;
  }

  label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  }

  .desc {
    margin-top: 8px;
    margin-left: 28px;
    font-style: italic;
    opacity: 0.8;
    font-size: 80%;
  }
}
</style>
