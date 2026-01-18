import React, { createContext, useContext, useState, ReactNode, Children } from "react";
import { View, Pressable, Text, ViewStyle, TextStyle } from "react-native";

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

type TabsProviderProps = {
  /** Style applied to each tab button wrapper */
  tabButtonStyle?: ViewStyle;

  /** Style for the tab container */
  tabStyle?: ViewStyle;

  /** Style for the outer container wrapping tabs + content */
  containerStyle?: ViewStyle;

  /** Style applied to the currently active tab button */
  activeTabStyle?: ViewStyle;

  /** Text style for the active tab label */
  activeTabTextStyle?: TextStyle;

  /** Style applied to inactive tab buttons */
  inactiveTabStyle?: ViewStyle;

  /** Tab components rendered inside the provider */
  children: ReactNode;

  /** Optional action button rendered alongside the tabs (e.g. + Add) */
  actionButton?: ReactNode;
};

type TabProps = {
  label: string;
  children: ReactNode;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const DEFAULT_ACTIVE_TAB_STYLE: TextStyle = {
  color: "black",
  textAlign: "center",
  fontSize: 16,
  fontWeight: "bold",
};

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
  activeTabTextStyle,
  inactiveTabStyle,
  actionButton,
}: TabsProviderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <View
        style={[{ flex: 1, borderTopLeftRadius: 25, borderTopRightRadius: 25 }, containerStyle]}
      >
        <View style={[{ flexDirection: "row" }, tabStyle]}>
          {items.map((child, i) => {
            const { label } = child.props;

            return (
              <Pressable
                className="flex-row gap-2 items-center justify-center"
                key={i}
                style={[
                  { borderTopLeftRadius: 25, borderTopRightRadius: 25 },
                  { flex: 1 },
                  tabButtonStyle,
                  i === activeIndex ? activeTabStyle : inactiveTabStyle,
                ]}
                onPress={() => setActiveIndex(i)}
              >
                <Text style={[{ color: "#9ca3af" }, i === activeIndex && activeTabTextStyle]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={{ flex: 1 }}>{items[activeIndex]}</View>

        {actionButton && (
          <View
            pointerEvents="box-none"
            className="absolute flex items-center justify-center self-center rounded-full bg-slate-100"
            style={{
              elevation: 10,
              height: 60,
              width: 60,
              top: -10, // adjust based on button size
              zIndex: 10,
            }}
          >
            {actionButton}
          </View>
        )}
      </View>
    </TabsContext.Provider>
  );
};

export const Tab = ({ children }: TabProps) => {
  useTabs();
  return <>{children}</>;
};
