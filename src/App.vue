<script setup lang="ts">
import ScreenManager from "./components/ScreenManager.vue";
import ThemeButton from "./components/ThemeButton.vue";
import ViewSettingsButton from "./components/ViewSettingsButton.vue";
import { useAppSelector } from "./store/hooks";

const theme = useAppSelector((state) => state.config.theme);
</script>

<template>
  <div class="app" :data-theme="theme">
    <header>
      <div class="left"></div>
      <div class="middle">
        <a href="/">
          <h1>
            <img class="logo" src="/scryfall.svg" alt="Scryfall" />
            <span>Art Game</span>
          </h1>
        </a>
      </div>
      <div class="right">
        <ThemeButton />
        <ViewSettingsButton />
      </div>
    </header>

    <main>
      <ScreenManager />
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "./styles/mixins";

.app {
  background-color: var(--page-background);
  color: var(--text-color);
  font-family: var(--font-sans-serif);
  font-size: var(--font-size);

  transition: color 0.25s ease, background-color 0.25s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  min-height: 100vh;

  @include mixins.bp-small {
    justify-content: flex-start;
    .footer {
      justify-self: flex-end;
    }
  }
}

header {
  padding: 10px 20px;
  padding-bottom: 40px;
  display: grid;
  grid-template-areas: "left middle right";
  grid-template-columns: 1fr 2fr 1fr;

  .middle {
    grid-area: "middle";
    display: flex;
    justify-content: center;

    a {
      text-decoration: none;
    }

    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 10px;
      margin: 0;
      font-size: 24px;
    }

    .logo {
      height: 32px;
    }
  }

  .right {
    grid-area: "right";
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
}

main {
  flex: 1;
}
</style>
