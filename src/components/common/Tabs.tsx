import React, { createContext, useContext, useState, ReactNode, Children } from "react";
import { View, Pressable, Text, ViewStyle } from "react-native";

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

type TabsProviderProps = {
  tabButtonStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  inactiveTabStyle?: ViewStyle;
  children: ReactNode;
};

type TabProps = {
  label: string;
  children: ReactNode;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) throw new Error("useTabs must be used inside a provider.");
};

export const TabsProvider = ({
  children,
  tabStyle,
  tabButtonStyle,
  containerStyle,
  activeTabStyle,
  inactiveTabStyle,
}: TabsProviderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <View style={[{ flex: 1 }, containerStyle]}>
        <View style={[{ flexDirection: "row" }, tabStyle]}>
          {items.map((child, i) => {
            const { label } = child.props;

            return (
              <Pressable
                key={i}
                style={[
                  { flex: 1 },
                  tabButtonStyle,
                  i === activeIndex ? activeTabStyle : inactiveTabStyle,
                ]}
                onPress={() => setActiveIndex(i)}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: i === activeIndex ? "black" : "#6b7280",
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ flex: 1 }} className="bg-gray-100">
          {items[activeIndex]}
        </View>
      </View>
    </TabsContext.Provider>
  );
};

export const Tab = ({ children }: TabProps) => {
  useTabs();
  return <>{children}</>;
};
