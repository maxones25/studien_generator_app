import { useGetNotifications } from "@modules/notifications/hooks";

export const getNewNotificationsCount = () => {
  const notifications = useGetNotifications().data;
  if (!notifications) return 0

  return notifications.filter((notification) => !notification.readAt).length;
}