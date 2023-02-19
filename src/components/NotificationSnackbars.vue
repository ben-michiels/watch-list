<template>
  <v-snackbar
    v-for="notification in notifications"
    :model-value="true"
    :timeout="-1"
    location="top"
    :color="colourForNotificationType.get(notification.type)"
  >
    <v-row no-gutters class="align-center">
      <v-icon class="px-4">
        {{ iconForNotificationType.get(notification.type) }}
      </v-icon>
      {{ notification.message }}

      <v-spacer />

      <v-btn
        class="ml-3"
        icon="mdi-close"
        size="small"
        variant="text"
        @click.stop="() => deleteNotification(notification)"
      />
    </v-row>
  </v-snackbar>
</template>
<script lang="ts">
import { injectStore } from "@/stores";
import { defineComponent } from "vue";
import { NotificationType } from "@/models/Notification";

const iconForNotificationType: Map<NotificationType, string> = new Map([
  [NotificationType.Error, "mdi-alert-circle"],
  [NotificationType.Info, "mdi-information"],
  [NotificationType.Success, "mdi-check-circle"],
]);

const colourForNotificationType: Map<NotificationType, string> = new Map([
  [NotificationType.Error, "error"],
  [NotificationType.Info, "info"],
  [NotificationType.Success, "success"],
]);

export default defineComponent({
  name: "NotificationSnackbars",
  setup() {
    const { notificationsStore } = injectStore();
    const { notifications, deleteNotification } = notificationsStore;

    return {
      iconForNotificationType,
      colourForNotificationType,
      notifications,
      deleteNotification,
    };
  },
});
</script>
