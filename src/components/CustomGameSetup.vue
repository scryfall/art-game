<script setup lang="ts">
import { ref } from "vue";
import { COMPATIBILITY_CRITERIA } from "../config";
import ChevronLeft from "./Svg/ChevronLeft.vue";

type Props = {
  disabled: boolean;
};

type Emits = {
  submit: [criteria: string[]];
  cancel: [];
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const customQuery = ref("");

const onSubmit = () => {
  emit("submit", [`(${customQuery.value})`, ...COMPATIBILITY_CRITERIA]);
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
    </header>

    <div class="search">
      <label class="vh" for="custom-query">Custom Scryfall Query</label>
      <input
        v-model="customQuery"
        id="custom-query"
        class="input-large"
        type="text"
        placeholder="set:dom type:creature"
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
    <div class="additional">
      <label>
        <input type="checkbox" />
        <span>Exclude extras</span>
      </label>
      <label>
        <input type="checkbox" />
        <span>Exclude stickers</span>
      </label>
    </div>
  </form>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 20px 0;

  .cancel {
    font-size: var(--h2-size);
    width: 30px;
    height: 30px;
  }

  h2 {
    margin: 0;
  }
}

.search {
  display: flex;
  gap: 12px;
  width: 100%;

  input {
    flex: 1;
  }
}

.hint {
  padding: 0 10px;
}

.additional {
  display: flex;
  gap: 20px;

  label {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8px;
  }
}
</style>
