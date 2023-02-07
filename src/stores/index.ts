import { inject, InjectionKey } from "vue";

import { Services } from "@/api";

import useNotifications, { NotificationsStore } from "./useNotifications";
import useTheme, { ThemeStore } from "./useTheme";
import useVueRouter, { VueRouterStore } from "./useVueRouter";
import useWatchList, { WatchListStore } from "./useWatchList";
import useWatchListItems, { WatchListItemsStore } from "./useWatchListItems";
import useWatchLists, { WatchListsStore } from "./useWatchLists";

export interface Store {
  notificationsStore: NotificationsStore;
  themeStore: ThemeStore;
  routerStore: VueRouterStore;
  watchListStore: WatchListStore;
  watchListsStore: WatchListsStore;
  watchListItemsStore: WatchListItemsStore;
}

export function defineStore(services: Services): Store {
  const store = {} as Store;

  store.notificationsStore = useNotifications();
  store.themeStore = useTheme(services);
  store.watchListsStore = useWatchLists(services);

  store.watchListStore = useWatchList(store);
  store.watchListItemsStore = useWatchListItems(services);

  store.routerStore = useVueRouter(services, store);

  return store;
}

export const StoreKey = Symbol("Store") as InjectionKey<Store>;
export const injectStore = (): Store => inject(StoreKey) as Store;
