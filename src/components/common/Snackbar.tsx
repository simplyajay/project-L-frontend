import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Text } from "react-native-paper";
interface ISnackbarContext {
  showMessage: (message: string, duration?: number) => void;
}
const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);
  const showMessage = (msg: string, dur?: number) => {
    setMessage(msg);
    setDuration(dur ?? 3000);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={duration}
        style={{ backgroundColor: "#303030", borderRadius: 10 }}
      >
        <Text className="text-lg text-white text-center">{message}</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");
  return context;
};
