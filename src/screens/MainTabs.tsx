import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Portal } from "react-native-paper";
import Account from "./account/Account";
import ClientList from "./client-list/ClientList";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Portal.Host>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#f1f5f9", height: 60, paddingBottom: 5 },
          tabBarIconStyle: { marginBottom: -8 },
          tabBarLabelStyle: { fontSize: 10 },
        }}
      >
        <Tab.Screen name="ClientList" component={ClientList} options={{ headerShown: false }} />
        <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
      </Tab.Navigator>
    </Portal.Host>
  );
};

export default MainTabs;
