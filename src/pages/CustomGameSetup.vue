<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { AVOID_CRITERIA, COMPATIBILITY_CRITERIA } from "../config";
import ChevronLeft from "../components/Svg/ChevronLeft.vue";
import { LoadingStatus } from "../store";
import { flattenSearchCriteria } from "../utils/string";
import { ScryfallApiInstance } from "../utils/scryfall-api";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();
const query = ref("");
const status = ref(LoadingStatus.Idle);

// Filters
const excludeBadArt = ref(true);
const excludeExtras = ref(true);
const excludeStickers = ref(true);

const criteria = computed(() => {
  const criteria = [`(${query.value})`, ...COMPATIBILITY_CRITERIA];
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

const disabled = computed(() => {
  return status.value === LoadingStatus.Pending;
});

const onSubmit = async () => {
  status.value = LoadingStatus.Pending;
  const search = flattenSearchCriteria(criteria.value);

  // preflight checks
  try {
    const results = await ScryfallApiInstance.search(search);
    if (results.total_cards < 2) {
      status.value = LoadingStatus.Failed;
      return;
    }
  } catch (ex) {
    console.error("Preflight failed", ex);
    status.value = LoadingStatus.Failed;
    return;
  }

  router.replace({
    path: "/game/custom",
    query: {
      q: query.value,
      include_extras: !excludeExtras.value ? "true" : undefined,
    },
  });
};

onMounted(() => {
  query.value = route.query.q?.toString() ?? "";
});
</script>

<template>
  <form class="screen" @submit.prevent="onSubmit">
    <header>
      <RouterLink to="/" class="btn-icon cancel" title="Cancel">
        <ChevronLeft />
        <span class="vh">Cancel</span>
      </RouterLink>
      <h2>Custom game</h2>
      <div class="spacer"></div>
    </header>

    <section class="search">
      <div class="inputs">
        <label class="vh" for="custom-query">Custom Scryfall Query</label>
        <input
          v-model="query"
          id="custom-query"
          class="input-large"
          type="text"
          placeholder="set:dom type:creature"
          required
          :disabled="disabled"
        />
        <button type="submit" class="btn btn-large" :disabled="disabled || query.length === 0">
          Start
        </button>
      </div>
      <p class="hint">
        Enter a search to find cards. You might need to use the
        <a href="https://scryfall.com/docs/syntax" target="_blank">Syntax reference</a>.
      </p>
      <p class="error" v-if="status === LoadingStatus.Failed">
        Your search must match at least two cards. It might be contradicted by filters below.
      </p>
    </section>
    <hr />
    <section class="filters">
      <h3>Filters</h3>
      <p>
        These filters apply by default to all format searches. You can toggle them off here for your
        custom game.
      </p>
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

.screen {
  display: flex;
  flex-flow: column;
  align-items: center;
  min-width: 200px;
  max-width: min(400px, 90vw);
  margin: auto;
}

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

.error {
  font-weight: bold;
  color: var(--c-salmon);
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
