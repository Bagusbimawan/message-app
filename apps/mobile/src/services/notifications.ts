// No-op mock — push notifications require @react-native-firebase/messaging native module.
// Not used in UI preview mode.

export async function requestNotificationPermission(_uid: string): Promise<string | null> {
  return null;
}

export function setupNotificationListeners(_navigate: (chatId: string) => void) {
  return () => {};
}
