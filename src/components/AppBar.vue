<template>
  <v-app-bar title="Work in Progress">
    <v-spacer />
    <settings-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsMenu from "./SettingsMenu.vue";

export default defineComponent({
  name: "AppBar",
  components: {
    SettingsMenu,
  },
});
</script>
