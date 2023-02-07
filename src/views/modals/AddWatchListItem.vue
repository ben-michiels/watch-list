<template>
  <v-dialog v-model="dialog" width="60vw">
    <template #activator="{ props }">
      <v-list-item v-bind="props" @click="onOpen">
        <template #prepend>
          <v-avatar rounded="0">
            <v-icon icon="mdi-plus" />
          </v-avatar>
        </template>
      </v-list-item>
    </template>

    <v-card width="60vw">
      <v-card-title class="bg-titleBar">
        <v-row no-gutters class="align-center">
          Add an Item
          <v-spacer />
          <v-btn
            class="my-n1"
            icon="mdi-close"
            variant="text"
            @click="onClose"
          />
        </v-row>
      </v-card-title>

      <v-card-text class="pt-1">
        <v-text-field
          v-model="input"
          autofocus
          class="mb-n4"
          density="compact"
          variant="underlined"
          @keyup.native.enter="onSearch"
        >
          <template #append>
            <v-btn icon="mdi-magnify" variant="text" @click="onSearch" />
          </template>
        </v-text-field>
        <v-list class="py-1">
          <v-list-item
            v-for="(item, index) in watchListItems"
            :title="item.title"
            :subtitle="item.year"
            :key="item.imdbId"
            @click="selectItem(item)"
          >
            <template #prepend>
              <v-avatar rounded="0">
                <v-img :src="item.poster" :alt="(index + 1).toString()" />
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <div v-if="totalPages > 1" class="text-center">
          <v-pagination
            v-model="page"
            class="mx-16"
            density="compact"
            :length="totalPages"
            @update:model-value="onSearch"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import WatchListItem from "@/models/WatchListItem";
import { injectStore } from "@/stores";

import { defineComponent, reactive, toRefs, unref, ref } from "vue";
import { VTextField } from "vuetify/lib/components/index";

interface State {
  dialog: boolean;
  input: string;
  page: number;
}

export default defineComponent({
  name: "AddWatchListItem",
  setup() {
    const { watchListStore, watchListItemsStore } = injectStore();
    const { addItem } = watchListStore;
    const {
      totalPages,
      watchListItems,
      getWatchListItems,
      clearWatchListItems,
    } = watchListItemsStore;

    const state = reactive<State>({
      dialog: false,
      input: "",
      page: 1,
    });

    function selectItem(item: WatchListItem) {
      addItem(item);
      onClose();
    }

    function onOpen() {
      clearWatchListItems();
      state.input = "";
      state.dialog = true;
    }

    function onClose() {
      state.dialog = false;
    }

    async function onSearch() {
      await getWatchListItems(unref(state.input), unref(state.page));
    }

    return {
      ...toRefs(state),
      totalPages,
      watchListItems,
      selectItem,
      onOpen,
      onClose,
      onSearch,
    };
  },
});
</script>
