<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ScryfallCard } from "../models/scryfall-card";
import { useAppSelector } from "../store";

const props = defineProps<{
  card: ScryfallCard;
}>();

const activeClue = ref<"cmc" | "set" | "type" | "oracle" | null>(null);
const storeCard = useAppSelector((state) => state.game.card);

// Dismiss the active clue when the card changes
watch(storeCard, () => {
  activeClue.value = null;
});

const clues = [
  {
    id: "cmc",
    label: "Show Mana Value",
  },
  {
    id: "set",
    label: "Show Set",
  },
  {
    id: "type",
    label: "Show Type",
  },
  {
    id: "oracle",
    label: "Show Rules Text",
  },
] as const;

const visibleClues = computed(() =>
  clues.filter((clue) => clue.id === "type" || clue.id === "oracle" || !props.card.card_faces)
);
</script>

<template>
  <div class="clue-buttons">
    <button
      v-for="clue in visibleClues"
      :key="clue.id"
      class="clue-button"
      @click="activeClue = activeClue === clue.id ? null : clue.id"
      :class="{ active: activeClue === clue.id }"
    >
      {{ clue.label }}
    </button>
  </div>

  <div v-if="activeClue" class="clues">
    <div v-if="activeClue === 'cmc' && !card.card_faces" class="clue">
      Mana Value: {{ card.cmc }}
    </div>
    <div v-if="activeClue === 'set' && !card.card_faces" class="clue">Set: {{ card.set_name }}</div>
    <div v-if="activeClue === 'type'" class="clue">Type: {{ card.type_line }}</div>
    <div v-if="activeClue === 'oracle'" class="clue oracle-text">
      {{ card.oracle_text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.clue-buttons {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
  justify-content: center;
}

.clue-button {
  padding: 8px 16px;
  background: var(--clue-button-background, #4a5568);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.2s;

  &:hover {
    background: var(--clue-button-hover-background, #2d3748);
  }

  &:focus {
    outline: 2px solid var(--clue-button-focus-outline, #4299e1);
    outline-offset: 2px;
  }

  &.active {
    background: var(--clue-button-active-background, #2d3748);
    transform: translateY(1px);
  }
}

.clues {
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: slideDown 0.2s ease-out;
}

.clue {
  font-size: 1.1em;
  font-weight: 500;
}

.oracle-text {
  white-space: pre-line;
  text-align: left;
  line-height: 1.5;
}
</style>
