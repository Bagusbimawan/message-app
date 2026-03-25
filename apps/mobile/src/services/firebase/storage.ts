// No-op mock — storage requires @react-native-firebase/storage native module.
// Not used in UI preview mode.

export async function uploadMedia(
  _chatId:     string,
  _localUri:   string,
  _mimeType:   string,
  _onProgress: (pct: number) => void
): Promise<string> {
  return '';
}
