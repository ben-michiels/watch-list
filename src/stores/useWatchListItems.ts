import { reactive, toRefs } from "vue";

import { Services } from "@/api";
import WatchListItem from "@/models/WatchListItem";

interface State {
  watchListItems: WatchListItem[];
  totalPages: number;
}

export default function useWatchListItems(services: Services) {
  const { watchListItemsService } = services;

  const state = reactive<State>({
    watchListItems: [],
    totalPages: 1,
  });

  async function getWatchListItems(query: string, page: number): Promise<void> {
    const listData = await watchListItemsService.get(query, page);
    state.totalPages = listData.totalPages;
    state.watchListItems = listData.items;
  }

  function clearWatchListItems(): void {
    state.totalPages = 1;
    state.watchListItems = [];
  }

  return {
    ...toRefs(state),
    getWatchListItems,
    clearWatchListItems,
  };
}

export type WatchListItemsStore = ReturnType<typeof useWatchListItems>;
