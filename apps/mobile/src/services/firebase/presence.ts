// No-op mock — presence requires @react-native-firebase/database native module.
// Not used in UI preview mode.

export function initPresence(_uid: string) {
  return () => {};
}

export function listenToPresence(
  _uid: string,
  _callback: (isOnline: boolean, lastSeen: Date | null) => void
) {
  return () => {};
}
