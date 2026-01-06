import * as Clipboard from "expo-clipboard";

export const copyToClipboard = (text: string, callBack: () => void) => {
  Clipboard.setStringAsync(text);
  callBack();
};
